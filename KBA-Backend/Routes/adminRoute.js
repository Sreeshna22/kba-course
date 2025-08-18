import { Router } from "express";       
import { authenticate } from '../Middleware/auth.js';
import admincheck from '../Middleware/admin.js';        


const admin = Router();             
const course = new Map();    
const  cart = new Map();                              
       
admin.post('/addCourse', authenticate, admincheck, (req, res) => { 
  try {
    const { CourseName, CourseId, CourseType, Description, Price } = req.body;

    if (course.get(CourseName)) {
      res.status(400).json({ msg: 'Course already exist' });
    } else {
      try {
        course.set(CourseName, { CourseId, CourseType, Description, Price });
        res.status(201).json({ msg: 'Course successfully entered' });
      } catch {
        res.status(400).json({ msg: 'Something went wrong while setting data' });
      }
    }
  } catch {
    res.status(500).json({ msg: 'Something went wrong' });
  }
});





admin.put('/updateCourse', (req, res) => {               
  try {
    const { CourseName, CourseId, CourseType, Description, Price } = req.body;

    if (course.get(CourseName)) {
      course.set(CourseName, { CourseId, CourseType, Description, Price });
      res.status(200).json({ msg: "Course details updated successfully" });
    } else {
      res.status(404).json({ msg: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Something gone wrong"});
  }
});


admin.patch('/updateCourse', (req, res) => {              
  const { CourseName, Price } = req.body;

  const result = course.get(CourseName);
  console.log( result);

  if (result) {
  
    course.set(CourseName, {
      CourseId: result.CourseId,
      CourseType: result.CourseType,
      Description: result.Description,
      Price: Price 
    });

    res.status(200).json({ msg: "Course price updated successfully" });
  } else {
    res.status(404).json({ msg: "Course not found" });
  }

});


admin.delete('/deleteCourse', (req, res) => {
  try {
    const { CourseName } = req.body;

    if (course.get(CourseName)) {                  
      course.delete(CourseName);
      res.status(200).json({ msg: 'Course deleted successfully' });
    } else {       
      res.status(404).json({ msg: 'Course not found' });
    }
  } catch {
    res.status(500).json({ msg: 'Internal server error' });
  }      
});











export { admin,course ,cart};     
