import Ship from '../Ship/Ship'
import ShipArray from '../Ship/ShipData'

let userBoard = []
let cpuBoard = []


const createBoardArray = (width) => {
    let boardArray = [];
    for (let i = 0; i < width * width; i++) {
        boardArray.push("O");
    }
    return boardArray;
}

const createUserBoard = () => {
    userBoard = createBoardArray(10);
    return userBoard;
}

const createCpuBoard = () => {
    cpuBoard = createBoardArray(10);
    return cpuBoard;
}



export { createBoardArray, createUserBoard, createCpuBoard }