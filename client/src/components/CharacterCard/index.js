import { Link } from "react-router-dom"
import styles from "./character-card.module.css"
const { container, text } = styles

export default function CharacterCard({ name }) {
    return (
        <Link to={`/characters/${name}`} style={{textDecoration: "none"}}>
            <div className={container}>
                <p className={text}>{name}</p>
            </div>
        </Link>
    )
}