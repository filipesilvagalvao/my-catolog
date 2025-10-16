import { useEffect, useState } from "react"
import Card from "../card/Card"
import styles from "./Main.module.css"

function Main() {
    const [products, setProducts] = useState(null) //State para guardar json de produtos de uma api

    async function getProducts() {//fetch numa func assíncrona com tratamento de respostas
        try {
            const response = await fetch("https://api-tenis.42web.io/wp-json/meuapp/v2/produtos")//endepoint que fiz para a tarefa
            if(!response.ok){
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            const json = await response.json()
            setProducts(json)
        }catch(ERROR){
            console.error('Houve um erro com a API: '+ ERROR.message)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    if (products === null) return <div className={styles.main__loader}>Carregando <i className="fa-solid fa-spinner loading"></i></div>; //Statu de carregamento

    return (
        <main className={styles.main}>
            {products.map((e) => (//itera sobre os dado da api gera os cards por map
                <Card photo={e.photo} name_product={e.name_product} price={e.price} description={e.description} id={e.id} key={e.id} />
            ))}
        </main>
    )
}

export default Main