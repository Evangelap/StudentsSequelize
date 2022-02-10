var express = require('express');
var router = express.Router();
const db = require('../models/index');
const EvaStudent = db.sequelize.models.EvaStudent;

router.get('/', async function (req, res) {
  
  let student = await EvaStudent.findAll();
  
  res.render('allStudents',
      {
          title: 'All Students',
          
          students: student
      });
});

router.get('/create', (req,res) => {
    res.render('create', {
        title: 'New Students page ',
        message: 'New Student'
    });
});

router.post('/create', async function (req, res) {

    await EvaStudent.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.date,
        tuitionFees: req.body.tuition
    });   
    res.redirect('/');
});

router.get('/delete', async function (req, res) {
    
    await EvaStudent.destroy({
        where: {
            id: req.query.id
        },
    });   
    res.render('delete',
        {
            title: 'Students delete page',
            message: `You deleted student with id: ${req.query.id} `
        });
});

router.get('/edit',(req,res) => {
    
    res.render('edit',{
        id: req.query.id,
        title: 'Students edit page',
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        dateOfBirth: req.query.dateOfBirth,
        tuitionFees: req.query.tuitionFees
    });
});

router.post('/edit', async function (req, res) {
    
    await EvaStudent.update(
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.date,
            tuitionFees: req.body.tuition
        },
        {
            where: {
                id: req.body.id
            }
    });   

    res.redirect('/');
  
});

module.exports = router;
