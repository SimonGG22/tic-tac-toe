/* eslint-disable react/prop-types */
export const Square = ({children, updateBoard, index}) => {

    const handleClick = () => {
      updateBoard(index)
    }
  
    return (
      <div onClick={handleClick} className='relative flex justify-center items-center w-20 h-20 p-10 bg-[#1f3540] rounded-lg text-3xl cursor-pointer'>
        {children}
        <div className="absolute top-3 left-0 w-20 h-20 bg-[#102129] rounded-xl -z-10"></div>
      </div>
    )
}