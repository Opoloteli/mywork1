module.exports = (app) => {
  // import student controller
  const students_logic = require("../controllers/student.controller.js");

  //import express router
  var router = require("express").Router();

  // create student api router
  router.post("/add", students_logic.create);

  //retrives all records
  router.get("/r", students_logic.findAll);

  //deletes a student
  router.delete("/delete/:id", students_logic.delete);

  //updates a student
  router.put("/:id", students_logic.update);

  app.use("/students", router);
};

//http:locallhost8082/students
