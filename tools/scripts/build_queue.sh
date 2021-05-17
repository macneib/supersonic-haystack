#!/bin/bash

set -e

# check if necessary commands are available
command -v git > /dev/null 2>&1 || { echo "Git not installed."; exit 1; }

branch=`git rev-parse --abbrev-ref HEAD` #set default stage
# echo -e "selected branch $branch"

# Retrieve the modified files, excluding the merge commit
merge_commit_hash=`git rev-parse --short HEAD`
build_commit_hash=`git rev-list --no-merges -n1 HEAD`
files="$(git --no-pager diff --name-only HEAD HEAD~)"

apps=()

# Change detection in commons and solve for which apps are affected
for file in $files
do
    # get directories
    common="$(echo $file | cut -d '/' -f2)"
    if test -d commons/$common; then
        for i in $(find . -type f -not -path "./node_modules/*" -not -path "./.git/*" -print | xargs grep "commons/$common" | cut -d '/' -f3);
        do
            affected="$i"
            apps+=($affected);
        done
    fi
done

# Change detection in apps only
for file in $files
do
    app="$(echo $file | cut -d '/' -f2)"
    if test -d apps/$app; then
        apps+=($app);
    fi
done

# Make the list unique values only
for value in "$(echo "${apps[@]}" | tr ' ' '\n' | sort -u | tr '\n' ' ')"
do
    echo $value
done