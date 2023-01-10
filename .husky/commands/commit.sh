#!/usr/bin/bash

OWNER=mattrybin
REPO=nextbjj

# pull_request_add_line_numbers () {
# curl \
#   -X PATCH \
#   -H "Accept: application/vnd.github+json" \
#   -H "Authorization: Bearer $CUSTOM_GITHUB_TOKEN"\
#   -H "X-GitHub-Api-Version: 2022-11-28" \
#   https://api.github.com/repos/$OWNER/$REPO/pulls/$1 \
#   -d '{"title":"chore: add the amount of lines changed to commit [+231]"}'
# }

get_lines_diff () {
    git --no-pager diff --shortstat master > sed 's/.*,//'
}

get_lines_diff

# pull_request_add_line_numbers 51

# pull_request_status_check() {
#   curl -s \
#     -H "Accept: application/vnd.github+json" \
#     -H "Authorization: Bearer $CUSTOM_GITHUB_TOKEN" \
#     -H "X-GitHub-Api-Version: 2022-11-28" \
#     https://api.github.com/repos/mattrybin/nextbjj/pulls/$1 |
#     gron | grep mergeable_state | grep -q "clean"
# }

# pull_request_status_check

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
