import React from 'react'
import Board from './Board'
function Square({val, onClick, idx, canPlay}) {
  return (
    <div class="bg-grey-900 hover:bg-blue-700 w-20 h-20 text-blue font-bold py-8 px-8 border border-blue-700 rounded" onClick={()=>{if(val==''&& canPlay){onClick(idx)}}  }   >
                     {val}
    </div> 
  )
}

export default Square