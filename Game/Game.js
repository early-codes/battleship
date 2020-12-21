
import {userBoard, cpuBoard, filledDragBoard, filledCpuBoard} from '../Gameboard/Gameboard.js'

const userBoardUI = document.querySelector('.userBoard')
const cpuBoardUI = document.querySelector('.cpuBoard')
const dragBoardUI = document.querySelector('.dragBoard')


const boardUICreater = (boardToCreate, boardArray) => {
    for (let i = 0 ; i < boardArray.length; i++) {  
        const square = document.createElement('div') 
        square.className = "square" 
        square.id = i
        if (boardArray[i] === "O") {    
            square.classList.add("free")
        } else if (boardArray[i] === "T") {
            square.classList.add("taken")
        } else if (boardArray[i].includes("+")) {
            square.classList.add("dragBoardTaken")
            square.classList.add(boardArray[i].split("+|")[0])
            square.classList.add(boardArray[i].split("+|")[1])
        }
        boardToCreate.appendChild(square)
    }
}

boardUICreater(userBoardUI, userBoard)
boardUICreater(cpuBoardUI, cpuBoard)
boardUICreater(dragBoardUI, filledDragBoard)