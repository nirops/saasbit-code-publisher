#! /usr/bin/env node
import { program }  from 'commander';
import { publish } from './commands/publish.js';
import { getconfig, setconfig, validate } from './commands/config.js';

program.command('publish')
  .description('Publish code to Saasbit Cloud')
  .option('-b, --build <string>', 'Build directory', 'dist')
  .action(async (str, options) => {
    console.log(str.build);
    await publish(str.build);
  });

program.command('config')
  .description('Authenticate and configure')
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
      const cfg = getconfig(str.token,str.app);
      console.log(JSON.stringify(cfg, null, 4));
    }
  });

program.parse();

