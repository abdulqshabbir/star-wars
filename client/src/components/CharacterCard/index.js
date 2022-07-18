import { Link } from "react-router-dom"
import styles from "./character-card.module.css"
const { container, text, image } = styles

export default function CharacterCard({ name }) {
    return (
        <Link to={`/characters/${name}`} style={{textDecoration: "none", color: 'white'}}>
            <div className={container}>
                <p className={text}>{name}</p>
                <img className={image} src={`${process.env.PUBLIC_URL}/${name}.jpg`} height={'200px'} alt="Sorry no image available" />
            </div>
        </Link>
    )
}