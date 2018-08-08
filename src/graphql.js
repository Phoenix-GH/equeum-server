const { createPostGraphQLSchema } = require("postgraphile-core");
const { withPostGraphQLContext } = require("postgraphile");
const { graphql } = require("graphql");
const pg = require("pg");

async function performQuery(
  pgPool,
  schema,
  query,
  variables,
  jwtToken,
  operationName
) {
  return await withPostGraphQLContext(
    {
      pgPool
      //jwtToken: jwtToken,
      //jwtSecret: "...",
      //pgDefaultRole: "..."
    },
    async context => {
      return await graphql(
        schema,
        query,
        null,
        { ...context },
        variables,
        operationName
      );
    }
  );
}

async function execute(query, databaseURL, schemaName = "public") {
  const pgPool = new pg.Pool({ connectionString: databaseURL });
  const schema = await createPostGraphQLSchema(databaseURL, schemaName, {});
  const result = await performQuery(pgPool, schema, query);
  return result;
}

module.exports = execute;
