#!/usr/bin/bash

echo " "
echo " "
echo " "
echo " "
echo "START"
SECONDS=0
pnpm lint && pnpm test:e2e && pnpm test:manypkg
DURATION_IN_SECONDS=$SECONDS
echo $DURATION_IN_SECONDS
