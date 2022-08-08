import React, { useEffect, useState } from 'react'
import Square from './Square'
import io, { Socket } from "socket.io-client";

function Board({socket,name,room} ) {

    const [board,setBoard]=useState(['','','','','','','','',''])
    const [canPlay,setCanPlay]=useState(true)
    const [result,setResult]=useState({winner:'none', state:'none'})


    const handleClick = (i) => {
        
      }
      

useEffect(()=>{
        CheckWin()
        checkTie()
        
        
},[board]);

 useEffect(()=>{
    socket.on('update-game',(data)=>{
        setBoard(board=>({...board,[data.number]:'O'}))
        setCanPlay(true)
        
        
    })

    socket.on('restartGame',(data)=>{
        
        setResult({winner:'none',state:'none'})
        setCanPlay(true)
        setBoard(['','','','','','','','',''])
        
        
    })
    
},[socket]);

const onClick = async(number)=>{
    console.log('inside onClick')
    const data={
        number:number,
        room:room,
        name:name,
    }

    

    await socket.emit('play',data);
    setBoard(board=>({...board,[data.number]:'X'}))
    setCanPlay(false)

    
}


const Patterns= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

]
const CheckWin =()=>{
    Patterns.forEach((currentPattern)=>{
        const firstPlayer = board[currentPattern[0]]
        if (firstPlayer=='') return; // skip pattern if element is empty
        let FoundWinner=true
        currentPattern.forEach((idx)=>{
            if (board[idx] != firstPlayer){
                FoundWinner=false;
            }
            
        });
        if (FoundWinner) {
            setResult({winner:board[currentPattern[0]], state:'won'})
            alert('winner is', board[currentPattern[0]])
            setCanPlay(false)
        }
    })

}

const indexes = [0,1,2,3,4,5,6,7,8]
const checkTie =()=>{
    let filled = true 

    indexes.forEach((idx)=>{
        if (board[idx] == ''){
            filled = false
        }
        
    });
    //
    
    if (filled && result.winner=='none'){
        setResult({winner:'none',state:'tie'})
        alert(' tie ')
    }
    
}

const restartGame = async()=>{

    const data={
        
        room:room,
        name:name,
    }

    await socket.emit('restart',data);
    console.log('sent')
    setResult({winner:'none',state:'none'})
    setCanPlay(true)
    setBoard(['','','','','','','','',''])

}


  return (
    <>
    <h2 className="mt-6 text-center text-1xl font-extrabold text-gray-900"  > GAME </h2>
    <div className='mx-20 mt-20' >
        
        <div className='flex board '>
        
            <div className='row'>
            <Square onClick={onClick} val={board[0]} idx={0} canPlay={canPlay}/>
            <Square onClick={onClick} val={board[1]} idx={1} canPlay={canPlay}/>
            <Square onClick={onClick} val={board[2]} idx={2} canPlay={canPlay}/>
                
            </div>
            
            <div className='row'>
            <Square onClick={onClick} val={board[3]} idx={3} canPlay={canPlay}/>
            <Square onClick={onClick} val={board[4]} idx={4} canPlay={canPlay}/>
            <Square onClick={onClick} val={board[5]} idx={5} canPlay={canPlay}/>   
                


            </div>
            <div className='row'>
            <Square onClick={onClick} val={board[6]} idx={6} canPlay={canPlay}/>
            <Square onClick={onClick} val={board[7]} idx={7} canPlay={canPlay}/>
            <Square onClick={onClick} val={board[8]} idx={8} canPlay={canPlay}/>   

            </div>
        </div>
        <button class="bg-blue-300 hover:bg-blue-700 mt-10 text-white font-bold py-2 px-4 border border-blue-700 " onClick={restartGame}> Restart </button>
    </div>
    </>
  )
}

export default Board