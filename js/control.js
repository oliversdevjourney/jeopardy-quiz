function loadGameState() {
  return JSON.parse(localStorage.getItem("jeopardyGame"));
}

function saveGameState(state) {
  localStorage.setItem("jeopardyGame", JSON.stringify(state));
}

function addPoints(team) {
  const state = loadGameState();

  if (team === 1) state.score1 += 100;
  else state.score2 += 100;

  saveGameState(state);
}

function resetGame() {
  localStorage.removeItem("jeopardyGame");
}
