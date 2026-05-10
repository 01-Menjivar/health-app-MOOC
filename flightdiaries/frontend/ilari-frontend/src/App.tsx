import { useEffect, useState } from "react"
import {type DiaryEntry, type NewDiaryEntry} from '../types'
import Entries from "./components/Entries"
import diariesServices from "./services/diariesServices"
import DiaryForm from "./components/DiaryForm"

function App() {

const [diaries, setDiaries] = useState<DiaryEntry[]>([])
const [errorMessage, setErrorMessage] = useState<string | null>(null)

useEffect(() => {
  diariesServices.fetchDiaries()
  .then(response => setDiaries(response))
  .catch((error) => {
      if(error instanceof Error){
        setErrorMessage(error.message)
      }
    })
},[])

  const addDiary = (newDiary:NewDiaryEntry) =>{
    diariesServices.addDiary(newDiary)
    .then(response => {
      setDiaries([...diaries,response]);
      setErrorMessage(null);
    })
    .catch((error) => {
      if(error instanceof Error){
        setErrorMessage(error.message)
      }
    })
  }

return (
  <div>
    {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}
    <Entries diaries={diaries}/>
    <DiaryForm addDiary={addDiary}/>
  </div>
)
}
export default App
