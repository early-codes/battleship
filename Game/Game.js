
import {userBoard, cpuBoard, filledDragBoard, filledCpuBoard} from '../Gameboard/Gameboard.js'

const userBoardUI = document.querySelector('.userBoard')
const cpuBoardUI = document.querySelector('.cpuBoard')
const dragBoardUI = document.querySelector('.dragBoard')

console.log("ben geldim")

const boardUICreater = (boardToCreate, boardArray) => {
    for (let i = 0 ; i < boardArray.length; i++) {  
        const square = document.createElement('div') 
        square.className = "square" 
        square.id = i
        if (boardArray[i] === "O") {    
            square.classList.add("free")
        } else if (boardArray[i] ) {
            square.classList.add("taken")
        }
        boardToCreate.appendChild(square)
    }
}

boardUICreater(userBoardUI, userBoard)
boardUICreater(cpuBoardUI, cpuBoard)
boardUICreater(dragBoardUI, filledDragBoard)