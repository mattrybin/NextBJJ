#!/usr/bin/bash

echo -e "===\n>> Pre-push Hook: Checking branch name..."
# hmm

BRANCH=$(git rev-parse --abbrev-ref HEAD)
PROTECTED_BRANCHES="^(master)"

# Check if pnpm install changes the lock file and exit if true
pnpm install
if [[ $(git diff --stat) != '' ]]; then
  exit 1
fi

pull_request_status_check() {
  curl -s \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer $CUSTOM_GITHUB_TOKEN" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    https://api.github.com/repos/mattrybin/nextbjj/pulls/$1 |
    gron | grep mergeable_state | grep -q "clean"
}

pull_request_merge() {
  curl -X PUT -s \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer $CUSTOM_GITHUB_TOKEN" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    -H "Content-Type: application/json" \
    --data-raw '{"merge_method": "squash"}' \
    https://api.github.com/repos/mattrybin/nextbjj/pulls/$1/merge |
    gron | grep merged | grep -q "true"
}

# pull_request_status_check
attempt_counter=0
max_attempts=200

wait_for_clean_status() {
  until pull_request_status_check $1; do
    if [ ${attempt_counter} -eq ${max_attempts} ]; then
      echo "\nMax attempts reached"
      exit 1
    fi

    printf '.'

    attempt_counter=$(($attempt_counter + 1))
    sleep 10
  done
}

# wait_for_clean_status

# echo "The branch is clean"

# git status -sb | grep "ahead"

ISSUE=$(printenv |
  grep "CODESPACE_NAME" |
  grep -Eo "CODESPACE_NAME=mattrybin-[0-9]{1,3}" |
  grep -Eo "[0-9]{1,3}")

ISSUE_TITLE=$(curl -s -X GET "https://api.github.com/repos/mattrybin/nextbjj/issues/${ISSUE}" \
  -H 'Accept: application/vnd.github+json' \
  -H 'X-GitHub-Api-Version: 2022-11-28' \
  -H "Authorization: Bearer $CUSTOM_GITHUB_TOKEN" |
  gron | grep title | gron -u | jq -r ".title")

echo "CHECK ISSUE AND TITLE"
echo "$ISSUE"
echo "$ISSUE_TITLE"

# # curl -s \
# #   -H "Accept: application/vnd.github+json" \
# #   -H "Authorization: Bearer $CUSTOM_GITHUB_TOKEN"\
# #   -H "X-GitHub-Api-Version: 2022-11-28" \
# #   https://api.github.com/repos/mattrybin/nextbjj/pulls/8 |
# #   gron | grep mergeable_state

# # curl \
# #   -H "Accept: application/vnd.github+json" \
# #   -H "Authorization: Bearer $CUSTOM_GITHUB_TOKEN"\
# #   -H "X-GitHub-Api-Version: 2022-11-28" \
# #   https://api.github.com/repos/mattrybin/nextBJJ/commits/issue-8/status

# # gron {"GOOD": "PEOPEL"}
# # echo "{\"issue\": $ISSUE,\"head\":\"issue-$ISSUE\",\"base\":\"master\"}"

# if [[ $(git diff --no-ext-diff --quiet --exit-code) ]]
#  then
#   echo "repo is dirty"
#  else
#   echo "HELLO"
# fi
# # if [[ $(git status --porcelain) ]]; then echo "repo is clean"; fi

if [[ "$BRANCH" =~ $PROTECTED_BRANCHES ]]; then
  echo -e "\n🚫 Cannot push to remote $BRANCH branch, creating new issue branch ($ISSUE) and PR."

  # Squash the commits into one empty message commit
  git reset --soft $(git merge-base HEAD origin/master)
  git commit -am "" --allow-empty-message
  git pull --rebase
  git checkout -t -b "issue-$ISSUE"
  git push -u origin issue-$ISSUE --no-verify
  curl \
    -X POST \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer $CUSTOM_GITHUB_TOKEN" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    https://api.github.com/repos/mattrybin/nextbjj/pulls \
    -d "{\"issue\":$ISSUE,\"head\":\"issue-$ISSUE\",\"base\":\"master\"}"

  echo -e "\n⏰ Wait on CI to complete"
  wait_for_clean_status $ISSUE
  echo -e "\n✅ CI finished, 'git push' again to close the PR and shutdown codespace"
  exit 0
else
  if [[ -n $(git status -sb | grep "ahead") ]]; then
    echo "branch is ahead and we will do normal push"
    exit 0
  else
    echo "is the same as remote"
    echo "$ISSUE"
    wait_for_clean_status $ISSUE "hello"
    # pull_request_merge $ISSUE
    exit 0
  fi
fi

# # if [[ -n $(git status --porcelain) ]]; then echo "repo is dirty"; fi
