import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';

const socket = io("http://localhost:8000", { transports: ['websocket'] });

export default function Home() {
  const [nome, setNome] = useState("");
  const router = useRouter();

  function handleConnect(event) {
    event.preventDefault();

    socket.emit('new-user', {
      nome
    });

    router.push("/fila");
  }

  return(
    <form>
      <input type="text" placeholder="Nome Completo" onChange={(e) => setNome(e.target.value)}/>
      <button onClick={handleConnect}>Entrar</button>
    </form>
  );
}