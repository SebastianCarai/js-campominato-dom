// ---------
// FUNCTIONS
// ---------
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }


// Resetting the box everytime you click "play". Then it takes the value of the select and uses it to create the right number of boxes and to give them the right
// height and width.
function playGame (){
    let wOrL = '';
    let gameResult = document.getElementById('result');
    gameResult.classList.add('hidden');
    let numberOfClicks= 0 ; //(number of right clicks)
    const numberOfBombs = 16; //(number of bombs)
    gridContainer.innerHTML = '';
    const value = parseInt(document.getElementById('difficulty_select').value);


    // Creating the random numbers for the bombs
    function generateBombs(maxLimit, nOfBombs){
        let bombsFunctionArray = [];
        while (bombsFunctionArray.length < nOfBombs){
            singleBombNumber = getRndInteger(1, maxLimit);
            if (!bombsFunctionArray.includes(singleBombNumber)){
                bombsFunctionArray.push(singleBombNumber)
            }
        }
        console.log(bombsFunctionArray);
        return bombsFunctionArray;
    }


    // Array of bombs
    const bombNumbers = generateBombs(value, numberOfBombs);


    // Creating all the boxes with numbers inside them
    for (i=1; i<=value; i++){
        const newBox = document.createElement('div');
        newBox.classList.add('box');
        newBox.innerHTML = `${i}`;
        newBox.style.width = `calc(100% / ${Math.sqrt(value)})`;
        newBox.style.height = `calc(100% / ${Math.sqrt(value)})`;
        gridContainer.append(newBox);

        // Calling the activating function
        newBox.addEventListener('click', clickingBox);
    } 


    // Activating the clicked box
    function clickingBox(){ 
        const singleBoxValue = parseInt(this.textContent);
        if (bombNumbers.includes(singleBoxValue)){
            this.classList.add('bomb');
            wOrL = 'lose';
            finishGame();
        } else {
            this.classList.add('active');
            numberOfClicks++;
        }
        if (numberOfClicks === (value - bombNumbers.length)){
            wOrL = 'win';
            finishGame()
        }
    }


    // When the game ends it shows if you won or lost and it tells you how many boxes you got right
    function finishGame(){
        gameResult.classList.remove('hidden');
        const allBoxes = document.getElementsByClassName('box');
        for (let i=0; i < allBoxes.length; i++){
            const singleBox = allBoxes[i];
            singleBox.style.pointerEvents = 'none';
        }
        // If you win of lose 
        if (wOrL === 'win'){
            gameResult.innerHTML = 'hai vinto';
        } else if (wOrL === 'lose' && numberOfClicks === 1) {
            gameResult.innerHTML = 'hai perso dopo aver preso ' + numberOfClicks + ' casella giusta';
        } else {
            gameResult.innerHTML = 'hai perso dopo aver preso ' + numberOfClicks + ' caselle giuste';
        }
    }
}




// ---------
// MAIN
// ---------
const playBtn = document.getElementById('play_btn');
const gridContainer = document.querySelector('.grid_container');

playBtn.addEventListener('click', playGame);
