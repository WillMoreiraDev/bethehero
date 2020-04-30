import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './style.css';

export default function PageProfile() {
  const [incidents, setIncidents] = useState([]);

  const OngId = localStorage.getItem('ongId');
  const OngName = localStorage.getItem('ongName');

  const history = useHistory();

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: OngId
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [OngId])

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: OngId
        }
      });
      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch(err) {
      alert('Erro ao deletar o caso, tente novamente');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }


  return ( 
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vinda, { OngName }</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button type="button" onClick={handleLogout}>
          <FiPower src={18} color="#E02041"/>
        </button>
      </header>

      <h1>Casos cadastrados</h1>
      
      <ul>
        {
          incidents.map(incident => (
            <li key={incident.id}>
              <strong>CASO:</strong>
              <p>{ incident.title }</p>

              <strong>DESCRICAO:</strong>
              <p>{ incident.description }</p>

              <strong>VALOR:</strong>
              <p>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value) }</p>

              <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}