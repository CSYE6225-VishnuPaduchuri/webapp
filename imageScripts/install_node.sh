#!/bin/bash

# Run this command to update the installed packages to latest version
sudo yum update -y

# Run this command to upgrade the installed packages to latest version
sudo yum upgrade -y

# Install Node.js
# Taken reference from https://docs.e2enetworks.com/guides/install_node.js_npm.html

sudo yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_6.x | sudo -E bash -
sudo yum install -y nodejs

# To verify if Node.js is installed
node -v
npm -v