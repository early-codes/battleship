import Ship from '../Ship/Ship.js'
import ShipArray from '../Ship/ShipData.js'


const width = 10
const dragWidth = 5
const dragHeight = 10


const createBoardArray = (width) => {
    let boardArray = [];
    for (let i = 0; i < width * width; i++) {
        boardArray.push("O");
    }
    return boardArray;
}

const createDragBoard = (dragWidth, dragHeight) => {
    let boardArray = [];
    for (let i = 0; i < dragHeight * dragWidth; i++) {
        boardArray.push("O");
    }
    return boardArray
}

const fillDragBoard = (ShipArray, dragBoard) => {
    let filledDragBoard = [...dragBoard]
    for (let i = 0; i < ShipArray.length; i++) {
        console.log()
        for (let j = 0; j < parseInt(ShipArray[i].shipLength); j++) {
            console.log(j)
            filledDragBoard[(i * 5) + j] = "+"
        }
    }
    console.log(filledDragBoard)
    return filledDragBoard
}


const userBoard = createBoardArray(width)
const cpuBoard = createBoardArray(width)
const dragBoard = createDragBoard(dragHeight, dragWidth)
const filledDragBoard = fillDragBoard(ShipArray, dragBoard)


export { createBoardArray, userBoard, cpuBoard, dragBoard, filledDragBoard }