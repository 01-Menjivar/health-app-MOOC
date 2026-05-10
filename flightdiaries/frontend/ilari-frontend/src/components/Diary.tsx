import { type DiaryEntry } from "../../types"

export default function Diary({diary}:{diary:DiaryEntry}){
    return(
        <div>
            <p>Date: {diary.date}  </p>
             <p>Visibility: {diary.visibility} </p>
              <p>Weather: {diary.weather} </p>
              <p>Comment: {diary.comment}</p>
          </div>
    )
}