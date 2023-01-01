#!/usr/bin/bash

echo " "
echo " "
echo " "
echo " "
echo "START"
SECONDS=0
pnpm lint && pnpm test:e2e && pnpm test:manypkg
DURATION_IN_SECONDS=$SECONDS
echo "\n\n Commit took $DURATION_IN_SECONDSs to run\n\n"
