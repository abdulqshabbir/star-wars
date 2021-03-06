import styles from "./hero-text.module.css"
const { container, heroText, heroHeader } = styles

export default function HeroText() {
    return (
        <section className={container}>
            <h1 className={heroHeader}>The Star Wars portal.</h1>
            <p className={heroText}>
                Learn about the details of your favorite Star Wars characters.
                Click any of the cards below to see more info!
            </p>
        </section>
    )
}