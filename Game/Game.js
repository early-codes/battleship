import { userBoard, cpuBoard, filledDragBoard, filledCpuBoard } from '../Gameboard/Gameboard.js'

//user ve cpu aynı kareyi seçebiliyor
//reset mantığı?

const userBoardUI = document.querySelector('.userBoard')
const cpuBoardUI = document.querySelector('.cpuBoard')
const dragBoardUI = document.querySelector('.dragBoard')
const startButton = document.getElementById("startButton")
let gameOn = false
let userHit = 0
let cpuHit = 0
let userTurn = false

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
        if (document.getElementById((+id) + (+i)).classList[1].toString() === "userBoardTaken" || ((+id % 10) + (+i)) > 9) {
            ifDropable = false
            break
        }
    }
    return ifDropable
}

const rotatableCheck = (ship) => {
    let rotatable = true
    if (ship[0].className.includes("vertical")) {
        for (let i = 1; i < ship.length; i++) {
            if (userBoardUI.childNodes[+(ship[0].id) + +i].className.includes("userBoardTaken")) {
                rotatable = false
                break;
            }
        }
    } else {
        for (let i = 1; i < ship.length; i++) {
            if (userBoardUI.childNodes[+(ship[0].id) + (+i * 10)].className.includes("userBoardTaken")) {
                rotatable = false
                break;
            }
        }
    }
    return rotatable
}

const rotate = (event) => {
    let shipName = event.target.classList[2].toString()
    let ship = document.querySelectorAll("." + shipName)
    let rotatable = false
    rotatable = rotatableCheck(ship)
    if (rotatable) {
        if (!ship[0].className.includes("vertical")) {
            for (let i = 1; i < ship.length; i++) {
                userBoardUI.childNodes[ship[i].id].className = ("free" + " " + "square")
                userBoardUI.childNodes[(ship[i].id - i) + (i * 10)].className = ("userBoardTaken" + " " + "square" + " " + shipName + " " + (i + 1) + "/" + ship.length)
                userBoardUI.childNodes[(ship[i].id - i) + (i * 10)].addEventListener("dblclick", rotate)
                userBoardUI.childNodes[+ship[0].id + +i].removeEventListener("dblclick", rotate)
            }
            ship[0].classList.toggle("vertical")
        } else {
            for (let i = 1; i < ship.length; i++) {
                userBoardUI.childNodes[(+ship[i].id + (+i)) - ((+i) * 10)].className = ("userBoardTaken" + " " + "square" + " " + shipName + " " + (i + 1) + "/" + ship.length)
                userBoardUI.childNodes[ship[i].id].className = ("free" + " " + "square")
                userBoardUI.childNodes[(+ship[i].id + (+i)) - ((+i) * 10)].addEventListener("dblclick", rotate)
                userBoardUI.childNodes[+ship[0].id + (+i * 10)].removeEventListener("dblclick", rotate)
            }
            ship[0].classList.toggle("vertical")
        }
    }
}

const dropper = (event) => {
    event.preventDefault();
    var data = event.dataTransfer.getData("ship");
    const shipLength = document.querySelectorAll("." + data).length;
    let dropable = false
    dropable = dropableCheck(shipLength, event.target.id)
    if (dropable) {
        for (let i = 0; i < shipLength; i++) {
            let id = event.target.id
            const square = document.getElementById((+id) + (+i))
            square.className = "square"
            square.classList.add("userBoardTaken")
            square.classList.add(data)
            square.classList.add((+i + 1) + "/" + shipLength)
            square.addEventListener("dblclick", rotate)
        }
        dragBoardUICleaner(data)
    }

}

const checkEnd = () => {
    if (userHit === +20) {
        alert("User Won")
        gameOn = false
    }
    if (cpuHit === 20) {
        alert("CPU Won")
        gameOn = false
    }
}

const cpuPlay = () => {
    let selectedSquaresArray = []
    if (!userTurn) {
        let cpuSelect = (Math.floor(Math.random()*100))
        while(selectedSquaresArray.includes(cpuSelect)) {
            console.log("while in", cpuSelect);
            cpuSelect = (Math.floor(Math.random()*100))
            console.log("while Out", cpuSelect);
        }
        if (userBoardUI.childNodes[cpuSelect].className.includes("userBoardTaken")) {
            userBoardUI.childNodes[cpuSelect].classList.add("userBoardHit")
            cpuHit += 1
            checkEnd()
        } else {
            userBoardUI.childNodes[cpuSelect].classList.add("userBoardMiss")
        }
        selectedSquaresArray.push(cpuSelect)
        userTurn=true
    }
}

const cpuSquareClicked = (event) => {
    if(gameOn && userTurn) {
        if (event.target.className.includes("taken")) {
            event.target.classList.add("cpuBoardHit")
            userHit += 1
            checkEnd()
        } else {
            event.target.classList.add("cpuBoardMiss")
        }
    userTurn = false
    cpuPlay()
    }
}

const boardUICreater = (boardToCreate, boardArray, boardName) => {
    for (let i = 0; i < boardArray.length; i++) {
        const square = document.createElement('div')
        square.className = "square"
        square.id = i
        if (boardName === "cpuBoard") {
            square.addEventListener('click', cpuSquareClicked)
        }
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

const gamePlay = () => {
    userHit = 0
    cpuHit = 0
    let dragBoardEmpty = +[...dragBoardUI.childNodes].filter(square => square.className.includes("dragBoardTaken")).length === +0
    let userBoardFull = +[...userBoardUI.childNodes].filter(square => square.className.includes("userBoardTaken")).length === +20
    if (userBoardFull && dragBoardEmpty) {
        gameOn = true
        userTurn = true
    } else {
        alert("Please Place (Drag & Drop Ships, Double Click to Rotate) All Your Ships")
    }
}

startButton.addEventListener("click", gamePlay)


boardUICreater(userBoardUI, userBoard, "userBoard")
boardUICreater(cpuBoardUI, cpuBoard, "cpuBoard")
boardUICreater(dragBoardUI, filledDragBoard, "dragBoard")

