/* eslint-disable react/prop-types */
import { Square } from "./Square"

export const WinnerModal = ({winner, resetGame}) => {
  
    return (
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