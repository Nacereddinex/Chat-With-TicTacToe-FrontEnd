import React from 'react'

function Join({setName, setRoom, joinroom}) {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
                <img
              className="mx-auto h-12 w-auto"
              src="https://www.svgrepo.com/show/9832/chat.svg"
              alt="Workflow"
            />
            <div className="joinChatContainer"> <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900" >JOIN A CHAT AND PLAY</h1> 
                <div className=''></div>
                <div>
                    <label htmlFor="email-address" className="sr-only">
                    Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Name"
                        onChange={(event)=>setName(event.target.value)}
                    />
                    <input
                        id="Room"
                        name="Room"
                        type="text"
                        
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Room Number"
                        onChange={(event)=>setRoom(event.target.value) }
                    />
                </div>
              
                <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={joinroom} > Enter </button>
        
            </div>
        </div>
    </div>
  )
}

export default Join