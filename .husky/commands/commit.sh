#!/usr/bin/bash

echo " "
echo " "
echo "Starting Pre-Commit script"
echo " "
SECONDS=0
pnpm lint && pnpm test:e2e && pnpm test:manypkg
DURATION_IN_SECONDS=$SECONDS
echo " "
echo " "
echo "Commit took $DURATION_IN_SECONDS seconds to run"
echo " "
echo " "
