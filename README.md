![npm](https://img.shields.io/badge/node-green) ![npm](https://img.shields.io/badge/angular-red) ![npm](https://img.shields.io/badge/postgresql-v13-blue)

## Description

This the backend for a project for a job-interview. You can find the Frontend [here](https://github.com/angelsucasas/job-interview-frontend)

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
![image](https://user-images.githubusercontent.com/44983658/120091367-84e4fb00-c0d8-11eb-8e45-ccda3289f9b1.png)

## API´s availables

```bash
  GET:http://localhost:3000/employee
```
Gets all employees in the DB

----------------------------------------------------

```bash
  POST:http://localhost:3000/employee
```
Post data to create a employee in the DB. Format of the json:

```bash
{
    "firstName":string;
    "secondName":string;
    "firstLastname":string;
    "secondLastName":string;
    "position":string;
    "deparment":string;
}
```
----------------------------------------------------
```bash
  DELETE:http://localhost:3000/employee
```

Deletes a employee from the DB with the specify ID
```bash
  {
    id:number
  }
```

----------------------------------------------------
```bash
  GET:http://localhost:3000/employee/supervisor
```
gets all employees that are supervisor of another employee

--------------------
```bash
  POST:http://localhost:3000/employee/supervisor
```
Creates a new "Supervisor" (that is also a employee) to another employee. (see the MER [here](https://github.com/angelsucasas/job-interview-backend/blob/main/src/db/job-interview%20MER.png)). json format:


```bash
  {
    employee:{
      id:number
    },
    supervisor:{
      id:number
    }
  }
```

--------------------

```bash
  DELETE:http://localhost:3000/employee/supervisor
```
Deletes a supervisor from a employee. json format:

```bash
  {
    id:number
  }
```

--------------------
```bash
  POST:http://localhost:3000/employee/account
```
Associates an Account with an employee.Json format:

```bash
  {
    employee:{
      id:number
    },
    account:{
      id:number
    }
  }
```

--------------------
```bash
  GET:http://localhost:3000/employee/account
```

Gets all account associated to one employee (not all accounts need to have a employee as owner)

--------------------

```bash
  GET:http://localhost:3000/account
```

get all accounts in the DB

--------------------

```bash
  POST:http://localhost:3000/account
```

Creates a new Account. json format:


```bash
  {
    productNumber:string;
    currentAmount:number;
  }
```

--------------------
```bash
  DELETE:http://localhost:3000/account
```
Deletes a account with the specify ID. json format;
```bash
  {
    id:number
  }
```

--------------------

```bash
  GET:http://localhost:3000/invoice
```
 gets all invoices in the db (invoices are a combination of varios "transactions" made by one "employee" with an specific "account". (see the MER [here](https://github.com/angelsucasas/job-interview-backend/blob/main/src/db/job-interview%20MER.png))
 
 --------------------
 
```bash
  POST:http://localhost:3000/invoice
```

creates a new invoice. json format:

```bash
{
    concept:string;
    aprovedBy:string;
    sign:string;
    startDate:Date;
    endDate:Date;
}
```

--------------------

```bash
  DELETE:http://localhost:3000/invoice
```

deletes a invoice with the specify id. json format:

```bash
  {
    id:number
  }
```

--------------------

```bash
  GET:http://localhost:3000/transaction
```
gets all transactions of all accounst in the DB.

--------------------

```bash
  POST:http://localhost:3000/transaction
```

Creates a new transaction. json format:

```bash
  {
    amount:string;
    description:string;
    sign:string;
    originAccount:{
        id:number;
    };
    destinyAccount:{
        id:number;
    };
  }
```

--------------------

```bash
  DELETE:http://localhost:3000/transaction
```
Deletes a transaction with the specify id. json format:


```bash
{
  id:number
}
```

## License

Nest is [MIT licensed](LICENSE).
