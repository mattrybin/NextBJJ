#!/usr/bin/bash

OWNER=mattrybin
REPO=nextbjj
line_numbers=0

ISSUE=$(printenv |
  grep "CODESPACE_NAME" |
  grep -Eo "CODESPACE_NAME=mattrybin-[0-9]{1,3}" |
  grep -Eo "[0-9]{1,3}")

# pull_request_add_line_numbers () {
# curl \
#   -X PATCH \
#   -H "Accept: application/vnd.github+json" \
#   -H "Authorization: Bearer $CUSTOM_GITHUB_TOKEN"\
#   -H "X-GitHub-Api-Version: 2022-11-28" \
#   https://api.github.com/repos/$OWNER/$REPO/pulls/$1 \
#   -d '{"title":"chore: add the amount of lines changed to commit [+231]"}'
# }
ISSUE_TITLE=$(curl -s -X GET "https://api.github.com/repos/mattrybin/nextbjj/issues/${ISSUE}" \
  -H 'Accept: application/vnd.github+json' \
  -H 'X-GitHub-Api-Version: 2022-11-28' \
  -H "Authorization: Bearer $CUSTOM_GITHUB_TOKEN" |
  gron | grep title | gron -u | jq -r ".title")

get_lines_diff () {
    git --no-pager diff --shortstat master
    plus=$(git --no-pager diff --shortstat master | awk -F',' '{print $2}' | grep -o '[0-9]\+')
    minus=$(git --no-pager diff --shortstat master | awk -F',' '{print $3}' | grep -o '[0-9]\+')
    result=$(($plus-$minus))
    if [ $result -lt 0 ] 
    then
        line_numbers="[$result]"
    else 
        line_numbers="[+$result]"
    fi 
    }

get_lines_diff
echo "HELLo"
echo $line_numbers
echo $ISSUE_TITLE

# pull_request_add_line_numbers 51

# echo " "
# echo " "
# echo "Starting Pre-Commit script"
# echo " "
# SECONDS=0
# BRANCH_AHEAD=false
# pnpm lint && pnpm test:e2e && pnpm test:manypkg
# DURATION_IN_SECONDS=$SECONDS
# echo " "
# echo " "
# echo "✅ Pre-Commit script took $DURATION_IN_SECONDS seconds to run"
# echo " "
# echo " "

# if [[ -n $(git status -sb | grep "ahead") ]]
#   then 
#     git fetch
#     # [ $(git rev-parse HEAD) = $(git ls-remote $(git rev-parse --abbrev-ref @{u} | \
#     # sed 's/\// /g') | cut -f1) ] && echo up to date || echo not up to date
#     # # $(git rev-parse HEAD) == $(git rev-parse @{u})
#     # # git log HEAD..origin/master --oneline
#     echo "✅ "
#   else
#     BRANCH_AHEAD=false
#   fi
# echo " "
# echo " "
