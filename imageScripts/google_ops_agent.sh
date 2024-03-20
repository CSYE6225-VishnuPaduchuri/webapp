#!/bin/bash

# Install the Google Cloud Operations Agent
# Reference from https://cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/installation

curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install

# Move the config file that is placed in tmp via file provisioner into the ops agent directory
sudo mv /tmp/googleOpsConfig.yaml /etc/google-cloud-ops-agent/config.yaml

# Change the ownership of the directory to root
sudo chown root:root /etc/google-cloud-ops-agent/config.yaml

# Restart the agent
sudo systemctl restart google-cloud-ops-agent