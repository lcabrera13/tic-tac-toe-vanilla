let playerTurn = "x";
let playerWinner = "";
let firstPlayer = [];
let secondPlayer = [];
const winners = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const cards = document.getElementsByClassName("card");
for (let c = 0; c < cards.length; c++) {
  const card = cards[c];
  card.onclick = function() {
    card.classList.add(`player-${playerTurn}`);
    card.innerHTML = playerTurn;
    card.disabled = true;
    if(playerTurn === "x") {
      firstPlayer.push(c);
      checkWinner(firstPlayer);
      playerTurn = "o";
    } else {
      secondPlayer.push(c);
      checkWinner(secondPlayer);
      playerTurn = "x";
    }
    document.getElementById("player-turn").innerHTML = playerTurn;
    if(playerWinner !== "") {
      showWinner();
    }
    return false;
  };
}

document.getElementById("reload").onclick = function() {
  reload();
  return false;
}

document.getElementById('btn-quit').onclick = function() {
  reload();
  document.getElementById("modal").classList.add("hidden");
  return false;
}

function checkWinner(player) {
  for (const winner of winners) {
    const value = winner.every(w => player.includes(w));
    if(value) {
      playerWinner = playerTurn;
      break;
    }
  }
}

function showWinner() {
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("messageWinner").classList.add(`player-${playerWinner}`);
  document.getElementById("messageWinner").innerText = `${playerWinner.toUpperCase()} TAKES THE ROUND`;
}

function reload() {
  for (let c = 0; c < cards.length; c++) {
    const card = cards[c];
    card.innerHTML = "";
    card.classList.remove("player-x", "player-o");
    card.disabled = false;
  }
  firstPlayer = [];
  secondPlayer = [];
  playerTurn = "x";
  document.getElementById("player-turn").innerHTML = playerTurn;
  playerWinner = "";
  document.getElementById("messageWinner").innerText = "";
  document.getElementById("messageWinner").classList.remove('player-x', 'player-o');
}