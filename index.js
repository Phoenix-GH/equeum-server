const express = require("express");
const bodyParser = require("body-parser");
const graphql = require("./src/graphql");

// Environment variables from the ".env" file in the root directory if it exists.
// Production environment variables should be set on the server, not in a file.
if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}

const app = express();

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Allow files in "/assets" to be web accessible.
app.use(express.static("assets"));

// Parse graphql json from the post request.
app.use(bodyParser.json());

// graphiql endpoint.
app.get("/", (req, res) => {
  res.sendFile("graphiql.html", { root: "." });
});

// graphql endpoint.
app.post("/graphql", (req, res) => {
  const query = req.body.query;
  const databaseSchemaName = process.env.DATABASE_SCHEMA;
  const databaseURL = process.env.DATABASE_CONNECTION_STRING;
  if (!databaseURL) {
    throw new Error(
      "Define a DATABASE_CONNECTION_STRING in an .env file. See env.example."
    );
  }
  graphql(query, databaseURL, databaseSchemaName)
    .then(result => {
      res.json(result);
    })
    .catch(e => {
      res.json({ error: e });
      console.log(e);
    });
});

// Go
app.listen(3000, () => console.log("Example app listening on port 3000"));
