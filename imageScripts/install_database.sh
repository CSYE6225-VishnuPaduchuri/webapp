#!/bin/bash

# Install Postgres
# Reference taken from https://www.linode.com/docs/guides/centos-install-and-use-postgresql/
sudo yum install -y postgresql-server postgresql-contrib

# As centos does not enable postgres by default, we will run the below command
sudo postgresql-setup --initdb

sudo systemctl start postgresql.service

# Using the below command we can enable postgresql service to automatically start on boot
sudo systemctl enable postgresql.service

# Using the below command we will check if postgresql service is running
sudo systemctl status postgresql.service

# Setting up the DB and adding a user
# Reference taken from https://medium.com/@mohammedhammoud/postgresql-create-user-create-database-grant-privileges-access-aabb2507c0aa

sudo -u postgres psql -c "CREATE DATABASE vis_db;"
sudo -u postgres psql -c "CREATE USER vis_user WITH PASSWORD 'password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE vis_db TO vis_user;"

# Update the pg_hba.conf file by replacing ident with md5
sudo sed -i.bak 's/ident/md5/g' /var/lib/pgsql/data/pg_hba.conf
sudo systemctl restart postgresql