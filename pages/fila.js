import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:8000", { transports: ['websocket'] });

export default function Fila() {
  const [alunos, setAlunos] = useState([]);
  
  socket.on('listar', data => {
      setAlunos(data.alunos);
  })

  function handleExcluir(index) {
    socket.emit('delete', { index })
  }

  return(
    <div>
      {alunos.map((aluno, index) => (
          <div key={index}>
            <label>{`${index+1}. ${aluno.nome}`}</label>
            <button onClick={() => handleExcluir(index)}>Exlcuir</button>
          </div>
        ))}
    </div>
  );
}