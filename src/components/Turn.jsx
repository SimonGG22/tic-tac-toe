/* eslint-disable react/prop-types */
export const Turn = ({TURNS, turn}) => {
  
    return (
        <section className='flex gap-5 items-center justify-center py-3'>
            <div className={`w-10 h-10 ${turn === TURNS.X ? 'bg-blue-500' : 'hidden'} flex items-center justify-center`}>
                {TURNS.X}
            </div>
            <div className={`w-10 h-10 ${turn === TURNS.O ? 'bg-red-500' : 'hidden'} flex items-center justify-center`}>
                {TURNS.O}
            </div>
      </section>
    )
}