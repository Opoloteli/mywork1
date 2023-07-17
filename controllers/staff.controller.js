const db = require("../models");
const Staff = db.staff;

//creates staff
exports.create = (request, response) => {
  if (!request.body.first_name) {
    response.status(400).send({
      message: "fil in the first name",
    });
    return;
  }

  // creates  staff object
  const add_staff = {
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    gender: request.body.gender,
    class: request.body.class,
    physical_address: request.body.physical_address,
    status: request.body.status ? request.body.status : false,
  };
  //
  Staff.create(add_staff)
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

  Staff.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Staff was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update staff with id=${id}. Maybe staff was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating staff with id=" + id,
      });
    });
};

//retrieves all data
exports.findAll = (req, res) => {
  const first_name = req.query.first_name;
  var condition = first_name
    ? { first_name: { [Op.like]: `%${first_name}%` } }
    : null;

  Staff.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Error occured retriving student",
      });
    });
};

//deletes a staff
exports.delete = (req, res) => {
  const id = req.params.id;

  Staff.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "staff was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete staff with id=${id}. Maybe staff was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete staff with id=" + id,
      });
    });
};
