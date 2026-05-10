import type { CoursePart } from "../../types";

export default function Part({part}:{part: CoursePart}){

    const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

    switch(part.kind){
        case "basic":
            return(<>
            <b>{part.name} {part.exerciseCount}</b>
            <p>{part.description}</p>
            </>)
        case 'group':
            return(<>
            <b>{part.name} {part.exerciseCount}</b>
            <p>project exercises {part.groupProjectCount}</p>
            </>)
        case 'background':
            return(<>
            <b>{part.name} {part.exerciseCount}</b>
            <p>{part.description}</p>
            <p>submit to {part.backgroundMaterial}</p>
            </>)
        case 'special':
            return(<>
            <b>{part.name} {part.exerciseCount}</b>
            <p>{part.description}</p>
            required skills: {part.requirements.join(", ")}
            </>)
        default:
            return assertNever(part)
}
}