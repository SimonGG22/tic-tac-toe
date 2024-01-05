/* eslint-disable react/prop-types */
export const Turn = ({TURNS, turn}) => {
  
    return (
        <section className='flex gap-5 items-center justify-center py-3'>
            <div className={`relative w-24 h-10 ${turn === TURNS.X ? 'bg-blue-500' : 'hidden'} flex items-center justify-center font-bold rounded-lg`}>
                {TURNS.X} TURN
                <div className="absolute top-2 w-24 h-10 bg-[#102129] rounded-xl -z-10"></div>
            </div>
            <div className={`relative w-24 h-10 ${turn === TURNS.O ? 'bg-red-500' : 'hidden'} flex items-center justify-center font-bold rounded-lg`}>
                {TURNS.O} TURN
                <div className="absolute top-2 w-24 h-10 bg-[#102129] rounded-xl -z-10"></div>
            </div>
      </section>
    )
}