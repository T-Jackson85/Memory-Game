const gameContainer = document.getElementById("game");
let firstCard = null;
let secondCard = null;
let chosenCard = 0;
let doneClicking = false;



const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  if (doneClicking) return;
  if (e.target.classList.contains("revealed"))
  return;

  let flippedCard = e.target;
  flippedCard.style.backroundColor = flippedCard.classList[0];

  if (!firstCard || !secondCard) {
    flippedCard.classList.add("revealed");
    firstCard = firstCard || flippedCard;
    secondCard = flippedCard === firstCard ? null : flippedCard; 
  } 

  if(firstCard && secondCard) {
    doneClicking = true;
    let card1 = firstCard.className;
    let card2 = secondCard.className;

    if (card1 === card2){
      chosenCard += 2;
      firstCard.removeEventListener("click", handleCardClick);
      secondCard.removeEventListener("click", handleCardClick);
      firstCard = null;
      secondCard = null;
      doneClicking = false;
    } else {
      setTimeout(function(){
        firstCard.style.backroundColor = "";
        secondCard.style.backroundColor = "";
        firstCard.classList.remove("revealed");
        secondCard.classList.remove("revealed");
        firstCard = null;
        secondCard = null;
        doneClicking = false;
      }, 1000);
    }
  }
  if (chosenCard === COLORS.length) alert("Game Over!");
  
}

// when the DOM loads
 createDivsForColors(shuffledColors);
