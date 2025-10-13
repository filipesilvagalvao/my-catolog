import styles from "./Card.module.css"

function Card({ photo, name_product, price, description, id }) {

    return (
        <>
            {/*Article que exibe a foto, nome e preço do produto*/}
            <article className={styles.card} onClick={(e) => e.currentTarget.nextElementSibling.classList.toggle("closed")}>
                <img src={photo} alt="foto do produto" className={styles.card__img} />
                <h3 className={styles.card__h3}>{name_product}</h3>
                <span className={styles.card__price}>R$ {price}</span>
            </article>
            {/*div de modal para exibir as infos do produto*/}
            <div className={styles.card__modalContainer + " closed"}>
                <div className={styles.card__modal}>
                    <img src={photo} alt="foto do produto" className={styles.card__modalImg} />
                    <div>
                        <h3 className={styles.card__modalH4}>Descrição</h3>
                        <p className={styles.card__description}>{description}</p>
                    </div>
                    <i className={styles.card__modalClose + " fa-solid fa-circle-xmark"} onClick={(e) => e.target.offsetParent.offsetParent.classList.toggle("closed")}></i>
                </div>
            </div>
        </>
    )
}

export default Card