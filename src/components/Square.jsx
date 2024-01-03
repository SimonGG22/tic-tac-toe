/* eslint-disable react/prop-types */
export const Square = ({children, updateBoard, index}) => {

    const handleClick = () => {
      updateBoard(index)
    }
  
    return (
      <div onClick={handleClick} className='p-10 bg-slate-700 rounded-lg'>
        {children}
      </div>
    )
}