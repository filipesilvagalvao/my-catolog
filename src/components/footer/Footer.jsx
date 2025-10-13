import styles from "./Footer.module.css"

function Footer() {
    const date = new Date();

  return (
    <footer className={styles.footer}><p>Todos os direito reservados - {date.getFullYear()}</p></footer>
  )
}

export default Footer