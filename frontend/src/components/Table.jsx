import axios from 'axios'
import React, {useRef} from 'react'
import { toast } from 'react-toastify'
import { TableContainer, Th, Thead, Tr, Td, Tbody } from '../styles/Table'

const Table = ({books, setUpdate, setBooks}) => {

  const deleteRow = async (id) => {
    await axios.delete(`http://localhost:3333/${id}`)
    .then(({data}) => {
        const novoArray = books.filter((book) => book.id !== id)
        setBooks(novoArray)
        toast.success(data)
    })
    .catch(() => toast.error("Não foi possível excluir o registro!"))
  }

  const handleUpdate = (item) => {
    setUpdate(item)
  }

  return (
    <TableContainer>
        <Thead>
            <Tr>
                <Th>Nome</Th>
                <Th>Preço</Th>
                <Th>Estoque</Th>
                <Th>Total</Th>
            </Tr>
        </Thead>
        <Tbody>
          {
            books.map((item, i) => (
              <Tr key={i}>
                <Td>{item.nome}</Td>
                <Td>{item.preco}</Td>
                <Td>{item.estoque}</Td>
                <Td>{item.total}</Td>
                <Td><button onClick={() => deleteRow(item.id)}>Excluir</button></Td>
                <Td><button onClick={() => handleUpdate(item)}>Editar</button></Td>
              </Tr>
            ))
          }
        </Tbody>
    </TableContainer>
  )
}

export default Table