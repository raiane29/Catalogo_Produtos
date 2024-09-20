import React from "react";
import axios from "axios";
import Form from "./components/Form";
import Table from "./components/Table";
import { Container } from "./styles/Containe.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  const [produtos, setProdutos] = React.useState([]);
  const [update, setUpdate] = React.useState(null);

  const getProdutos = async () => {
    try {
      const response = await axios.get("http://localhost:3222");
      setProdutos(response.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      
    }
  };

  React.useEffect(() => {
    getProdutos();
  }, [setProdutos]);

  return (
    <>
      <Container>
        <Form update={update} setUpdate={setUpdate} getProdutos={getProdutos} />
        <Table books={produtos} setUpdate={setUpdate} setProdutos={setProdutos}/>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
