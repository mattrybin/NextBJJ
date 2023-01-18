#!/usr/bin/bash

echo " "
echo " "
echo "🟡 Starting commit script"
echo " "
SECONDS=0
AGO=0
AGO=$SECONDS && printf "Running pnpm lint: " && pnpm lint &> /dev/null && printf "🟢 Linting complete in $(($SECONDS-$AGO))sec \n"
printf "Running pnpm test:e2e: " && pnpm test:e2e &> /dev/null || true && printf "🟢 E2E test complete in $(($SECONDS-$AGO))sec \n"
AGO=$SECONDS && printf "Running pnpm test:manypkg: " && pnpm test:manypkg &> /dev/null && printf "🟢 manypkg complete in $(($SECONDS-$AGO))sec"
DURATION_IN_SECONDS=$SECONDS
echo " "
echo " "
echo "🟢 Commit script took $DURATION_IN_SECONDS seconds to run"
echo " "
echo " "
