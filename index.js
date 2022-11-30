#! /usr/bin/env node
import { program }  from 'commander';
import { publish } from './commands/publish.js';
import { getconfig, setconfig, validate } from './commands/config.js';
import * as readline from 'readline';

const initializeConfigIfNeeded = async () => {
  const cfg = getconfig();
  if (!cfg.token || !cfg.app) {
    console.error('Configure API Token and App name');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const token = await rl.question('Enter the API Token: ');
    const app = await rl.question('Enter the App Name: ');

    setconfig(token, app, '');
  }
}
program.command('publish-fe')
  .description('Publish UI/Frontend code to Saasbit Cloud')
  .option('-b, --build <BUILD DIRECTORY>', 'Build directory', 'dist')
  .action(async (str, options) => {
    try{
      await initializeConfigIfNeeded();
      console.log(str.build);
      await publish(str.build);
    }catch(e) {}
  });

program.command('publish-be')
  .description('Publish Server/Backend code to Saasbit Cloud')
  .option('-b, --build <BUILD DIRECTORY>', 'Build directory', 'dist')
  .option('-f, --file <BUILD FILE>', 'Build File / Jar file', '')
  .action(async (str, options) => {
    console.log(str.build);
    await initializeConfigIfNeeded();
    await publish(str.build);
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

