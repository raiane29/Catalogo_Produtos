import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { FormContainer, Label, Input, Button } from "../styles/Form";
import axios from "axios";

const Form = ( {update, setUpdate, getProdutos} ) => {
    const ref = useRef();
  
    useEffect(() => {
      if(update){
        const produto = ref.current;
  
        produto.nome.value = update.nome;
        produto.preco.value = update.preco;
        produto.estoque.value = update.estoque;
        produto.total.value = update.total;
      }
    }, [update])
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const produto = ref.current;
  
      if (!produto.nome.value || !produto.preco.value || !produto.estoque.value || !produto.total.value) {
        return toast.warn("Preencha todos os campos do formulário!");
      }
  
      if (update) {
        await axios
          .put(`http://localhost:3222/${update.id}`, {
            nome: produto.nome.value,
            preco: produto.preco.value,
            estoque: produto.estoque.value,
            total: produto.total.value
          })
          .then(() => toast.success("Livro Atualizado com sucesso!"));
      } else {
        await axios.post("http://localhost:3222", {
            nome: produto.nome.value,
            preco: produto.preco.value,
            estoque: produto.estoque.value,
            total: produto.total.value
          })
          .then(() => toast.success("Cadastrado com sucesso!"))
          .catch(() => toast.error("Não foi possível cadastrar!"));
      }
  
      produto.nome.value = "";
      produto.preco.value = "";
      produto.estoque.value = "";
      produto.total.value = "";
  
      setUpdate(null)
      getProdutos()
    };
  
    return (
      <FormContainer ref={ref} onSubmit={handleSubmit}>
        <Label>Nome</Label>
        <Input name="nome" />
        <Label>Preço</Label>
        <Input name="preco" />
        <Label>Estoque</Label>
        <Input name="estoque" />
        <Label>Total</Label>
        <Input name="total" />
        <Button type="submit">ADICIONAR</Button>
      </FormContainer>
    );
  };
  
  export default Form;