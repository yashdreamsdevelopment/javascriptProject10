const quizData = [
  {
    question: "How old is Florin?",
    a: "10",
    b: "17",
    c: "26",
    d: "110",
    correct: "c",
  },
  {
    question: "Which is the most used programming language in 2019 ?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "a",
  },
  {
    question: "Who was the president of India in 2022?",
    a: "Narendra Modi",
    b: "Salman Khan",
    c: "Anna Hazare",
    d: "Donald Trump",
    correct: "a",
  },
  {
    question: "Favrouite Animal of actor salman khan?",
    a: "Dog",
    b: "Cat",
    c: "Deer",
    d: "Horse",
    correct: "c",
  },
  {
    question: "HTML stands for?",
    a: "Hyper Text Makeup Language",
    b: "Cascading Style Sheet",
    c: "Used to Create elements",
    d: "Hyper Text Markup Language",
    correct: "d",
  },
];

const quiz = document.getElementById("quiz");
const scoreTile = document.getElementById("scoreTile");
const resultEl = document.getElementById("result");
const questionEl = document.getElementById("question");
const answerEle = document.getElementsByClassName("answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submitBtn");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deSelect();
  const currentQuizData = quizData[currentQuiz];

  questionEl.innerHTML = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function getSelected() {
  let answer = undefined;

  Array.from(answerEle).forEach((element) => {
    if (element.checked) {
      answer = element.id;
    }
  });

  return answer;
}

function deSelect() {
  Array.from(answerEle).forEach((element) => {
    element.checked = false;
  });
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) score++;

    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.style.display = "none";
      scoreTile.innerText = `${score}/${quizData.length}`;
      resultEl.style.display = "block";
    }

    answer = undefined;
  }
});
