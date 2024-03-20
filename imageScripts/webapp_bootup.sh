#!/bin/bash

# We will create a file to store the logs in var directory
sudo mkdir /var/log/webapp

# Change the ownership of the directory to the user
# Reference from https://askubuntu.com/a/6727
sudo chown -R csye6225:csye6225 /var/log/webapp

sudo chmod -R 775 /var/log/webapp

# Before we start, we need to unzip the webapp and move it from /tmp/ to /opt/csye6225

# Unzip the webapp
sudo unzip /tmp/webapp.zip -d /opt/csye6225/

# Go to the webapp directory or exit if it doesnt exist
cd /opt/csye6225/webapp/ || exit

# Install the dependencies
sudo npm install

# Now we will copy the webapp.service file into systemd directory of the system so that on boot of the
# system, the webapp will start automatically
sudo cp /tmp/webapp.service /etc/systemd/system/

# grant the ownership of the webapp.service file to the user
sudo chown csye6225:csye6225 /etc/systemd/system/webapp.service
sudo chmod 750 /etc/systemd/system/webapp.service
sudo chown -R csye6225:csye6225 /opt/csye6225/
sudo chmod -R 750 /opt/csye6225/webapp

# reload the daemon as we added a new service
sudo systemctl daemon-reload
sudo systemctl enable webapp

# start the webapp service
# though we are using enable in the above command
# we are starting the service immediately here as enable will only ensure that the service starts automatically
sudo systemctl start webapp

# check if it is running using status
sudo systemctl status webapp