import { type DiaryEntry } from "../../types"
import Diary from "./Diary"

export default function Entries({diaries} : {diaries:DiaryEntry[]}){
    return(
        <ul>
      {
        diaries.map(diary => (
          <Diary key={diary.id} diary={diary}/>
        ))
      }
    </ul>
    )
}