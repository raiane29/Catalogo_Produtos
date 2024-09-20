import { db } from "../database.js"
import { z } from "zod"

const produtoShema = z.object({
    //vamos fazer o corpo doobjeto que vai ser verificado !
    //use esse site: https://zod.dev/?id=from-denolandx-deno
    //esse trim() é para que o espaço branco não conte como string
    //aqui temos a validacao caso o campo esteja vazio!
    nome: z.string().trim().min(1, {message:"o nome é obrigatorio!!!!!"}).max('255'),
    preco: z.number().min(1, {message:"o preço é obrigatorio!!!!"}),
    estoque:  z.string().trim().min(1, {message:"o estoque é obrigatorio!!!!"}),
    total:  z.number().min(1, {message:"o total é obrigatorio!!!!"})
})

export const getProdutos = (request, response) => {

    const query = "SELECT * FROM listaProdutos"

    db.query(query, (error, data) => {
        if(error){
            return response.json(error)
        }
        return response.status(200).json(data)
    })
}

export const addProduto = (request, response) => {
    const validation = produtoShema.safeParse(request.body)
    if (!validation.success) {
        return response.status(400).json("validação = error")
    }
    
    const query = "INSERT INTO listaProdutos(`nome`, `preco`, `estoque`, `total`) VALUES (?)"

    const values = [
        validation.data.nome,
        validation.data.preco,
        validation.data.estoque,
        validation.data.total
    ]

    db.query(query, [values], (error) => {
        if(error){
            return response.json(error)
        }

        return response.status(200).json("Produto cadastrado com sucesso!")
    })
}

export const updateProduto = (request, response) => {

    const validation = produtoShema.safeParse(request.body)

    const query = "UPDATE listaProdutos SET `nome` = ?, `preco` = ?, `estoque` = ?, `total` = ? WHERE `id` = ?";

    if (!validation.success) {
        return response.status(400).json(validation.error.issues)
    }
    const values = [
        validation.data.nome,
        validation.data.preco,
        validation.data.estoque,
        validation.data.total
    ]

    db.query(query, [...values, request.params.id], (error) => {
        if(error) {
            return response.json(error)
        }

        response.status(200).json("Produto atualizado  com sucesso!")
    })

}

export const deleteProduto = (request, response) => {

    const query = "DELETE from listaProdutos WHERE `id`= ?";

    db.query(query, [request.params.id], (error) => {
        if(error){
            return response.status(500).json(error)
        }

        return response.status(200).json("Produto deletado com sucesso!")
    })

}