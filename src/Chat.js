import React ,{ useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'




function Chat({socket,name,room,setw,w }) {

    const [currentMessage,setCurrentMessage]=useState('');
    const [messageList,setMessageList]=useState([]);

    const exit= async()=>{
        

        setw(!w);
    }

    const sendMessage= async() =>{
        if(currentMessage !==''){
            const messageData={
                room:room,
                name:name,
                message:currentMessage,
                time:new Date(Date.now()).getHours()+':'+ new Date(Date.now()).getMinutes(),
            };
            await socket.emit('send-message',messageData);
            setMessageList(messageList=>[...messageList,messageData])
        }
        setCurrentMessage('')
        
    }

    useEffect(()=>{
        socket.on('receive-message',(data)=>{
            setMessageList(messageList=>[...messageList,data])
            
        })
        
    },[socket]);

  return (

    <div>
        

    
    <div className='py-5'>    
        <h2 className="mb-6 mt-2 text-center text-1xl font-extrabold text-gray-900"  > CHAT </h2>
        

        <div className='chat-window'>
            <div className='chat-header'>
           
                        
                
                <h1 className='text-center text-1xl font-bold text-white'> Live Chat </h1></div>
            <div className='chat-body'>




                    <ScrollToBottom className='message-container'> 
                {messageList.map((element)=>{
                        return (
                        
                        <div className='message' id={name===element.name? 'other': 'you'}>
                            <div>
                                < div className='message-content'> <p> {element.message}</p></div>
                                < div className='message-meta'> <p id='time'>{element.time}</p> <p id='author'>{element.name}</p></div>
                            </div>
                            
                        </div>)
                })}
                    </ScrollToBottom>
            </div>
            <div className='chat-footer'>
                <input type='text' placeholder='...' value= {currentMessage} onChange={(event)=>setCurrentMessage(event.target.value)} onKeyPress={(event)=>{event.key=== 'Enter' && sendMessage()}}/>
                <button onClick={sendMessage}> SEND </button>
            </div>
        
        </div>
    
    


    </div>
    
                
     <div className='mt-10 '> <button className='exitbtn' onClick={exit}> EXIT </button> </div>

    </div>
  )
}
// https://tailwindcomponents.com/component/tailwindcss-messenger-clone 
export default Chat