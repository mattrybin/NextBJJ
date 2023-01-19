#!/usr/bin/bash
SECONDS=0
AGO=0
OWNER=mattrybin
REPO=nextbjj
LINE_NUMBER=0
BRANCH=$(git rev-parse --abbrev-ref HEAD)
PROTECTED_BRANCHES="^(master)"
ISSUE=$(printenv |
  grep "CODESPACE_NAME" |
  grep -Eo "CODESPACE_NAME=mattrybin-[0-9]{1,3}" |
  grep -Eo "[0-9]{1,3}")

ISSUE_TITLE=$(curl -s -X GET "https://api.github.com/repos/mattrybin/nextbjj/issues/${ISSUE}" \
  -H 'Accept: application/vnd.github+json' \
  -H 'X-GitHub-Api-Version: 2022-11-28' \
  -H "Authorization: Bearer $CUSTOM_GITHUB_TOKEN" |
  gron | grep title | gron -u | jq -r ".title")

function run_exit () {
    AGO=$SECONDS
    printf "🟡 Running $1: "
    # pnpm test:e2e &> /dev/null
    $1 &> /dev/null
    ret=$?
    if [ $ret = 0 ]; then
        printf "🟢 completed "  
        printf "in $(($SECONDS-$AGO))sec \n"
    else
        printf "🔴 Command: $1 failed with exit code: $? "
        printf "in $(($SECONDS-$AGO))sec \n"
        exit 1
    fi
}



get_lines_diff () {
    git --no-pager diff --shortstat master
    plus=$(git --no-pager diff --shortstat origin/master | awk -F',' '{print $2}' | grep -o '[0-9]\+')
    minus=$(git --no-pager diff --shortstat origin/master | awk -F',' '{print $3}' | grep -o '[0-9]\+')
    result=$(($plus-$minus))
    if [ $result -lt 0 ] 
    then
        LINE_NUMBER="[$result]"
    else 
        LINE_NUMBER="[+$result]"
    fi 
    }


pull_request_add_line_numbers () {
curl \
  -X PATCH \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $CUSTOM_GITHUB_TOKEN"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/$OWNER/$REPO/pulls/$1 \
  -d '{"title":"new title"}'
}

codespace_close () {
  curl \
  -X DELETE \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $CUSTOM_GITHUB_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/user/codespaces/$CODESPACE_NAME"
}

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

pull_request_add_line_numbers () {
curl \
  -X PATCH \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $CUSTOM_GITHUB_TOKEN"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/$OWNER/$REPO/pulls/$1 \
  -d "{\"title\":\"$2 $3\"}"
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


# echo " "
echo "🔵 Starting push script"
run_exit "pnpm install --silent" 

if [[ "$BRANCH" =~ $PROTECTED_BRANCHES ]]; then
  echo "🔵 Branch is master, will begin to create pull request"
  run_exit "git reset --soft $(git merge-base HEAD origin/master)" 
  run_exit "git commit -am \"\" --allow-empty-message --no-verify" 
  run_exit "git pull --rebase" 
  run_exit "git checkout -t -b issue-$ISSUE" 
  run_exit "git push -u origin issue-$ISSUE --no-verify" 
  curl -S -s -o /dev/null \
    -X POST \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer $CUSTOM_GITHUB_TOKEN" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    https://api.github.com/repos/mattrybin/nextbjj/pulls \
    -d "{\"issue\":$ISSUE,\"head\":\"issue-$ISSUE\",\"base\":\"master\"}"

  # echo -e "\n⏰ Wait on CI to complete"
  #   wait_for_clean_status $ISSUE
  #   get_lines_diff
  #   pull_request_add_line_numbers $ISSUE "$ISSUE_TITLE $LINE_NUMBER"
  #   pull_request_merge $ISSUE

  #   DURATION_IN_SECONDS=$SECONDS
  #   echo " "
  #   echo " "
  #   echo "✅ Push script took $DURATION_IN_SECONDS seconds to run"
  #   echo " "
  #   echo " "

  #   codespace_close
  # echo -e "\n✅ CI finished, 'git push' again to close the PR and shutdown codespace"
  # exit 1
else
  if [[ -n $(git status -sb | grep "ahead") ]]; then
    echo "🔵 branch has commit that need to be pushed"
    run_exit "git push --no-verify" 
    echo "🔵 Run push command again to close this PR if successful"
    exit 1
  else
    echo "is the same as remote"
    wait_for_clean_status $ISSUE
    # get_lines_diff
    # pull_request_add_line_numbers $ISSUE "$ISSUE_TITLE $LINE_NUMBER"
    # pull_request_merge $ISSUE

    DURATION_IN_SECONDS=$SECONDS
    echo " "
    echo " "
    echo "✅ Push script took $DURATION_IN_SECONDS seconds to run"
    echo " "
    echo " "

    # codespace_close
    exit 1
  fi
fi
