#! /usr/bin/env node
import { program }  from 'commander';
import { publish } from './commands/publish.js';
import { config } from './commands/config.js';

program.command('publish')
  .description('Publish code to Saasbit Cloud')
  .option('-b, --build <string>', 'Build directory', 'dist')
  .action(async (str, options) => {
    console.log(str.build);
    await publish(str.build);
  });

program.command('config')
  .description('Authenticate and configure')
  .option('-t, --token <string>', 'API Token', '')
  .option('-a, --app <string>', 'App Name', '')
  .action(async (str, options) => {
    await config(str.token,str.app);
  });

program.parse();

