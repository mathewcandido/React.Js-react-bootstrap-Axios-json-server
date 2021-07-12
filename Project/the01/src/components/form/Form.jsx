import React, { useState } from 'react';
import axios from "axios";
import './Form.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [name, setName] = useState('');
  const [est, setEst] = useState('');
  const [city, setCity] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  const handleSubmit = () => {
    setLoading(true);
    setIsError(false);
    const data = {
      //aqui é nome e o conteúdo que vai para dentro do json
      nome: name,
      Estado: est,
      Preço: `R$:${price}`,
      Cidade: city,
      Descrição: desc
    }
    axios.post('http://localhost:5000/Eventos', data).then(res => {
      //aqui é a manipulação dos inputs
      //Esse res.data é o parametro passado na callback 
      setData(res.data);
      setName('');
      setEst('');
      setPrice('');
      setCity('');
      setDesc('');
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      setIsError(true);
    });
  }

  return (
    <div className="formgrup">
      <div className="container p-3">
        <h5 className="d-inline-block mb-3">Testando Post para Forms !</h5>
        <div style={{ maxWidth: 400 }}>
          <div classNames="form-group">
            <label htmlFor="name">Nome do Evento:</label>
            <input
              id="name"
              type="text"
              className="form-control"
              placeholder="Nome do Evento:"
              value={name}
              onChange={e => setName(e.target.value)} />
          </div>
          <div classNames="form-group">
            <label htmlFor="job" className="mt-2">Estado:</label>
            <input
              type="text"
              className="form-control"
              id="est"
              placeholder="Estado:"
              value={est}
              onChange={e => setEst(e.target.value)} />
          </div>
          <div classNames="form-group">
            <label htmlFor="city" className="mt-2">Cidade:</label>
            <input
              type="text"
              className="form-control"
              id="city"
              placeholder="Estado:"
              value={city}
              onChange={e => setCity(e.target.value)} />
          </div>
          <div classNames="form-group">
            <label htmlFor="price" className="mt-2">Descrição:</label>
            <textarea
              className="form-control"
              id="desc"
              placeholder="Descrição do evento"
              value={desc}
              onChange={e => setDesc(e.target.value)} />
          </div>
          <div classNames="form-group">
            <label htmlFor="price" className="mt-2">Preço:</label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="Preço"
              value={price}
              onChange={e => setPrice(e.target.value)} />
          </div>

          {isError && <small className="mt-3 d-inline-block text-danger">Something went wrong. Please try again later.</small>}
          <button
            type="submit"
            className="btn btn-primary mt-3"
            onClick={handleSubmit}
            disabled={loading}
          >{loading ? 'Loading...' : 'Enviar'}</button>

        </div>
      </div>
    </div>
  );
}

export default App;