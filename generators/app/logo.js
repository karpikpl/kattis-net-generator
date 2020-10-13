const chalk = require('chalk');
const packagejs = require('../../package.json');

module.exports = function logo(log) {
  log('\n');
  // prettier-ignore
  {
        log(`${chalk.blue('        KKKKKKKKK    KKKKKKK               AAA               RRRRRRRRRRRRRRRRR   PPPPPPPPPPPPPPPPP   IIIIIIIIIIKKKKKKKKK    KKKKKKKPPPPPPPPPPPPPPPPP   LLLLLLLLLLL             ')}`);
        log(`${chalk.blue('        K:::::::K    K:::::K              A:::A              R::::::::::::::::R  P::::::::::::::::P  I::::::::IK:::::::K    K:::::KP::::::::::::::::P  L:::::::::L             ')}`);
        log(`${chalk.blue('        K:::::::K    K:::::K             A:::::A             R::::::RRRRRR:::::R P::::::PPPPPP:::::P I::::::::IK:::::::K    K:::::KP::::::PPPPPP:::::P L:::::::::L             ')}`);
        log(`${chalk.blue('        K:::::::K   K::::::K            A:::::::A            RR:::::R     R:::::RPP:::::P     P:::::PII::::::IIK:::::::K   K::::::KPP:::::P     P:::::PLL:::::::LL             ')}`);
        log(`${chalk.blue('        KK::::::K  K:::::KKK           A:::::::::A             R::::R     R:::::R  P::::P     P:::::P  I::::I  KK::::::K  K:::::KKK  P::::P     P:::::P  L:::::L               ')}`);
        log(`${chalk.blue('          K:::::K K:::::K             A:::::A:::::A            R::::R     R:::::R  P::::P     P:::::P  I::::I    K:::::K K:::::K     P::::P     P:::::P  L:::::L               ')}`);
        log(`${chalk.blue('          K::::::K:::::K             A:::::A A:::::A           R::::RRRRRR:::::R   P::::PPPPPP:::::P   I::::I    K::::::K:::::K      P::::PPPPPP:::::P   L:::::L               ')}`);
        log(`${chalk.blue('          K:::::::::::K             A:::::A   A:::::A          R:::::::::::::RR    P:::::::::::::PP    I::::I    K:::::::::::K       P:::::::::::::PP    L:::::L               ')}`);
        log(`${chalk.blue('          K:::::::::::K            A:::::A     A:::::A         R::::RRRRRR:::::R   P::::PPPPPPPPP      I::::I    K:::::::::::K       P::::PPPPPPPPP      L:::::L               ')}`);
        log(`${chalk.blue('          K::::::K:::::K          A:::::AAAAAAAAA:::::A        R::::R     R:::::R  P::::P              I::::I    K::::::K:::::K      P::::P              L:::::L               ')}`);
        log(`${chalk.blue('          K:::::K K:::::K        A:::::::::::::::::::::A       R::::R     R:::::R  P::::P              I::::I    K:::::K K:::::K     P::::P              L:::::L               ')}`);
        log(`${chalk.blue('        KK::::::K  K:::::KKK    A:::::AAAAAAAAAAAAA:::::A      R::::R     R:::::R  P::::P              I::::I  KK::::::K  K:::::KKK  P::::P              L:::::L         LLLLLL')}`);
        log(`${chalk.blue('        K:::::::K   K::::::K   A:::::A             A:::::A   RR:::::R     R:::::RPP::::::PP          II::::::IIK:::::::K   K::::::KPP::::::PP          LL:::::::LLLLLLLLL:::::L')}`);
        log(`${chalk.blue('        K:::::::K    K:::::K  A:::::A               A:::::A  R::::::R     R:::::RP::::::::P          I::::::::IK:::::::K    K:::::KP::::::::P          L::::::::::::::::::::::L')}`);
        log(`${chalk.blue('        K:::::::K    K:::::K A:::::A                 A:::::A R::::::R     R:::::RP::::::::P          I::::::::IK:::::::K    K:::::KP::::::::P          L::::::::::::::::::::::L')}`);
        log(`${chalk.blue('        KKKKKKKKK    KKKKKKKAAAAAAA                   AAAAAAARRRRRRRR     RRRRRRRPPPPPPPPPP          IIIIIIIIIIKKKKKKKKK    KKKKKKKPPPPPPPPPP          LLLLLLLLLLLLLLLLLLLLLLLL')}`);
    }
  log(
    chalk.white.bold(
      '                            https://www.github.com/karpikpl\n'
    )
  );
  log(
    chalk.white('Welcome to Kattis Net solution generator ') +
      chalk.yellow(`v${packagejs.version}`)
  );
  log(
    chalk.white(
      `Application files will be generated in folder: ${chalk.yellow(
        process.cwd()
      )}`
    )
  );
  if (process.cwd() === getUserHome()) {
    log(chalk.red.bold('\n️⚠️  WARNING ⚠️  You are in your HOME folder!'));
    log(
      chalk.red(
        'This can cause problems, you should always create a new directory and run the generator command from here.'
      )
    );
    log(
      chalk.white(
        `See the troubleshooting section at ${chalk.yellow(
          'https://www.github.com/karpikpl'
        )}`
      )
    );
  }
  log(
    chalk.red(
      ' _______________________________________________________________________________________________________________\n'
    )
  );
};

function getUserHome() {
  return process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
}
