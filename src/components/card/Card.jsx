import styles from "./Card.module.css"

function Card({ photo, name_product, price, description, id }) {
    async function handleDelete() {
        if (window.confirm("Tem certeza que deseja remover este produto?")) {
            try {
                console.log('Tentando deletar produto ID:', id);
                
                const response = await fetch(`https://api-tenis.42web.io/wp-json/meuapp/v2/produtos/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors' // Adicione esta linha
                });

                console.log('Status:', response.status);

                if (response.status === 404) {
                    throw new Error('Produto não encontrado');
                }

                if (!response.ok) {
                    throw new Error(`Erro ${response.status}`);
                }

                const result = await response.json();
                console.log('Sucesso:', result);
                
                alert('Produto removido com sucesso!');
                window.location.reload();
                
            } catch (error) {
                console.error('Erro completo:', error);
                alert(`Erro: ${error.message}`);
            }
        }
    }

    return (
        <>
            <article className={styles.card} onClick={(e) => e.currentTarget.nextElementSibling.classList.toggle("closed")}>
                <img src={photo} alt="foto do produto" className={styles.card__img} />
                <h3 className={styles.card__h3}>{name_product}</h3>
                <span className={styles.card__price}>R$ {price}</span>
            </article>
            <div className={styles.card__modalContainer + " closed"}>
                <div className={styles.card__modal}>
                    <img src={photo} alt="foto do produto" className={styles.card__modalImg} />
                    <div>
                        <h3 className={styles.card__modalH4}>Descrição</h3>
                        <p className={styles.card__description}>{description}</p>
                        <button 
                            className={styles.card__deleteButton}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete();
                            }}
                        >
                            Remover Produto
                        </button>
                    </div>
                    <i className={styles.card__modalClose + " fa-solid fa-circle-xmark"} onClick={(e) => e.target.offsetParent.offsetParent.classList.toggle("closed")}></i>
                </div>
            </div>
        </>
    )
}

export default Card