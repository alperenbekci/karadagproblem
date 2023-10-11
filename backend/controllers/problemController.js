const Problem = require("../models/problemModel");
const mongoose = require("mongoose");

// get all problems
const getProblems = async (req, res) => {
  const problems = await Problem.find({}).sort({ createdAt: -1 });

  res.status(200).json(problems);
};

// get a single problem
const getProblem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such problem" });
  }

  const problem = await Problem.findById(id);

  if (!problem) {
    return res.status(404).json({ error: "No such problem" });
  }

  res.status(200).json(problem);
};

// create a new problem
const createProblem = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database
  try {
    const problem = await Problem.create({ title, load, reps });
    res.status(200).json(problem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a problem
const deleteProblem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such problem" });
  }

  const problem = await Problem.findOneAndDelete({ _id: id });

  if (!problem) {
    return res.status(400).json({ error: "No such problem" });
  }

  res.status(200).json(problem);
};

// update a problem
const updateProblem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such problem" });
  }

  const problem = await Problem.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!problem) {
    return res.status(400).json({ error: "No such problem" });
  }

  res.status(200).json(problem);
};

module.exports = {
  getProblems,
  getProblem,
  createProblem,
  deleteProblem,
  updateProblem,
};
