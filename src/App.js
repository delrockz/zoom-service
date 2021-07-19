import { useState } from 'react'
import Zoom from './Zoom'

function App() {
  const [joinMeeting, setJoinMeeting] = useState(false)
  return (
    <div className='App'>
      {joinMeeting ? (
        <Zoom />
      ) : (
        <button
          style={{
            borderRadius: '50px',
            padding: '10px',
            margin: '10px',
            backgroundColor: 'salmon',
            color: 'white',
            cursor: 'pointer',
          }}
          id='joinMeeting'
          onClick={() => setJoinMeeting(true)}
        >
          Join Meeting
        </button>
      )}
    </div>
  )
}

export default App
