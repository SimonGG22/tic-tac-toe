/* eslint-disable react/prop-types */

import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square'
import { TURNS, WINNER_COMBOS } from './constants'
import { WinnerModal } from './components/WinnerModal'
import { Turn } from './components/Turn'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const [contadorX, setContadorX] = useState(0)
  const [contadorO, setContadorO] = useState(0)
  const [contadorEmpates, setContadorEmpates] = useState(0)

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
      if (newWinner === TURNS.X) {
        setContadorX(contadorX + 1)
      } else if (newWinner === TURNS.O) {
        setContadorO(contadorO + 1)
      }
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
      setContadorEmpates(contadorEmpates + 1)
    }
  }

  return (
    <main className='flex flex-col items-center justify-center w-full h-screen text-center'>

      <div className='flex justify-around items-center gap-4 w-80 mb-7'>
        <h1 className='font-bold text-md'>TIC TAC TOE</h1>
        <Turn TURNS={TURNS} turn={turn} />
        <button onClick={resetGame} className='font-bold'>Reset</button>
      </div>

      <section className='flex items-center justify-center w-full'>
        <div className='grid grid-cols-3 auto-cols-auto gap-6 max-w-80 max-h-80'>
          {
            board.map((board, index)=>{
              return (
                <Square index={index} key={index} updateBoard={updateBoard}>
                  {board}
                </Square>
              )
            })
          }
        </div>
      </section>

      {
        winner != null && (
          <WinnerModal winner={winner} resetGame={resetGame}/>
        )
      }

      <section className='grid grid-cols-3 auto-cols-auto gap-6 max-w-80 pt-10'>
        <div className='flex flex-col items-center justify-center w-24 h-16 rounded-lg bg-blue-500 text-sm'>
          X 
          <span className='font-bold text-2xl'>{contadorX}</span>
        </div>
        <div className='flex flex-col items-center justify-center w-24 h-16 rounded-lg bg-zinc-600 text-sm'>
          Ties 
          <span className='font-bold text-2xl'>{contadorEmpates}</span>
        </div>
        <div className='flex flex-col items-center justify-center w-24 h-16 rounded-lg bg-red-500 text-sm'>
          O 
          <span className='font-bold text-2xl'>{contadorO}</span>
        </div>
      </section>
    </main>
  )
}

export default App
