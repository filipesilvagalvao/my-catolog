import { useState } from "react";
import styles from "./Header.module.css"

function Header() {
    const [open, setOpen] = useState(true); //state de estado do modal de formulário de adicionar produtos, se aberto(true) - se fechado(false)

    const [status, setStatus] = useState("Adicionar Produto"); //Status de adição de produtos
    //state's do formulário
    const [product, setProduct] = useState("");          
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState(null);

    //função com efeitos de abrir formulário
    function openAndcloseForm(e) {
        setOpen((open) => !open)
        e.target.children[0].style.transform = open ? "rotate(90deg)" : "rotate(45deg)";
        e.target.children[0].style.color = open ? "red" : "";
        e.target.nextElementSibling.style.transform = open ? "scale(1,1)" : "scale(0,0)";
    }

    //fetch que envia os produtos para api e recarrega a página para exibir o produto adicionado
    async function sendProduct(e) {
        e.preventDefault()

        setStatus(<i className="fa-solid fa-spinner loading"></i>)

        const formData = new FormData();
        formData.append("name_product", product);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("photo", photo);

        const response = await fetch("https://api-tenis.42web.io/wp-json/meuapp/v2/produtos",
            {
                method: "POST",
                body: formData,
            }
        )

        setProduct("");
        setPrice(0);
        setDescription("");
        setPhoto(null);

        setStatus("Adicionado!")

        setTimeout(() => {
            location.reload();
        }, 2000);
    }

    return (
        <header className={styles.header}>

            <div className={styles.header__container}>
                <h1 className={styles.header__title}>My Catalog</h1>
                <button className={styles.header__btnOpenForm} onClick={(e) => { openAndcloseForm(e) }}>Adicionar Produto <i className="fa-solid fa-circle-xmark"></i></button>
                {/*Formulário*/}
                <form className={styles.header__form} onSubmit={(e) => sendProduct(e)}>
                    <div className={styles.header__containerForm}>
                        <label htmlFor="name" className={styles.header__formLabel}>Nome:</label>
                        <input type="text" id="name" placeholder="Nome do produto" className={styles.header__formInputName} value={product} onChange={(e) => setProduct(e.target.value)} />
                    </div>
                    <div className={styles.header__containerForm}>
                        <label htmlFor="price" className={styles.header__formLabel}>Valor:</label>
                        <input type="number" id="price" className={styles.header__formInputPrice} value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <input type="file" name="imagem" accept="image/*" id="imagem" className={styles.header__formInputImage} onChange={(e) => setPhoto(e.target.files[0])} />
                    <div className={styles.header__containerForm}>
                        <label htmlFor="description" className={styles.header__formLabel}>Descrição:</label>
                        <textarea id="description" placeholder="Descreva o produto em poucas palavras" className={styles.header__formTextArea} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <button className={styles.header__btnAddProduct}>{status}</button>
                </form>

            </div>

        </header>
    )
}

export default Header