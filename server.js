const express = require("express");
const ejs = require("ejs");
const contentful = require("contentful");
const app = express();
app.set("view engine", "ejs");
app.use("/public", express.static("public"));

const port = process.env.PORT || 3000;
//rendering homepage
app.listen(port, () => {
  console.log("app listening on " + port);
});

//contentful api
const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "jm4bpx0pu3ep",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "bMmA_soXsOoFeFEKZPAD3vdHl0bgejSUc4DoJQgDUQ4",
});

app.get("/", (req, res) => {
  res.render("index");
});
