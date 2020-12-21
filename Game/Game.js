
import {userBoard, cpuBoard, filledDragBoard, filledCpuBoard} from '../Gameboard/Gameboard.js'

const userBoardUI = document.querySelector('.userBoard')
const cpuBoardUI = document.querySelector('.cpuBoard')
const dragBoardUI = document.querySelector('.dragBoard')

const dragger = (event) => {
    console.log(event);
    console.log(event.srcElement.classList[2].toString())
    const shipToDrag = document.querySelectorAll("." + event.srcElement.classList[2]);
    console.log(shipToDrag);
}

const dropper = (event) => {
    console.log(event, "dropper")
}

const boardUICreater = (boardToCreate, boardArray) => {
    for (let i = 0 ; i < boardArray.length; i++) {  
        const square = document.createElement('div') 
        square.className = "square" 
        square.id = i
        if (boardArray[i] === "O") {    
            square.classList.add("free")
            if (i === 83) {
                console.log(square.getRootNode(), square.parentElement, square.parentNode);
            }
        } else if (boardArray[i] === "T") {
            square.classList.add("taken")
        } else if (boardArray[i].includes("+")) {
            square.classList.add("dragBoardTaken")
            square.classList.add(boardArray[i].split("+|")[0])
            square.classList.add(boardArray[i].split("+|")[1])
            square.setAttribute("draggable", true)
            square.addEventListener("dragstart", dragger)
        }
        boardToCreate.appendChild(square)
    }
}



boardUICreater(userBoardUI, userBoard)
boardUICreater(cpuBoardUI, cpuBoard)
boardUICreater(dragBoardUI, filledDragBoard)