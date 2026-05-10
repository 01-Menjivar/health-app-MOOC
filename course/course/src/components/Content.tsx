import type { CoursePart } from "../../types"

interface ContentProps {
    courseParts: CoursePart[]
}

import Part from "./Part"

export default function Content({courseParts}:ContentProps) {
  return(
    <ul>
      {
        courseParts.map(part => (<li key={part.name}>
          <Part part={part}/>
        </li>))
      }
    </ul>
  )
}
