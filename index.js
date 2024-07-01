const randomStraws = document.getElementById("random-straws");
const container = document.getElementById("container");
const strawLine = document.querySelectorAll(".straw-line");
const playerName = document.getElementById("input-box");
const startBtn = document.getElementById("start-btn");
const score = document.getElementById("score");
const gameOverScreen = document.getElementById("game-over");

let playerScore = 0;
let strawsArray = [];
let strawThreshold = 20;

startBtn.addEventListener("click", startGame);

function startGame() {
  let playername = playerName.value;

  if (playername.length > 0) {
    generateMultipleStraws();
  }
}

function generateStraws(index) {
  let randomColor = generateRandomColor();
  let randomPositionLeft = generateRandomPositionLeft();
  let randomWidth = generateRandomWidth();
  let randomRotation = generateRandomRotation();
  let randomPositionTop = generateRandomPositionTop();
  let randomZIndex = generateZIndex();
  let strawLine = document.createElement("div");
  strawLine.classList.add("straw-line");
  strawLine.style.backgroundColor = randomColor;
  strawLine.style.width = `${randomWidth}rem`;
  strawLine.id = index;
  strawLine.style.left = `${randomPositionLeft}rem`;
  strawLine.style.top = `${randomPositionTop}rem`;
  strawLine.style.rotate = `${randomRotation}deg`;
  strawLine.style.zIndex = randomZIndex;

  return strawLine;
}

function generateMultipleStraws() {
  for (let i = 0; i < strawThreshold; i++) {
    let straw = generateStraws(i);
    strawsArray.push(straw.outerHTML);
  }

  container.appendChild(strawsArray);
}

document.addEventListener("click", (event) => {
  onClickStraw(event);
});

function onClickStraw(event) {
  const idString = `id="${event.target.id}"`;
  const currentZIndex = event.target.style.zIndex;

  const currentStraw = strawsArray.filter((item) => item.includes(idString));

  for (let i = 0; i < strawsArray.length; i++) {
    if (strawsArray[i] === currentStraw[0]) {
      strawsArray.splice(i, 1);
      playerScore++;
      score.textContent = `Score: ${playerScore}`;
    }
  }
  const innerDiv = document.getElementById("random-straws");
  innerDiv.innerHTML = strawsArray.map((s) => s).join("");
  container.append(innerDiv);

  if (strawThreshold === playerScore) {
    console.log("Game Over");
  }
}

function generateRandomColor() {
  return "#" + Math.random().toString(16).substr(-6);
}

function generateRandomPositionLeft() {
  return Math.floor(Math.random() * 20);
}

function generateRandomPositionTop() {
  return Math.floor(Math.random() * 20);
}

function generateRandomWidth() {
  return Math.floor(Math.random() * 20);
}

function generateRandomRotation() {
  return Math.floor(Math.random() * 150);
}

function generateZIndex() {
  return Math.floor(Math.random() * 150);
}
