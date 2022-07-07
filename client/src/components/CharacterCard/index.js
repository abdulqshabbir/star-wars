import styles from "./character-card.module.css"
const { container, text } = styles

export default function CharacterCard({ name }) {
    return (
        <div className={container}>
            <p className={text}>{name}</p>
        </div>
    )
}