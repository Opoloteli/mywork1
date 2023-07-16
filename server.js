// import body-parser,cors and express

//building rest APIs
const express = require("express");

//help to parse the request nd create a request.body object
const bodyParser = require("body-parser");

//middleware to protect api
const cors = require("cors");
const { status } = require("express/lib/response");

//define app framework
const app = express();

//parse json requests of content-type - application/json
app.use(bodyParser.json());

//parse requests of content-type - application/x-www-form-url
app.use(bodyParser.urlencoded({ extended: true }));

//simple API request
app.get("/v1/get-root", (request, response) => {
  response.json({
    message: "Your first API request",
  });
});

//3-way API request
app.get("/v1/get-root-param", (request, response) => {
  const id_ = request.query.id;

  if (!id_) {
    //invalid request if id param is not included
    response.status(400).send({
      message: "ID param not passed, please pass a required parameter",
      status: "Error",
      status_code: 400,
    });
  } else if (id_ == 100) {
    //valid request if id is 100
    response.json({
      message: "Valid ID parameter",
      status: "Success",
      status_code: 200,
    });
  } else {
    //invalid request if id is not 100
    response.status(400).send({
      message: "Invalid Request",
      status: "Error",
      status_code: 400,
    });
  }
});

//addition of 2 numbers
//assignment
app.get("/v1/add-numbers", (request, response) => {
  const x = parseInt(request.query.x);
  const y = parseInt(request.query.y);

  //invalid request if both parameters are not passed

  if (!request.query.y) {
    // invalid request if y parameter is not passed
    response.status(400).send({
      message: "y not passed, please pass an y",
      status: "Error",
      status_code: 400,
    });

    return;
  }
  if (!request.query.x) {
    // invalid request if x parameter is not passed
    response.status(400).send({
      message: "x not passed, please pass an x",
      status: "Error",
      status_code: 400,
    });

    return;
  }
  // invalid request if x & y are not integers
  if (isNaN(x) || isNaN(y)) {
    response.status(400).json({
      message: "Please use integers only",
      status: "Error",
      status_code: 400,
    });
  }

  //addition of the parameters passed
  const result = x + y;
  response.json({ result: result, status: "success", status_code: 200 });
});

//update students
// app.put("/", (request, response) => {
//   const data = ["Opolot", "Elisha", "M", "s6", "Kasubi", "true", 1];
//   db.query(
//     "UPDATE students SET  first_name = ?, last_name = ?, gender= ?, class = ?, physical_address = ?, status = ? where id =?",
//     data,
//     (err, result) => {
//       if (err) {
//         res.send("Error");
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

//import models
//create tables if they dont exist
const db = require("./models");
db.sequelize_me.sync();

//import models

//define other routes
require("./routes/student.routes")(app);
require("./routes/staff.routes")(app);

//define port the project will run on
//const PORT = process.env.PORT;
const PORT = 8047;

//listen to Port
app.listen(PORT, () => {
  console.log(`Server successfully started at port - ${PORT}. `);
});
