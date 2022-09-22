import Dictaphone from "./components/Dictaphone"
import SpeechForm from "../../components/SpeechForm"
import DragNDrop from "./components/DragNDrop"
import "./styles/style.css"
import { useState } from "react"
import { useSelector } from "react-redux"
import { FaRegPlayCircle } from 'react-icons/fa'



const SayItSpellIt = () => {

  const { user } = useSelector(state => state.auth)
  const { saidWord, remove } = useSelector(state => state.word)


//word is the sliced word
  // const [word, setWord] = useState("")
  // //finalWord complete word 
  // const [finalWord, setFinalWord] = useState("")

  // const [randomChars, setRandomChars] = useState([])



//can check and confirm spoken word here
  const speechHandler = (text) => {
    if (saidWord) {
      const msg = new SpeechSynthesisUtterance()
      msg.text = text
      window.speechSynthesis.speak(msg)
    }
  }
//speechForm will only need to pop up on completion of the game


  console.log(user)


  return (
    <div className="contain">
      <h1>Welcome {user.name}</h1>
      
        
      <span>Confirm correct word</span>
      {saidWord &&
        <div className="containReplay">
          <button className='replay-btn' onClick={() => speechHandler(saidWord)}>Replay <FaRegPlayCircle />
          </button>

        </div>
      }
      
      
     
     
      <Dictaphone />

        <SpeechForm />
   
    </div>
  )
}

export default SayItSpellIt

