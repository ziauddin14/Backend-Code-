import Student from "../models/students.js";

const createStudent = async (req, res) => {
  try {
    const { name, age, courses } = req.body;
    const newStudent = new Student({ name, age, courses });
    await newStudent.validate();
    await newStudent.save();
    res.send({
      message: "Student created successfully",
      data: newStudent,
    });
  } catch (error) {
    res.send({
      message: "Error creating student",
      error: error.message,
    });
  }
};

const getAllStudents = async (_, res) => {
  try {
    const students = await Student.find({}).populate("courses");
    res.send({
      message: "Students retrieved successfully",
      data: students,
    });
  } catch (error) {
    res.send({
      message: "Error retrieving students",
      error: error.message,
    });
  }
};
export { createStudent, getAllStudents };
