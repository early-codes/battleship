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
        let shipPoint = 1
        for (let j = 0; j < parseInt(ShipArray[i].shipLength); j++) {
            dragBoard[(i * 5) + j] = ShipArray[i].shipName + "\+" + "|" + shipPoint + "/" + ShipArray[i].shipLength
            shipPoint++
        }
    }
    return dragBoard
}

const randomiseShipDirection = (ship) => {
    let random = Math.abs(Math.floor(Math.random() * 2))
    let directiron = null
    //V for vertical H for horizontal
    random === 0 ? directiron = "V" : directiron = "H"
    return directiron
} 

const addShipDirection = (ShipArray) => {    
    for (let i = 0; i<ShipArray.length; i++) {
        ShipArray[i].ShipDirection = randomiseShipDirection()
    }
    return ShipArray
}

const findStartPoint = (ship, cpuBoard) => {
    let startPoint = 51
    let verticalPoint = null
    let horizontalPoint = null
    let k = 0
    if (ship.ShipDirection === "H") {
        verticalPoint = Math.floor(Math.random() * 10)
        horizontalPoint = Math.floor(Math.random() * (11 - ship.shipLength))
        startPoint = (verticalPoint * 10) + horizontalPoint
        
        for (let i = 0; i < ship.shipLength; i++) {
            if (cpuBoard[startPoint + i].includes("T")) {
                startPoint = null
                break
            }
            if ((startPoint + i) < 99) {
                if (cpuBoard[startPoint + i + 1].includes("T")) {
                    startPoint = null
                    break
                }
            }
            if ((startPoint + i) < 90) {
                if (cpuBoard[startPoint + i + 10].includes("T")) {
                    startPoint = null
                    break
                }
            }
            if ((startPoint + i) > 9) {
                if (cpuBoard[startPoint + i - 10].includes("T")) {
                    startPoint = null
                    break
                }
            }
        }
    } else {
        verticalPoint = Math.floor(Math.random() * (11 - ship.shipLength))
        horizontalPoint = Math.floor(Math.random() * 10)
        startPoint = (verticalPoint * 10) + horizontalPoint
        for (let i = 0; i < ship.shipLength; i++) {
            if (cpuBoard[startPoint + (i * 10)].includes("T")) {
                startPoint = null
                break
            }
            if ((startPoint + (i * 10)) < 99) {
                if (cpuBoard[startPoint + (i * 10) + 1].includes("T")) {
                    startPoint = null
                    break
                }
            }
            if ((startPoint + (i * 10)) > 0) {
                if (cpuBoard[startPoint + (i * 10) - 1].includes("T")) {
                    startPoint = null
                    break
                }
            }
            if ((startPoint + (i * 10)) < 90) {
                if (cpuBoard[startPoint + (i * 10) + 10].includes("T")) {
                    startPoint = null
                    break
                }
            }
          
        }
    }
    return ((startPoint) ? startPoint : findStartPoint(ship, cpuBoard))

}

const fillCpuBoard = (ShipArray, cpuBoard) => {
    ShipArray = addShipDirection(ShipArray)
    ShipArray.forEach(ship => {
        let startPoint = findStartPoint(ship, cpuBoard)
        if (ship.ShipDirection === "H") {
            for (let i = 0; i < ship.shipLength; i++) {
                //T for taken
                cpuBoard[startPoint + i] = "T"
            }
        } else {
            for (let i = 0; i < ship.shipLength; i++) {
                cpuBoard[startPoint + ( 10 * i )] = "T"
            }
        }
    });
    return (cpuBoard)
}

const userBoard = createBoardArray(width)
const cpuBoard = createBoardArray(width)
const dragBoard = createDragBoard(dragHeight, dragWidth)
const filledDragBoard = fillDragBoard(ShipArray, dragBoard)
const filledCpuBoard = fillCpuBoard(ShipArray, cpuBoard)


export { createBoardArray, userBoard, cpuBoard, dragBoard, filledDragBoard, findStartPoint, filledCpuBoard }