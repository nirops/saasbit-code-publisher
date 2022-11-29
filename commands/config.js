import { executeRest } from '../rest-client.js';
import { readConfig, writeConfig } from '../service/config-file-service.js';

export function getconfig() {
  return readConfig();
}

export function setconfig(token, app, giturl) {
  const config = getconfig() || {};
  config.token = token || config.token;
  if (!config.apps) {
    config.apps = [];
    config.apps.push({
      app: app,
      git: giturl
    });
  }else{
    const napp = config.apps.filter((val) => val.app === app);
    napp.app = app;
    napp.git = giturl;
  }
  writeConfig(config);
  return readConfig();
}

export function validate(ip) {
  return ip.token && ip.app;
}
