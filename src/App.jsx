/* eslint-disable react/prop-types */

import { useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o'
}


const Square = ({children, updateBoard, index}) => {

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className='p-10 bg-slate-700 rounded-lg'>
      {children}
    </div>
  )
}



function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras para ver si x u o gano
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] && // 0 -> x u o
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]
       ) {
        return boardToCheck[a]
      }
    }
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null)
  }

  const updateBoard = (index) => {
    // valida si ya tiene algo en esa posicion
    if (board[index] || winner) return

    // actualiza el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // cambia de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6 ,7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  return (
    <main>
      <h1>TIC TAC TOE</h1>
      <section className='flex gap-5 items-center justify-center py-3'>
        <div className={`w-10 h-10 ${turn === TURNS.X ? 'bg-blue-500' : 'hidden'} flex items-center justify-center`}>
          {TURNS.X}
        </div>
        <div className={`w-10 h-10 ${turn === TURNS.O ? 'bg-red-500' : 'hidden'} flex items-center justify-center`}>
          {TURNS.O}
        </div>
      </section>
      <section className='grid grid-cols-3 gap-2'>
        {
          board.map((board, index)=>{
            return (
              <Square index={index} key={index} updateBoard={updateBoard}>
                {board}
              </Square>
            )
          })
        }
      </section>

      {
        winner != null && (
          <section className='absolute w-full h-full top-0 left-0 grid place-items-center bg-slate-400'>
            <div>
              <h2>
                {
                  winner === false
                  ? 'Empate'
                  : 'Ganador '
                }
              </h2>

              <header>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Restart</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
