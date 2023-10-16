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

const allPropertyIds = [];
//get each propertty id and create a route with each item sys.id as the endpoint
const getAllCategoryIds = async () => {
  //getting entire categories array from contentful to render it to our views
  await client.getEntries({ content_type: "properties" }).then((res) => {
    const allItems = res.items;
    allItems.forEach((item) => allPropertyIds.push(item.sys.id));
  });
  ``;
  // createRouteBasedOnId();
  allPropertyIds.forEach((categoryId) => {
    console.log(categoryId);

    app.get(`/view-property/${categoryId}`, (req, res) =>
      res.render("view-property")
    );
    ``;
  });
};
getAllCategoryIds();

app.get("/", (req, res) => {
  res.render("index");
});
// app.get("/view-property", (req, res) => {
//   res.render("view-property");
// });
