const Role = require('../models/role.model')


exports.create = async (req, res) => {
    // Validate request
    
    if (!req.body.roleCode) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    // Create a std
    const role = new Role({
        roleCode: req.body.roleCode,
        roleDesc: req.body.roleDesc      
    });
  
    // Save std in the database
    await role
      .save()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Role."
        });
      });
  };

  exports.findAll = (req, res) => {    
      Role.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred ."
        });
      });
  
  };
