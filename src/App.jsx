/* eslint-disable react/prop-types */

import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square'
import { TURNS, WINNER_COMBOS } from './constants'
import './App.css'
import { WinnerModal } from './components/WinnerModal'
import { Turn } from './components/Turn'

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

  return (
    <main>
      <h1>TIC TAC TOE</h1>

      <Turn TURNS={TURNS} turn={turn} />
      
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
          <WinnerModal winner={winner} resetGame={resetGame}/>
        )
      }
    </main>
  )
}

export default App
