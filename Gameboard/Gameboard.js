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
    for (let i = 0; i < ShipArray.length; i++) {
        for (let j = 0; j < parseInt(ShipArray[i].shipLength); j++) {
            dragBoard[(i * 5) + j] = "+"
        }
    }
    return dragBoard
}

const randomiseShipDirection = (ship) => {
    let random = Math.abs(Math.floor(Math.random() * 2))
    let directiron = null
    random === 0 ? directiron = "V" : directiron = "H"
    return directiron
} 

const addShipDirection = (ShipArray) => {    
    for (let i = 0; i<ShipArray.length; i++) {
        ShipArray[i].ShipDirection = randomiseShipDirection()
    }
    return ShipArray
}

const findStartPoint = (ShipArray) => {
    let startPoint = null
    
}

const fillCpuBoard = (ShipArray, cpuBoard) => {
    ShipArray = addShipDirection(ShipArray)
    ShipArray.forEach(ship => {
        let startPoint = findStartPoint(ship)

    });
}

const userBoard = createBoardArray(width)
const cpuBoard = createBoardArray(width)
const dragBoard = createDragBoard(dragHeight, dragWidth)
const filledDragBoard = fillDragBoard(ShipArray, dragBoard)
const filledCpuBoard = fillCpuBoard(ShipArray, cpuBoard)


export { createBoardArray, userBoard, cpuBoard, dragBoard, filledDragBoard }