const execSync = require('child_process').execSync;
const child = require('child_process');
const isMaster = process.argv[2] === 'False';
const baseSha = isMaster ? 'origin/master~1' : 'origin/master';
const  shell = require('shelljs');
shell.config.silent = true;

let affected = shell.exec('./tools/scripts/build_queue.sh')
let affectedToBuild = affected.stdout.replace(/^\s+|\s+$/g, '').split(" ");
// console.log('affectedToBuild', affectedToBuild);
for (var i = 0; i < affectedToBuild.length; i++) {
  console.log(affectedToBuild[i])
}