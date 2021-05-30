![npm](https://img.shields.io/badge/node-green) ![npm](https://img.shields.io/badge/angular-red) ![npm](https://img.shields.io/badge/postgresql-v13-blue)

## Description

This the backend for a project for a job-interview.

## Installation

```bash
$ npm install
```
## Before Starting
  Add a .env file in the root folder of the project, there is a .env.example that show what it should contain the .env file.
  You also are going to need to add a ormconfig.json file, this is for setting your local connection to your DB, in this project it was use PG 13, so is recomended that you use this version too in this project. This is the format of the ormconfig.json :
  
  ```bash
    {
     "type": "postgres", <== this should stay the same
     "host": "localhost", <== this should stay the same, depends on your DB
     "port": 5432, <== example, default port
     "username": "root", <== example, default
     "password": "root", <== example
     "database": "database", <== example,
     "entities": ["dist/**/**.entity{.ts,.js}"], <== this should stay the same
     "migrations": [
        "src/migration/**/*.ts" <== this should stay the same
     ],
     "subscribers": [
        "src/subscriber/**/*.ts" <== this should stay the same
     ],
     "synchronize": true, <== this should stay the same
     "cli":{
        "migrationsDir":"./" <== this should stay the same
     }
   }
  ```
  It should go in the root folder, right here:
  
  ![image](https://user-images.githubusercontent.com/44983658/120091250-616d8080-c0d7-11eb-8906-aaa54c213267.png)


## Running the migrations

use this command for generating the migrations

```bash
  typeorm migration:generate -n test
```

once thats done all the tables will be created, and you can run the app. There are no seeds needed for this project.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

Nest is [MIT licensed](LICENSE).
