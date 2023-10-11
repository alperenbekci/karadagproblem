const express = require("express");
const {
  getProblems,
  getProblem,
  createProblem,
  deleteProblem,
  updateProblem,
} = require("../controllers/problemController");

const router = express.Router();

// GET all Problems
router.get("/", getProblems);

// GET a single Problem
router.get("/:id", getProblem);

// POST a new Problem
router.post("/", createProblem);

// DELETE a Problem
router.delete("/:id", deleteProblem);

// UPDATE a Problem
router.patch("/:id", updateProblem);

module.exports = router;
