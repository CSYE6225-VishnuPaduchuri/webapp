#!/bin/bash

# Create a group
sudo groupadd csye6225

# Create a user for the group and has nologin shell
sudo useradd -g csye6225 -s /usr/sbin/nologin -d /opt/csye6225 -m csye6225

# Change the ownership of the directory to the user
# Reference from https://askubuntu.com/a/6727
sudo chown -R csye6225:csye6225 /opt/csye6225/

sudo chmod -R 775 /opt/csye6225/