import { useSelector, useDispatch } from "react-redux"
import { createWordForBank } from "../../../features/bankWord/bankWordSlice"


function SpeechForm(props) {
  //finalWord is now being sent to db as req.body.finalWord

  const { saidWord } = useSelector(state => state.word)
  const dispatch = useDispatch()
  console.log(saidWord)
  const onSubmit = e => {
    e.preventDefault()

    dispatch(createWordForBank({ saidWord }))
    // dispatch()
    console.log(saidWord)
  }

  return (
    <>
      <button onClick={e => onSubmit(e)}>Save</button>
    </>
  )
}

export default SpeechForm
