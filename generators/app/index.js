const showLogo = require('./logo');
const chalk = require('chalk');
const fetch = require('node-fetch');
const AdmZip = require('adm-zip');
const path = require('path');
const generator = require('yeoman-generator');
const glob = require('glob');
const ConfigParser = require('configparser');
const fs = require('fs');
const os = require('os');

async function checkFileExists(path) {
  return fs.promises
    .access(path, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

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
        message:
          'Custom URL of the sample data files (defaults to hostname in kattisrc or open kattis, if none given)',
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

    // Build default URL from kattisrc
    // Check the same locations the official submit.py checks
    const pathsToCheck = [
      '/usr/local/etc/kattisrc',
      os.homedir() + '/.kattisrc',
      this.destinationPath('../.kattisrc'),
      this.destinationPath('.kattisrc'),
    ];
    const kattisrcFoundId = (
      await Promise.all(pathsToCheck.map((item) => checkFileExists(item)))
    ).lastIndexOf(true);
    const config = new ConfigParser();
    let cookies;
    if (kattisrcFoundId > -1) {
      config.read(pathsToCheck[kattisrcFoundId]);

      // Login to kattis to collect auth cookie
      const loginUrl = config.get('kattis', 'loginurl');

      const loginData = new URLSearchParams({
        user: config.get('user', 'username'),
        token: config.get('user', 'token'),
        script: true,
      });
      // post to loginUrl using form data

      const response = await fetch(loginUrl, {
        method: 'POST',
        body: loginData,
      });
      const rawCookie = response.headers.raw()['set-cookie'];
      cookies = rawCookie
        .map((item) => {
          const parts = item.split(';');
          return parts[0];
        })
        .join(';');
      this.logInfo(`Login ${chalk.green('success')} - ${cookies}`);
    }
    const hostname = config.get('kattis', 'hostname') || 'open.kattis.com';
    const url =
      this.answers.url ||
      `https://${hostname}/problems/${this.answers.problem}/file/statement/samples.zip`;
    const response = await fetch(url, { headers: { cookies } });
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
