#!/usr/bin/bash

echo " "
echo " "
echo "Starting Pre-Commit script"
echo " "
SECONDS=0
BRANCH_AHEAD=false
pnpm lint && pnpm test:e2e && pnpm test:manypkg
DURATION_IN_SECONDS=$SECONDS
echo " "
echo " "
echo "✅ Pre-Commit script took $DURATION_IN_SECONDS seconds to run"
echo " "
echo " "

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
