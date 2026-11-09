for (let i = 0; i < 3; i++) {
  let buttonNumber = i + 1;
  let selectedButton = document.querySelector(`.my-button-${buttonNumber}`);

  selectedButton.addEventListener("click", function () {
    let text = this.innerHTML;
    console.log(`Button ${buttonNumber} clicked: ${text}`);

    playAudio(text);
    playAnimation(selectedButton);
  });
}

function playAudio(text) {
  switch (text) {
    case "Click me Button A":
      let audioA = new Audio("audioA.mp3");
      audioA.play();
      break;
    case "Click me Button B":
      let audioB = new Audio("audioB.mp3");
      audioB.play();
      break;
    case "Click me Button C":
      let audioC = new Audio("audioC.mp3");
      audioC.play();
      break;
  }
}

function playAnimation(buttonElement) {
  buttonElement.classList.add("animate");

  setTimeout(() => {
    buttonElement.classList.remove("animate");
  }, 1000);
}
