#!/bin/bash

set -e

# check if necessary commands are available
command -v git > /dev/null 2>&1 || { echo "Git not installed."; exit 1; }

branch=`git rev-parse --abbrev-ref HEAD` #set default stage
# echo -e "selected branch $branch"

# Retrieve the modified files, excluding the merge commit
merge_commit_hash=`git rev-parse --short HEAD`
build_commit_hash=`git rev-list --no-merges -n1 HEAD`
files="$(git --no-pager diff --name-only main HEAD)"

# files="$(git diff-tree --no-commit-id --name-only -r $build_commit_hash)"
apps=()
commons=()
# echo $files
# Retrieve the modified apps

# echo files $files

for file in $files
do
    # get directories
    # echo $file
    common="$(echo $file | cut -d '/' -f2)"
    if test -d commons/$common; then
        # echo 'test' $common
        for i in $(find . -type f -not -path "./node_modules/*" -not -path "./.git/*" -print | xargs grep "commons/$common" | cut -d '/' -f3);
        do
            affected="$i"
            
            apps+=($affected);
            # echo apps affected "$apps"
        #     priority="$(cat apps/$affected/package.json | grep build_priority | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g')"
        # if [ -z "$priority" ]; then
        #     priority=50
        # fi
        
        done
    fi
    # commons+=($common);
    # echo affected apps $affected
    # echo $priority/$common
done

    # echo $apps

for file in $files
do
    app="$(echo $file | cut -d '/' -f2)"
    if test -d apps/$app; then
        # Retrieve the project build_priority in the package.json, default value is 50
        # priority="$(cat apps/$app/package.json | grep build_priority | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g')"
        # if [ -z "$priority" ]; then
        #     priority=50
        # fi
        apps+=($app);
    fi
done

# clean and order apps list
# apps=($(echo "${apps[@]}" | tr ' ' '\n' | sort -u | tr '\n' ' '))

for value in "$(echo "${apps[@]}" | tr ' ' '\n' | sort -u | tr '\n' ' ')"
do
    echo $value
done

# echo $commons
# rootDir=`pwd`



# # launch each app build.sh script if present
# if [ "${#apps[@]}" -gt 0 ]; then

#     for app in ${apps[@]}
#     do
#         priority="$(echo $app | cut -d '/' -f1)"
#         app="$(echo $app | cut -d '/' -f2)"
#         echo -e "- Building $app at version $merge_commit_hash with priority $priority"
#         if [ -f $rootDir/apps/$app/build.sh ]; then
#             echo -e "  build script found"
#             cd $rootDir/apps/$app
#             chmod ug+x build.sh
#            ./build.sh $branch
#         else 
#            echo -e " no buid script found for app $app"  
#         fi
#     done
# else
#     echo "Nothing to build."
# fi
