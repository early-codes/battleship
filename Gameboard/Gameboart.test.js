import { TestScheduler } from 'jest'
import { createBoardArray, createUserBoard, createCpuBoard } from './Gameboard'

test("table array created as expected", () => {
    expect(createBoardArray(5).filter(x => x === "O").length).toBe(25)
})

test("user board created with 1000 elements", () => {
    expect(createUserBoard().filter(x => x === "O").length).toBe(100)
})

test("cpu board created with 1000 elements", () => {
    expect(createCpuBoard().filter(x => x === "O").length).toBe(100)
})