import Course from "../models/course.js";

export const createCourse = async (req, res) => {
  try {
    const { name, instructor } = req.body;
    const newObject = new Course({ name, instructor });
    await newObject.validate();
    await newObject.save();
    res.send({
      message: "Course created successfully",
      data: newObject,
    });
  } catch (error) {
    res.send({
      message: "Error creating course",
      error: error.message,
    });
  }
};
