#!/bin/sh

echo "Generating iOS project..."
cd "$(dirname "$0")/../ios"

proj=`ls -1 *.xcodeproj 2>/dev/null | wc -l`

# Verify if any xcodeproj exists
if [ $proj != 0 ]; then
    echo "Deintegrating Pods from project..."
    pod deintegrate
    
    # Removing Xcode project and workspace
    rm -rf *.xcodeproj
    rm -rf *.xcworkspace
else
    rm -rf Pods
fi

xcodegen generate

# Installing Pods
pod install