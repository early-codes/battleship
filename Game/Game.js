
import {userBoard, cpuBoard, filledDragBoard, filledCpuBoard} from '../Gameboard/Gameboard.js'

const userBoardUI = document.querySelector('.userBoard')
const cpuBoardUI = document.querySelector('.cpuBoard')
const dragBoardUI = document.querySelector('.dragBoard')

document.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

const dragger = (event) => {
    event.dataTransfer.setData("ship", event.srcElement.classList[2])
}

const dragBoardUICleaner = (shipName) => {
    ([...dragBoardUI.children]).forEach(squareToChange => {
        (squareToChange.classList[2] === (shipName)) ?
            squareToChange.classList = dragBoardUI.children[4].classList :
            null
    })
} 

const dropableCheck = (shipLength, id) => {
    let ifDropable = true
    for (let i = 0; i < shipLength; i++) {
        if (document.getElementById((+id) + (+i)).classList[1].toString() === "dragBoardTaken" || ((+id % 10) + (+i)) > 9 ) {
            ifDropable = false
            break
        } 
    } 
    return ifDropable
}

const rotate = (event) => {
    let shipName = event.target.classList[2].toString()
    let ship = document.querySelectorAll("." + shipName)
    
}

const dropper = (event) => {
    event.preventDefault();
    var data = event.dataTransfer.getData("ship");
    const shipLength = document.querySelectorAll("." + data).length;
    let dropable = false
    dropable = dropableCheck(shipLength, event.target.id)
    if (dropable) {
        for (let i = 0; i < shipLength; i++) {
            let id  = event.target.id
            document.getElementById((+id) + (+i)).className = ((document.querySelectorAll("." + data))[+i].className)
            console.log(document.querySelectorAll("corvette-1") ,data, (document.querySelectorAll("." + data))[+i], i);
            document.getElementById((+id) + (+i)).addEventListener("dblclick", rotate)
        } 
    dragBoardUICleaner(data) 
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