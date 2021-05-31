const execSync = require('child_process').execSync;
const child = require('child_process');
const isMaster = process.argv[2] === 'False';
const baseSha = isMaster ? 'origin/master~1' : 'origin/master';
const  shell = require('shelljs');
shell.config.silent = true;

let affected = shell.exec('./tools/scripts/build_queue.sh')
let affectedToBuild = affected.stdout.replace(/^\s+|\s+$/g, '').replace(/-/g, "_").split(" ");

console.log(
  JSON.stringify({
    ...commands('build')
  })
);

function commands(target) {
  let array = shell.exec('./tools/scripts/build_queue.sh').replace(/^\s+|\s+$/g, '').split(" ");
  array.sort(() => 0.5 - Math.random());
  const third = Math.floor(array.length / 3);
  const a1 = array.slice(0, third);
  const a2 = array.slice(third, third * 2);
  const a3 = array.slice(third * 2);
  return {
    [target + '1']: a1,
    [target + '2']: a2,
    [target + '3']: a3
  };
}