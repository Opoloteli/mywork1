module.exports = (app) => {
  // import staff controller
  const staff_logic = require("../controllers/staff.controller.js");

  //import express router
  var router = require("express").Router();

  // create staff api router
  router.post("/add", staff_logic.create);

  //retreives all staff
  router.get("/r", staff_logic.findAll);

  //deletes a staff
  router.delete("/delete/:id", staff_logic.delete);

  //updates staff
  router.put("/:id", staff_logic.update);

  // define default route
  app.use("/staff", router);
};
//http:locallhost8082/staff/add
