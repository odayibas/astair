# Deployment Configuration

We will create postgre database in server. As follows:

`docker run --name astair_postgres -e POSTGRES_USER="..." -e POSTGRES_PASSWORD="..." -v /data/postgresql:/var/lib/postgresql/data -d postgres:10`

**Note:** 'POSTGRES\_USER' optional environment variable is used in conjunction with POSTGRES\_PASSWORD to set a user and its password. If it is not specified, then the default user of "postgres" will be used.

DBeaver is free and open source universal database tool for developers and database administrators. **You can use tools like DBeaver to run the "management-app/db.sql" file.**

We have created a new server.

**Project Directory:** /opt/astair/

We uploaded our project on the github page to the server with the following code:

`git clone https://github.com/odayibas/astair`

`git pull origin master` **(Update for project)**

We build an image from a Dockerfile for frontend.

`cd /opt/astair/management-app/front-end`

`docker build -t astair-frontend .`

We build an image from a Dockerfile for backend.

`cd /opt/astair/management-app/backend-end`

`docker build -t astair-backend .`

Run a command in a new container for backend and frontend. As follows:

`docker run -d -p 8090:8090 astair-backend`

`docker run -d -p 3000:3000 astair-frontend`
