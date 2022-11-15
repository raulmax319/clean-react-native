#!/bin/sh

echo "Generating iOS project..."
cd "$(dirname "$0")/../ios"

proj=`ls -1 *.xcodeproj 2>/dev/null | wc -l`

# Verify if any xcodeproj exists
if [ $proj != 0 ]; then
    echo "👻 Deintegrating Pods from project..."
    pod deintegrate
    
    # Removing Xcode project and workspace
    echo "👻 Removing Xcode project and workspace..."
    rm -rf *.xcodeproj
    rm -rf *.xcworkspace
else
    rm -rf Pods
fi

if [ which xcodegen >/dev/null 2>&1 ]; then
    echo "👻 Generating Xcode project using xcodegen..."
    xcodegen generate
else
    echo "👹 It seems that xcodegen is not installed."
    echo "please install it by following the instructions at"
    echo "https://github.com/yonaskolb/XcodeGen"
    exit 1
fi

if [ which pod >/dev/null 2>&1 ]; then
    echo "👻 Installing Pods..."
    pod install
else
    echo "👹 It seems that cocoapods is not installed."
    echo "please install it by following the instructions at"
    echo "https://guides.cocoapods.org/using/getting-started.html"
    exit 1
fi