const db = require("../models");
const Student = db.students;

//creates students
exports.create = (request, response) => {
  if (!request.body.first_name) {
    response.status(400).send({
      message: "fill in the first name",
    });
    return;
  }

  // creates  student object
  const add_student = {
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    gender: request.body.gender,
    class: request.body.class,
    physical_address: request.body.physical_address,
    status: request.body.status ? request.body.status : false,
  };
  //
  Student.create(add_student)
    .then((data) => {
      //return data on success
      response.send(data);
    })
    .catch((err) => {
      //return error on failure
      response.status(400).send({
        message: err.message || "Error  occurred while adding Student",
      });
    });
};

//updates students
exports.update = (req, res) => {
  const id = req.params.id;

  Student.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update student with id=${id}. Maybe student was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating student with id=" + id,
      });
    });
};

//retrives all data
exports.findAll = (req, res) => {
  const first_name = req.query.first_name;
  var condition = first_name
    ? { first_name: { [Op.like]: `%${first_name}%` } }
    : null;

  Student.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Error occured retriving student",
      });
    });
};

//deletes a student
exports.delete = (req, res) => {
  const id = req.params.id;

  Student.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "student was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete student with id=${id}. Maybe student was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete student with id=" + id,
      });
    });
};
