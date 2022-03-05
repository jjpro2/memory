#!/usr/bin/bash

PWD=`pwd`
GIT_PATH=~/src/memory
DEPLOY_PATH=~/www/memory

if [ $PWD != $GIT_PATH ]; then
  echo "Error: Must check out git repo to $GIT_PATH"
  echo "  Current directory is $PWD"
  exit 1
fi 

if [ $USER == "root" ]; then
  echo "Error: must run as non-root user"
  echo "  Current user is $USER"
  exit 2
fi 

# build the project
rm -rf build # clean up previous build 
npm install 
npm run build 

# create the deployment path if not exists, 
# if path already exists, we'll clear all files in there 
if [ -d $DEPLOY_PATH ]; then
  echo "Previous version of deployment exists at $DEPLOY_PATH"
  echo "  Cleaning the deployment directory"
  echo rm -rm $DEPLOY_PATH/*
  rm -rf $DEPLOY_PATH/*
fi

mkdir -p $DEPLOY_PATH
echo "Created deployment path"


# Copy build artifacts to our deployment path 
cp -R ./build/* $DEPLOY_PATH
echo "Copied build artifacts to deployment path"

# DONE
echo "yah... Finished deployment!"