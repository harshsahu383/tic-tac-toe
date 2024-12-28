let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector(".reset");
let start_btn = document.querySelector(".new");
let msg_container = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count = 0;
let choice;
let turno;

const showWinner = (winner) => {
  msg.innerText = `Congratulations on your winning, ${winner}!`;
  msg_container.classList.remove("hide");
};

function user() {
  while (true) {
    choice = prompt("Choose your character X/O").trim();
    alert(`You have chosen ${choice}`);
    if (choice === "X" || choice === "x" || choice === "O" || choice === "o") {
      turno = choice.toLowerCase() === "x" ? false : true;
      break;
    } else {
      alert("Invalid input");
    }
  }
}
user();

const reset = () => {
  user();
  enablebox();
  msg_container.classList.add("hide");
  count = 0;
};

const disabledbox = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enablebox = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.color = ""; // Reset color
  }
};

const winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turno) {
      box.innerText = "O";
      box.style.color = "blue"; // Color for O
      turno = false;
    } else {
      box.innerText = "X";
      box.style.color = "red"; // Color for X
      turno = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  disabledbox();
  msg_container.classList.remove("hide");
};

const checkWinner = () => {
  for (let pattern of winPattern) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val); // Display the winner
        disabledbox();
        return true;
      }
    }
  }
  return false;
};

start_btn.addEventListener("click", reset);
reset_btn.addEventListener("click", reset);
