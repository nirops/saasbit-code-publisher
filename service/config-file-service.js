import  yaml  from 'write-yaml';
import  read  from 'read-yaml';

const CONFIG_FILE=`.saasbit`;
export function readConfig() {
  try{
    return read.sync(CONFIG_FILE);
  }catch(e){}
  return {};
}

export function writeConfig(data) {
  yaml.sync(CONFIG_FILE, data);
}