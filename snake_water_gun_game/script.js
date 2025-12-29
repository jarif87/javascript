let playerScore = 0;
let computerScore = 0;

function play(playerChoice) {
  const choices = ["snake", "water", "gun"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  let resultText = "";
  let resultClass = "";

  // Display choices with emojis
  document.getElementById("result").innerHTML = `
        <div style="font-size: 3em; margin: 10px;">You: ${getEmoji(
          playerChoice
        )}</div>
        <div style="font-size: 3em; margin: 10px;">Computer: ${getEmoji(
          computerChoice
        )}</div>
    `;

  // Determine winner
  if (playerChoice === computerChoice) {
    resultText = `It's a Tie! Both chose ${capitalizeFirst(playerChoice)}`;
    resultClass = "tie";
  } else if (
    (playerChoice === "snake" && computerChoice === "water") ||
    (playerChoice === "water" && computerChoice === "gun") ||
    (playerChoice === "gun" && computerChoice === "snake")
  ) {
    resultText = `You Win! ${capitalizeFirst(
      playerChoice
    )} beats ${capitalizeFirst(computerChoice)}!`;
    resultClass = "win";
    playerScore++;
  } else {
    resultText = `You Lose! ${capitalizeFirst(
      computerChoice
    )} beats ${capitalizeFirst(playerChoice)}!`;
    resultClass = "lose";
    computerScore++;
  }

  // Append result message
  document.getElementById("result").innerHTML += `
        <div class="${resultClass}" style="font-size: 1.4em; margin-top: 15px; font-weight: bold;">
            ${resultText}
        </div>
    `;

  updateScore();
}

function getEmoji(choice) {
  const emojis = {
    snake: "🐍",
    water: "💧",
    gun: "🔫",
  };
  return emojis[choice] || "";
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function updateScore() {
  document.getElementById(
    "score"
  ).textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
}

function resetScore() {
  playerScore = 0;
  computerScore = 0;
  document.getElementById("result").innerHTML = "";
  updateScore();
}
