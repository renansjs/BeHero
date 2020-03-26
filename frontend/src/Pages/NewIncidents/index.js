import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css';
import api from  '../../services/api';
import logoImg from '../../assets/logo.svg';

export default function NewIncidents(){

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e){
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    }

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      })

      history.push('/profile');
      
    } catch (error) {
      alert('Erro ao tentar novo caso, tente novamente.');
      
    }
  }

  return (
    <div className="new-incidents-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero"/>
          <h1>Cadastra Novo Caso</h1>
          <p>Descreva o caso detalhadamente para que um herói possa resolver isso.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041"/>
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident} >
          <input
          placeholder="Título do caso"
          value={title}
          onChange={e => setTitle(e.target.value)}
          /> 
          <textarea
          placeholder="Descrição" 
          value={description}
          onChange={e => setDescription(e.target.value)} 
          />
          <input
          placeholder="Valor em reais"
          value={value}
          onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}