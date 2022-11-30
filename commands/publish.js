import { executeRest } from '../rest-client.js';
import * as fs from 'fs';
import * as path from 'path';


const getAllFiles = function(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
    }
  })

  return arrayOfFiles
}

function readFiles(buildDir) {
  return getAllFiles(buildDir);
}

export async function publish(buildDir) {
  console.log('Publish to Saasbit Cloud');
  const files = readFiles(buildDir);
  files.forEach((file) => {
    console.log(`Publish file: ${file}`);
  })
}

