const express = require('express');
const serverlessExpress = require('aws-serverless-express');
const graphqlHttp = require("express-graphql");
const schema = require('./schema/schema');


const app = express();
const server = serverlessExpress.createServer(app);

// setup server endpoint with graphql middleware
app.use('/graphql', graphqlHttp({
  schema,
  graphiql: true
}));
app.listen(() => {
  console.log("GraphQL server now listening")
})


exports.handler = (event, context) => {
  try {
    serverlessExpress.proxy(server, event, context)
  } catch (err) {
    console.log(err);
  }
}
