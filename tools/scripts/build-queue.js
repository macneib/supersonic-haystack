const execSync = require('child_process').execSync;
const isMaster = process.argv[2] === 'False';
const baseSha = isMaster ? 'origin/master~1' : 'origin/master';

//  get branch
const branch = execSync(`git rev-parse --abbrev-ref HEAD`).toString()
console.log(`selected branch ${branch}`)

// Retrieve the modified files, excluding the merge commit
const merge_commit_hash= execSync(`git rev-parse --short HEAD`).toString()
console.log(merge_commit_hash)
const build_commit_hash= execSync(`git rev-list --no-merges -n1 HEAD`).toString()
console.log(build_commit_hash)

const files=execSync(`git diff-tree --no-commit-id --name-only -r ${build_commit_hash}`).toString()
console.log(files)


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