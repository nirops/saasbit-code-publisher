#! /usr/bin/env node
import { program }  from 'commander';
import { publish } from './commands/publish.js';
import { getconfig, setconfig, validate } from './commands/config.js';
import inquirer from 'inquirer';

async function initializeConfigIfNeeded(cb) {
  const cfg = getconfig();
  console.log(cfg);
  if (!cfg.token || !cfg.apps) {
    const answers = await inquirer.prompt([
      {
        type: 'password',
        name: 'token',
        message: 'Enter the API Token (https://saasbit.nirops.com):',
      },
      {
        name: 'app',
        message: 'Enter the App Name:',
      },
    ]);
    console.log(answers);
    const ans = setconfig(answers.token, answers.app, '');
    console.log(ans);
    cb();
  } else {
    cb();
  }
}
program.command('publish-fe')
  .description('Publish UI/Frontend code to Saasbit Cloud')
  .option('-b, --build <BUILD DIRECTORY>', 'Build directory', 'dist')
  .action(async (str, options) => {
    initializeConfigIfNeeded(async () => {
      console.log(str.build);
      await publish(str.build);
    });
  });

program.command('publish-be')
  .description('Publish Server/Backend code to Saasbit Cloud')
  .option('-b, --build <BUILD DIRECTORY>', 'Build directory', 'dist')
  .option('-f, --file <BUILD FILE>', 'Build File / Jar file', '')
  .action(async (str, options) => {
    initializeConfigIfNeeded(async () => {
      console.log(str.build);
      await publish(str.build);
    });
  });

program.command('config')
  .description('Authenticate and configure Saasbit CLI')
  .option('-t, --token <API TOKEN>', 'API Token')
  .option('-a, --app <APP NAME>', 'App Name')
  .action(async (str, options) => {
    if (str.app || str.token) {
      if (validate(str)) {
        const giturl = '';
        const cfg = setconfig(str.token, str.app, giturl);
        console.log(JSON.stringify(cfg, null, 4));
      }else{
        console.log('Missing TOKEN or App Name');
      }
    }else{
      const cfg = getconfig();
      console.log(JSON.stringify(cfg, null, 4));
    }
  });

program.parse();

