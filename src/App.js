import logo from './Icon.svg';
import './App.css';
import io from "socket.io-client";
import {useState }from 'react'
import './Chat';
import Chat from './Chat';
import Board from './components/Board';
import Join from './components/Join';
import Test from './components/Test';

const socket= io.connect('http://localhost:3001');

function App() {
  const [name,setName]=useState('')
  const [room,setRoom]=useState('')
  const [w,setw]=useState(false)
  
  const joinroom=()=> {
      if (name!=='' && room!==''){

        socket.emit('joinRoom',{room,name})
        setw(!w);
      }

  }
  return (
    <div className="items-center">

      <div > <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900"  >Game Room</h1> </div>
      {w? 
        <div className='flex justify-center'> 
            <div className='padding: 20px;'>
              <Chat socket={socket} name={name} room={room} setw={setw} w={w}/>
            </div> 
            <div className=''>
              <Board socket={socket} name={name} room={room} />
              
            </div>  
            
        </div> 
        :                 
        <Join setName={setName} setRoom={setRoom} joinroom={joinroom}/>
         
                
      }
      

      
    </div>
  );
}

export default App;
