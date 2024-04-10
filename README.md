# webapp

## Prerequisites

In order to test this application on your local, we will be requiring the following steps:

1. Install Node on your system
2. Install npm on your system
3. Setup Up Postgres DB on your system
4. git clone the repositorty on your system

## Instruction to start application on local

1. Create an .env file with the following keys and update values accordingly

   1. SERVER_PORT=NUMBER
   2. DATABASE_NAME=postgres
   3. DATABASE_USER_NAME=USERNAME
   4. DATABASE_PASSWORD=PASSWORD
   5. DATABASE_HOST_URL=localhost

2. Run the command "npm i" to install dependencies required

3. Run the command "npm run dev" for running in development mode or Run the command "npm run production" for running in production mode.

## Packer

1. **Packer init** filepath to initailise
2. **Packer fmt** to check if there are any format changes
3. **Packer validate** to check if whatever we have added to the config file is valid or not

<!-- Test CD for Instance Template -->
