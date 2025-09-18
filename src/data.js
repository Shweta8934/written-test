
const questions = [
  {
    id: 1,
    type: "mcq",
    question: "What is the name of the process that sends one qubit of information using two bits of classical information?",
    options: [
      "Quantum Teleportation",
      "Quantum Entanglement",
      "Quantum Programming",
      "Super Dense Coding",
    ],
  },
  {
    id: 2,
    type: "short",
    question: "Who is known as the father of computers?",
  },
  {
    id: 3,
    type: "coding",
    question: "Write a function in JavaScript to reverse a string.",
    language: "javascript",
    // optional: you can add test cases to check the code
    testCases: [
      { input: "hello", output: "olleh" },
      { input: "world", output: "dlrow" },
    ],
  },
];

export default questions;
