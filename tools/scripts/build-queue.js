const execSync = require('child_process').execSync;
const child = require('child_process');
const isMaster = process.argv[2] === 'False';
const baseSha = isMaster ? 'origin/master~1' : 'origin/master';
const  shell = require('shelljs');
shell.config.silent = true;
//  get branch
// const branch = execSync(`git rev-parse --abbrev-ref HEAD`).toString()
// console.log(`selected branch ${branch}`)

// // Retrieve the modified files, excluding the merge commit
// const merge_commit_hash= execSync(`git rev-parse --short HEAD`).toString()
// console.log(merge_commit_hash)
// const build_commit_hash= execSync(`git rev-list --no-merges -n1 HEAD`).toString()
// console.log(build_commit_hash)

// const files = JSON.stringify(
//   execSync(`git diff-tree --no-commit-id --name-only -r ${build_commit_hash}`)
// .toString()
// .trim()
// ).map
// console.log(files)
// // // console.log(files)
// // for (var i = 0; i < files.length; i++) {
// //   [i])
// // }

let affected = shell.exec('./tools/scripts/build_queue.sh')
let affectedToBuild = affected.stdout.replace(/^\s+|\s+$/g, '').split(" ");
// console.log('affectedToBuild', affectedToBuild);
for (var i = 0; i < affectedToBuild.length; i++) {
  console.log(affectedToBuild[i])
}

// let affected = child.exec('sh ./tools/scripts/build_queue.sh', (error, stdout, stderr) => {
//   console.log(stdout);
//   console.log(stderr);
//   if (error !== null) {
//       console.log(`exec error: ${error}`);
//   }
// });


function commands(target) {
    const array = JSON.parse(
      execSync(`npx nx print-affected --base=${baseSha} --target=${target}`)
        .toString()
        .trim()
    ).tasks.map(t => t.target.project);
  
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