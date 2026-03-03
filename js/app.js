let score1 = 0;
let score2 = 0;
let currentPoints = 0;

const categories = [
  {
    name: "Filme",
    questions: [
      { points: 100, question: "Wer spielt Iron Man?", answer: "Robert Downey Jr.", asked: false },
      { points: 200, question: "In welchem Jahr kam Titanic raus?", answer: "1997", asked: false },
      { points: 300, question: "Wie heißt der Regisseur von Inception?", answer: "Christopher Nolan", asked: false }
    ]
  },
  {
    name: "Allgemeinwissen",
    questions: [
      { points: 100, question: "Hauptstadt von Frankreich?", answer: "Paris", asked: false },
      { points: 200, question: "Wie viele Kontinente gibt es?", answer: "7", asked: false },
      { points: 300, question: "Größter Planet?", answer: "Jupiter", asked: false }
    ]
  },
  {
    name: "Sport",
    questions: [
      { points: 100, question: "Wie viele Spieler hat ein Fußballteam?", answer: "11", asked: false },
      { points: 200, question: "In welchem Land wurden die Olympischen Spiele erfunden?", answer: "Griechenland", asked: false },
      { points: 300, question: "Wie lange dauert ein Basketballspiel (NBA)?", answer: "48 Minuten", asked: false }
    ]
  }
];

const board = document.getElementById("board");

function createBoard() {

  const columnCount = categories.length;
  const rowCount = categories[0].questions.length + 1; // +1 für Kategoriezeile

  board.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${rowCount}, auto)`;

  // 1️⃣ Kategorien-Zeile
  categories.forEach(category => {
    const header = document.createElement("div");
    header.classList.add("cell");
    header.textContent = category.name;
    header.style.fontWeight = "bold";
    board.appendChild(header);
  });

  // 2️⃣ Fragen-Zeilen
  for (let row = 0; row < categories[0].questions.length; row++) {
    for (let col = 0; col < categories.length; col++) {

      const question = categories[col].questions[row];

      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = question.points;

      cell.addEventListener("click", () => {
        if (!question.asked) {
          openQuestion(question);
          question.asked = true;
          cell.classList.add("disabled");
        }
      });

      board.appendChild(cell);
    }
  }
}

function openQuestion(q) {
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("questionText").textContent = q.question;
  document.getElementById("answerText").textContent = q.answer;
  document.getElementById("answerText").classList.add("hidden");
  currentPoints = q.points;
}

function showAnswer() {
  document.getElementById("answerText").classList.remove("hidden");
}

function addPoints(team) {
  if (team === 1) {
    score1 += currentPoints;
    document.getElementById("score1").textContent = score1;
  } else {
    score2 += currentPoints;
    document.getElementById("score2").textContent = score2;
  }
}
const defaultGameState = {
  score1: 0,
  score2: 0,
  categories: categories
};

function saveGameState(state) {
  localStorage.setItem("jeopardyGame", JSON.stringify(state));
}

function loadGameState() {
  const data = localStorage.getItem("jeopardyGame");
  return data ? JSON.parse(data) : defaultGameState;
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}
window.addEventListener("storage", () => {
  location.reload();
});


createBoard();
