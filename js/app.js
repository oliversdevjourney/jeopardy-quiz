
let score1 = 0, score2 = 0, currentPoints = 0;
const categories = [
  {
    name: "Flüssig Brot",
    questions: [
      { points: 100, question: "Warum ist der Bierhammer aus Holz?", answer: "Ideal, um das Fass nicht zu beschädigen", asked: false },
      { points: 200, question: "Wie heißt das Trinkspiel mit dem Irländischem Bier Guiness", answer: "Split the G", asked: false },
      { points: 300, question: "Weclhes Bier ist das meistgetrunkene Bier in Deutschland", answer: "", asked: false },
      { points: 400, question: "Wie viele Kalorien hat 1 Bier", answer: "", asked: false },
      { points: 500, question: "Was ist der jemals höchst gemessene Promillewert", answer: "", asked: false }
    ]
  },
  {
    name: "Junkies",
    questions: [
      { points: 100, question: "xyz", answer: "xyz", asked: false },
      { points: 200, question: "xyz", answer: "xyz", asked: false },
      { points: 300, question: "xyz", answer: "xyz", asked: false },
      { points: 400, question: "xyz", answer: "xyz", asked: false },
      { points: 500, question: "xyz", answer: "xyz", asked: false }
    ]
  },
  {
    name: "Dichjel und Sport?",
    questions: [
      { points: 100, question: "Wie viele Spieler hat ein Fußballteam?", answer: "11", asked: false },
      { points: 200, question: "In welchem Land wurden die Olympischen Spiele erfunden?", answer: "Griechenland", asked: false },
      { points: 300, question: "Wie lange dauert ein Basketballspiel (NBA)?", answer: "48 Minuten", asked: false },
      { points: 400, question: "Größter Planet?", answer: "Jupiter", asked: false },
      { points: 500, question: "Größter Planet?", answer: "Jupiter", asked: false }
    ]
  },
  {
    name: "Hood",
    questions: [
      { points: 100, question: "Wer ist der King of Pop?", answer: "Michael Jackson", asked: false },
      { points: 200, question: "Wie viele Saiten hat eine Gitarre?", answer: "6", asked: false },
      { points: 300, question: "Welche Band schrieb 'Bohemian Rhapsody'?", answer: "Queen", asked: false },
      { points: 400, question: "Größter Planet?", answer: "Jupiter", asked: false },
      { points: 500, question: "Größter Planet?", answer: "Jupiter", asked: false }
    ]
  },
  {
    name: "Wohnzimmer",
    questions: [
      { points: 100, question: "Wofür steht HTML?", answer: "HyperText Markup Language", asked: false },
      { points: 200, question: "Wer entwickelte Windows?", answer: "Microsoft", asked: false },
      { points: 300, question: "Was ist die Abkürzung für CPU?", answer: "Central Processing Unit", asked: false },
      { points: 400, question: "Größter Planet?", answer: "Jupiter", asked: false },
      { points: 500, question: "Größter Planet?", answer: "Jupiter", asked: false }
    ]
  },
  {
    name: "Allgemeinwissen",
    questions: [
      { points: 100, question: "Wie viele Herzen hat ein Oktopus?", answer: "3", asked: false },
      { points: 200, question: "Welches Tier kann nicht springen?", answer: "Elefant", asked: false },
      { points: 300, question: "Was ist das schnellste Landtier?", answer: "Gepard", asked: false },
      { points: 400, question: "Größter Planet?", answer: "Jupiter", asked: false },
      { points: 500, question: "Größter Planet?", answer: "Jupiter", asked: false }
    ]
  }
];

const board = document.getElementById("board");

function createBoard() {
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
        }
      });

      board.appendChild(cell);
    }
  }
}
const partikelContainer = document.getElementById("partikel-container");

function createPartikel() {
  const partikel = document.createElement("div");
  partikel.classList.add("partikel");

  // Zufällige Startposition
  partikel.style.left = Math.random() * 100 + "vw";

  // Zufällige Größe
  const size = Math.random() * 12 + 8;
  partikel.style.width = size + "px";
  partikel.style.height = size + "px";

  // Zufällige Geschwindigkeit
  const duration = Math.random() * 20 + 20;
  partikel.style.animationDuration = duration + "s";

  partikelContainer.appendChild(partikel);

  // Entfernen nach Animation
  setTimeout(() => {
    partikel.remove();
  }, duration * 1000);
}

function openQuestion(q,catName){
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("modalQuestion").textContent=q.question;
  document.getElementById("modalPoints").textContent=q.points+" Punkte";
  document.getElementById("modalCategory").textContent=catName;

  localStorage.setItem("jeopardyState",JSON.stringify({
    currentQuestion:{question:q.question,answer:q.answer,points:q.points,category:catName}
  }));
}

document.getElementById("modal").addEventListener("click",()=>{document.getElementById("modal").classList.add("hidden");});
console.log("Partikel läuft");
createBoard();

// Alle 200ms neue Flocke
setInterval(createPartikel, 1800);
