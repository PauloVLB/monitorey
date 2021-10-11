import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { PopupDuvida } from '../components/PopupDuvida';

const socket = io("http://localhost:8000", { transports: ['websocket'] });

export default function Fila() {
  const [alunos, setAlunos] = useState([]);
  const [isPopupDuvidaVisivel, setIsPopupDuvidaVisivel] = useState(false);
  
  socket.on('listar', data => {
      setAlunos(data.alunos);
  })

  function handleExcluir(index) {
    socket.emit('delete', { index })
  }

  return(
    <div>
      <button 
        onClick={() => setIsPopupDuvidaVisivel(true)}
        className="bg-green-700 w-full p-4 rounded-md border-2 border-green-600 text-center"
      >
        Adicionar dúvida
      </button>
      {alunos.map((aluno, index) => (
          <div key={index}>
            <label>{`${index+1}. ${aluno.nome}`}</label>
            <button onClick={() => handleExcluir(index)}>Exlcuir</button>
          </div>
        ))}
      <PopupDuvida
        isVisivel={isPopupDuvidaVisivel}
        setIsVisivel={setIsPopupDuvidaVisivel}
        socket={socket}
      />
    </div>
  );
}