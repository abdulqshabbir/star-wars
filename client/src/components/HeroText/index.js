import styles from "./hero-text.module.css"
const { container, heroText, heroHeader } = styles

export default function HeroText() {
    return (
        <section className={container}>
            <h1 className={heroHeader}>Welcome to the Star Wars portal.</h1>
            <p className={heroText}>
                Learn about the details of your favorite Star Wars characters.
                Cick any of the cards below to see more info!
            </p>
        </section>
    )
}