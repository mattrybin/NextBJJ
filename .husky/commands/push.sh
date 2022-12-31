#!/usr/bin/bash

echo -e "===\n>> Pre-push Hook: Checking branch name..."

BRANCH=`git rev-parse --abbrev-ref HEAD`
PROTECTED_BRANCHES="^(master)"

ISSUE=$(printenv | 
grep "CODESPACE_NAME" | 
grep -Eo "CODESPACE_NAME=mattrybin-[0-9]{1,3}" | 
grep -Eo "[0-9]{1,3}")

if [[ "$BRANCH" =~ $PROTECTED_BRANCHES ]]
then
  echo -e "\n🚫 Cannot push to remote $BRANCH branch, creating new issue branch ($ISSUE) and PR." &&
  git reset --soft $(git merge-base HEAD origin/master) && 
  git commit -am "" --allow-empty-message && 
  git pull --rebase &&
  git checkout -t -b "issue-$ISSUE"
  exit 1
fi