#!/bin/bash
cd $(dirname $0)
npm install
./bin/lucifer-verify
read -rsn1 -p 'Press any key to exit'; echo;
winnum=$(osascript -e 'tell application "Terminal" to get count windows')
if [ $winnum -gt 1 ]
then
    osascript -e 'tell application "Terminal" to close (every window whose name contains "macosx.command")' & exit
else
    osascript -e 'tell application "Terminal" to quit' & exit
fi
