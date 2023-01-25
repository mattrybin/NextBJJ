#!/usr/bin/bash

SECONDS=0
AGO=0

function run() {
    AGO=$SECONDS
    printf "🟡 Running $1: "
    $1 &>/dev/null
    ret=$?
    if [ $ret = 0 ]; then
        printf "🟢 completed "
        printf "in $(($SECONDS - $AGO))sec \n"
    else
        printf "🔴 Command: $1 failed with exit code: $? "
        printf "in $(($SECONDS - $AGO))sec \n"
        exit 1
    fi
}

echo " "
echo " "
echo "🔵 Starting commit script"
run "pnpm lint"
run "pnpm test:e2e"
run "pnpm test:manypkg"
DURATION_IN_SECONDS=$SECONDS
echo "🟢 Commit script took $DURATION_IN_SECONDS seconds to run"
echo " "
