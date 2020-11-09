const showLogo = require('./logo');
const chalk = require('chalk');
const fetch = require('node-fetch');
const AdmZip = require('adm-zip');
const path = require('path');
const generator = require('yeoman-generator');
const glob = require('glob');

class functionGenerator extends generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  async initializing() {
    showLogo(this.log);
  }

  logInfo(msg) {
    this.log(chalk.green(msg));
  }

  async prompting() {
    const promptQuestions = [
      {
        type: 'input',
        name: 'problem',
        message: 'Name of the Kattis problem',
        default: '',
        validate: (input) => {
          if (!input) {
            this.log.error('Please provide valid Kattis problem name');
            return false;
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'url',
        message: 'Custom URL of the sample data files',
        default: `https://open.kattis.com/problems/${this.answers.problem}/file/statement/samples.zip`,
      },
    ];
    this.answers = await this.prompt(promptQuestions);
  }

  async configuring() {
    // build configuration
  }

  async writing() {
    // first get the DB entities
    this.logInfo('Copying files');
    const model = {
      problem: this.answers.problem,
    };

    const files = glob.sync('**', {
      dot: true,
      nodir: true,
      cwd: this.templatePath(),
    });

    for (let i in files) {
      this.fs.copyTpl(
        this.templatePath(files[i]),
        this.destinationPath(files[i]),
        model
      );
    }

    const url = this.answers.url;
    const response = await fetch(url);
    this.logInfo(
      `Downloaded sample data from: ${chalk.green(
        url
      )} status: ${JSON.stringify(response)}`
    );

    if (response.status !== 200) {
      this.log(
        chalk.red(
          `Could not download sample files - status code: ${response.status}`
        )
      );
      return;
    }

    const buff = await response.buffer();

    // get the problem file
    // download and unzip
    const zip = new AdmZip(buff);

    const samplesDirectory = this.destinationPath(
      path.join('Tests', 'Samples')
    );

    zip.extractAllTo(samplesDirectory);
  }

  install() {
    this.spawnCommandSync('git', ['init']);
    return this.installDependencies({ bower: false });
  }
}

module.exports = functionGenerator;
