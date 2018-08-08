# Equeum Postgraphile

A basic [Postgraphile](https://www.graphile.org/postgraphile/) example without the use of HTTP middleware so that it can work, with modification, on serverless hosts like AWS Lambda or Azure Functions.

## Installation

1. `git clone https://github.com/mnrm/postgraphile-example.git`
2. `cd postgraphile-example`
3. `npm install`

## Setup a Postgres Database

If you don't have a Postgres database installed and running, then do that now. You can install Postgres using Docker Compose from here: https://github.com/mnrm/docker-postgres

Create an `.env` file in the root directory with at least `DATABASE_CONNECTION_STRING` defined. The `env.example` file is provided as an example.

## Start the Express server

`npm run serve`

## Use GraphiQL

Open a browser and navigate to http://localhost:3000 to interact with GraphiQL. 

If you installed Postgres from https://github.com/mnrm/docker-postgres, there is a sample `users` database table and you can execute the following query as a test:

```js
{
  allUsers {
    edges {
      node {
        id
        firstName
      }
    }
  }
}
```

## Use Your Own Front-End

POST to `localhost:3000/graphql`

## Use With Serverless Hosting / Function As A Service (FAAS)

This example doesn't use the Postgraphile HTTP Middleware on purpose. The HTTP Middleware isn't compatible with serverless environments like **AWS Lambda** or **Azure Functions** by default. This example can be modified to remove Express and run within a serverless host.

There are libraries that will proxy Lambda or Functions to HTTP frameworks ([up](https://github.com/apex/up), [aws-serverless-express](https://github.com/awslabs/aws-serverless-express), [azure-function-express](https://github.com/yvele/azure-function-express)), and thus allow the Postgraphile HTTP Middleware to run. However, if you use environment proxies in your URL (http://example.com/staging), currently the Postgraphile GraphiQL HTTP will not work due to an [issue](https://github.com/postgraphql/postgraphql/issues/526).
