
import {userBoard, cpuBoard, filledDragBoard, filledCpuBoard} from '../Gameboard/Gameboard.js'

const userBoardUI = document.querySelector('.userBoard')
const cpuBoardUI = document.querySelector('.cpuBoard')
const dragBoardUI = document.querySelector('.dragBoard')

document.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

const dragger = (event) => {
    const shipToDrag = document.querySelectorAll("." + event.srcElement.classList[2]);
    console.log(shipToDrag[0]);
    event.dataTransfer.setData("ship", event.srcElement.classList[2])
}

const dropper = (event) => {
    event.preventDefault();
    var data = event.dataTransfer.getData("ship");
    console.log(data, event.target)
    const shipLength = document.querySelectorAll("." + data).length;
    for (let i = 0; i < shipLength; i++) {
        let id  = event.target.id
        document.getElementById((+id) + (+i)).className = ((document.querySelectorAll("." + data)[i].className))
    }
}

const boardUICreater = (boardToCreate, boardArray, boardName) => {
    for (let i = 0 ; i < boardArray.length; i++) {  
        const square = document.createElement('div') 
        square.className = "square" 
        square.id = i
        if (boardArray[i] === "O") {    
            square.classList.add("free")
            if (boardName === "userBoard") {
                square.addEventListener("drop", dropper)
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



boardUICreater(userBoardUI, userBoard, "userBoard")
boardUICreater(cpuBoardUI, cpuBoard, "cpuBoard")
boardUICreater(dragBoardUI, filledDragBoard, "dragBoard")