const Student = require('../models/student.model')


exports.create = async (req, res) => {
    // Validate request
    
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    // Create a std
    const std = new Student({
      name: req.body.name,
      age: req.body.age,
      adress : req.body.adress,
      courses :req.body.courses,
      classRes :req.body.classRes
       
    });
  
    // Save std in the database
    await std
      .save()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the student."
        });
      });
  };

  exports.findAll = (req, res) => {
    console.log(req.user)
     
      Student.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the student."
        });
      });
   
    
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    if (req.user == "admin") {
       
          Student.findById(id)
          .populate("classRes")
            .then(data => {
              if (!data)
                res.status(404).send({ message: "Not found Student with id " + id });
              else res.send(data);
            })
            .catch(err => {
              res
                .status(500)
                .send({ message: "Error retrieving Student with id=" + id });
            });
    } else {
      res.status(403)
        .send({
          message: "Unauthorised access;"
        });
    }
   
  };

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Student.findByIdAndUpdate(id, req.body, { new: true,useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Student with id=${id}. Maybe Student was not found!`
          });
        } else res.send({ message: "Student was updated successfully.",data:data });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Student with id=" + id
        });
      })
  };
  
   
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Student.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
          });
        } else {
          res.send({
            message: "Student was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Student with id=" + id
        });
      });
  };

 
  