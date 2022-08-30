
//starting event listeners and getElements
const playerX = document.getElementById("playerX")
const playerO = document.getElementById("playerO")
const gameLeyend = document.getElementById("gameLeyend")
const gridCells = document.querySelectorAll(".gridCell")
const restartBtn = document.getElementById("restartBtn")
gridCells.forEach(cell=> cell.addEventListener("click", pick, {once:true})) 

//global consts
let boardArray= Array.from(gridCells)
let playerXScore=0
let playerOScore=0
let currentTurn="X"
const winCombinations=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

//default starting game function 
function pick(e){
    const cell= e.target
    placeSimbol(cell)
    switchTurns() 
    gameChecks()
}


// checks if a win condition is met, call stopGame() if needed, update scores and call results
function gameChecks(){
    if(checkDraw()){
        stopGame()
        gameLeyend.textContent="Its a draw"
        gameLeyend.style.color="white"
    }
    if(checkWinX()){
        stopGame()
        playerXScore++
        playerX.textContent="X Player: "+playerXScore
        gameLeyend.textContent="X player won this round" 
        gameLeyend.style.color="white"
    }
    if(checkWinO()){
        stopGame()
        playerOScore++
        playerO.textContent="O Player: "+playerOScore
        gameLeyend.textContent="O Player won this round"
        gameLeyend.style.color="white"
    }     
}

//used to determine wich simbol must be drawn on the grid
function placeSimbol (cell){
    if(currentTurn=="circle"){
        cell.innerHTML="O"
    }else {
        cell.innerHTML="X"
    }
}

//used to switch turns 
function switchTurns(){
    if (currentTurn=="circle"){
        currentTurn="X"
    }else{
        currentTurn="circle"
    }
}

//logic of the gamecheck function
    //check if boardArray has any of the winCombinations with X
function checkWinX() {
    return winCombinations.some((combination) => {
      return combination.every((i) => {
        return boardArray[i].innerText === "X";
      })
    })
}
    //check if boardArray has any of the winCombinations with O
  function checkWinO() {
    return winCombinations.some((combination) => {
      return combination.every((i) => {
        return boardArray[i].innerText === "O";
      })
    })
}
    //check if boardArray is filled with simbols
function checkDraw() {
    return boardArray.every((cell) => {
      return cell.innerText === "X" || cell.innerText === "O";
    })
}

//once a winner or draw is declared this function stops the game
function stopGame(){
    gridCells.forEach(cell=>cell.removeEventListener("click", pick))
    restartBtn.style.display="inline-block"
    restartBtn.onclick = () => restartGame()
}

//used to restart the game with restart button
function restartGame(){
    gridCells.forEach(cell=>cell.innerHTML="")
    gridCells.forEach(cell=>cell.addEventListener("click", pick))
    restartBtn.style.display="none"
    gameLeyend.textContent="Good Luck, Have Fun!"
    gameLeyend.style.color="black"
}