/* eslint-disable react/prop-types */

export const WinnerModal = ({winner, resetGame}) => {
  
    return (
        <section className='absolute w-full h-full top-0 left-0 grid place-items-center bg-slate-200/15'>
            <div className="flex flex-col gap-4 items-center justify-center w-full h-auto bg-[#192a32]">
              <h2 className="mt-4 font-bold">
                {
                  winner === false
                  ? 'EMPATE'
                  : 'GANADOR'
                }
              </h2>

              <header className='text-2xl'>
                {winner && <div className="grid place-items-center w-24 h-24 bg-[#1f3540] shadow-xl rounded-lg text-4xl">{winner}</div>}
              </header>

              <footer>
                <button onClick={resetGame} className="mb-4 font-bold">Restart</button>
              </footer>
            </div>
        </section>
    )
}