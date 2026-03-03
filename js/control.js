let score1 = 0, score2 = 0, currentPoints = 0;

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
  },
  {
    name: "Musik",
    questions: [
      { points: 100, question: "Wer ist der King of Pop?", answer: "Michael Jackson", asked: false },
      { points: 200, question: "Wie viele Saiten hat eine Gitarre?", answer: "6", asked: false },
      { points: 300, question: "Welche Band schrieb 'Bohemian Rhapsody'?", answer: "Queen", asked: false }
    ]
  },
  {
    name: "Technik",
    questions: [
      { points: 100, question: "Wofür steht HTML?", answer: "HyperText Markup Language", asked: false },
      { points: 200, question: "Wer entwickelte Windows?", answer: "Microsoft", asked: false },
      { points: 300, question: "Was ist die Abkürzung für CPU?", answer: "Central Processing Unit", asked: false }
    ]
  },
  {
    name: "Fun Facts",
    questions: [
      { points: 100, question: "Wie viele Herzen hat ein Oktopus?", answer: "3", asked: false },
      { points: 200, question: "Welches Tier kann nicht springen?", answer: "Elefant", asked: false },
      { points: 300, question: "Was ist das schnellste Landtier?", answer: "Gepard", asked: false }
    ]
  }
];

const board=document.getElementById("board");

function createBoard(){
  board.innerHTML="";
  board.style.gridTemplateColumns=`repeat(${categories.length},1fr)`;
  board.style.gridTemplateRows=`repeat(${categories[0].questions.length+1},auto)`;

  categories.forEach(cat=>{
    const header=document.createElement("div");
    header.classList.add("cell");
    header.textContent=cat.name;
    header.style.cursor="default";
    board.appendChild(header);
  });

  for(let r=0;r<categories[0].questions.length;r++){
    for(let c=0;c<categories.length;c++){
      const q=categories[c].questions[r];
      const cell=document.createElement("div");
      cell.classList.add("cell");
      cell.textContent=q.points;
      if(q.asked) cell.classList.add("disabled");

      cell.addEventListener("click",()=>{
        if(!q.asked){
          q.asked=true;
          cell.classList.add("disabled");
          openQuestion(q,categories[c].name);
          saveState();
        }
      });

      board.appendChild(cell);
    }
  }
}

function openQuestion(q,catName){
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("questionText").textContent=q.question;
  document.getElementById("answerText").textContent=q.answer;
  document.getElementById("modalCategory").textContent=catName;
  document.getElementById("modalPoints").textContent=q.points+" Punkte";
  currentPoints=q.points;

  localStorage.setItem("jeopardyState",JSON.stringify({
    score1,score2,categories,currentQuestion:{question:q.question,answer:q.answer,points:q.points,category:catName}
  }));
}

function addPoints(team){
  if(team===1) score1+=currentPoints; else score2+=currentPoints;
  document.getElementById("score1").textContent=score1;
  document.getElementById("score2").textContent=score2;
  saveState();
}

function saveState(){ /* lokal gespeichert */ }

function closeModal(){ document.getElementById("modal").classList.add("hidden"); }

window.addEventListener("storage",()=>{
  const state=JSON.parse(localStorage.getItem("jeopardyState"));
  if(state?.currentQuestion){
    openQuestion({question:state.currentQuestion.question,answer:state.currentQuestion.answer,points:state.currentQuestion.points},state.currentQuestion.category);
  }
});

createBoard();
