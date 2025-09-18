// data/questionPapersData.js
const questionPapers = [
  {
    id: 1,
    title: "Mathematics - Midterm",
    subject: "Mathematics",
    duration: 90, // in minutes
    questions: [
      { id: 101, text: "What is 5 + 7?" },
      { id: 102, text: "Solve for x: 2x + 3 = 11" },
      { id: 103, text: "Find the derivative of x^2 + 3x." }
    ]
  },
  {
    id: 2,
    title: "Science - Final",
    subject: "Science",
    duration: 120,
    questions: [
      { id: 201, text: "Define Newton's Second Law." },
      { id: 202, text: "Explain photosynthesis." },
      { id: 203, text: "What is the chemical formula of water?" }
    ]
  },
  {
    id: 3,
    title: "English - Grammar Test",
    subject: "English",
    duration: 60,
    questions: [
      { id: 301, text: "Correct the sentence: She go to school." },
      { id: 302, text: "Identify the noun in the sentence: The dog barked loudly." },
      { id: 303, text: "Fill in the blank: I ___ a book yesterday." }
    ]
  }
];

export default questionPapers;
