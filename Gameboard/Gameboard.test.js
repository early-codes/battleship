import { TestScheduler } from 'jest'
import { createBoardArray, userBoard, cpuBoard, dragBoard, filledDragBoard, filledCpuBoard } from './Gameboard'

test("table array created as expected", () => {
    expect(createBoardArray(5).filter(x => x === "O").length).toBe(25)
})

test("user board created with 100 elements", () => {
    expect(userBoard.filter(x => x === "O").length).toBe(100)
})

test("cpu board created with 100 elements", () => {
    expect(cpuBoard.length).toBe(100)
})

test("drag board created with 50 elements", () => {
    expect(dragBoard.length).toBe(50)
})

test("filled drag board specific members test 1", () => {
    expect(filledDragBoard.filter(x => x === "+").length).toBe(20)
})

test("filled drag board specific members test 2", () => {
    expect(filledDragBoard[38]).toBe("O")
})

test("filled cpu board has 20 T?", () => {
    expect(filledCpuBoard.filter(x => x.includes("T")).length).toBe(20)
})