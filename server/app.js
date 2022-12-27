const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./schema/schema");
const cors=require("cors");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
app.use(cors())
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: graphqlSchema,
  })
);

app.listen(process.env.Port || 4000, () => {
  mongoose.connect("mongodb://localhost:27017/library");
});
