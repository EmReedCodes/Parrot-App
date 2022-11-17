import "./styles/style.css"
import { FaRegPlayCircle } from "react-icons/fa"
import SortMatch from "./components/SortMatch"
import { IconContext } from "react-icons"
import { useState, useEffect, createContext } from "react"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { toast } from "react-toastify"
import { FaMicrophoneAltSlash } from "react-icons/fa"
import { FaMicrophoneAlt } from "react-icons/fa"


export const WordContext = createContext()

const SortItSpellIt = () => {
  
  const [saidWord, setSaidWord] = useState("")


  const {
    finalTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition()
  

  useEffect(() => {
    if (finalTranscript !== "") {
      setSaidWord(finalTranscript.toLowerCase())
    }
  }, [finalTranscript, setSaidWord])


  if (!browserSupportsSpeechRecognition) {
    console.log("Try chrome")
    return toast.error("Unavailable in this browser")
  }

  if (!isMicrophoneAvailable) {
    return toast.error("Microphone must be on")
  }


  const resetWord = () => {
    setSaidWord("")
  }

  
    const speechHandler = text => {
      if (saidWord) {
        const msg = new SpeechSynthesisUtterance()
        msg.text = text
        window.speechSynthesis.speak(msg)
      }
    }

console.log(saidWord)
  return (
    <section className="sortItHome wordGame">

      {!saidWord && (
        <>
          <h2>Let's get to sorting!</h2>
          <p>Click start and speak a word to begin.</p>
        </>
      )}

      {saidWord && (
        <>
          <button className="reset-btn" onClick={() => resetWord()}>
            Start Over
          </button>

          <button className="containIcon" onClick={() => speechHandler(saidWord)}>
            <IconContext.Provider value={{ className: "replay-btn repeatWord" }}>
              <FaRegPlayCircle />
            </IconContext.Provider>
          </button>
        </>
      )}


      {!saidWord && listening ? 
        <IconContext.Provider value={{ className: "microphone-on" }}>
          <FaMicrophoneAlt />
        </IconContext.Provider>
       : 
        <IconContext.Provider value={{ className: "microphone" }}>
          <FaMicrophoneAltSlash />
        </IconContext.Provider>
      }
     {/* if no said word and no listening display first elm or second if yes to either oh.. */}
      {/* {!saidWord && !listening ?
     
        <button onClick={SpeechRecognition.startListening}>Start</button>
        :
          <button onClick={SpeechRecognition.abortListening}>Cancel</button>
       
      } */}

      

      {saidWord &&
         <WordContext.Provider value={saidWord}>
          <SortMatch />
          </WordContext.Provider>
        }
        
    </section>
  )
}

export default SortItSpellIt
