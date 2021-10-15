import Head from "next/head";

import { FilaQuestao } from "../components/FilaQuestao";
import { ListaFrequencia } from "../components/ListaFrequencia";
import { PopupDuvida } from "../components/PopupDuvida";
import { parseCookies } from "nookies";

import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000", { transports: ["websocket"] });

export default function Fila({ nomeUsuario }) {
	const [alunos, setAlunos] = useState([]);
	const [questoes, setQuestoes] = useState([
		{
			capitulo: 1,
			numero: 2,
			alunos: [],
		},
		{
			capitulo: 3,
			numero: 3,
			alunos: [],
		},
		{
			capitulo: 4,
			numero: 5,
			alunos: [],
		},
	]);
	const [nome, setNome] = useState(nomeUsuario);
	const [isPopupDuvidaVisivel, setIsPopupDuvidaVisivel] = useState(false);

	useEffect(() => {
		socket.emit("new-user", { nome });
	}, [nome]);

	socket.on("listar-alunos", (data) => {
		setAlunos(data.alunos);
	});

	socket.on("listar-questoes", (data) => {
		setQuestoes(data.questoes);
	});

	function handleExcluir(index) {
		socket.emit("delete", { index });
	}

	function handleMinhaDuvidasButton() {
		document
			.getElementById("duvidas")
			.classList.toggle("underline-btn-active");
	}

	return (
		<div className="min-h-screen h-full min-w-screen bg-primary text-white p-6 sm:p-12 grid sm:grid-cols-2 gap-16">
			<Head>
				<title>Monitorey | Dúvidas</title>
			</Head>
			<section className="w-full h-full flex flex-col gap-10 items-center">
				<header className="w-full flex flex-col gap-8">
					<div className="flex flex-col gap-4">
						<h4 className="sm:text-lg text-gray-300">
							Olá, <strong>{nome}</strong>
						</h4>
						<h1 className="font-bold text-2xl sm:text-3xl">
							Fila de dúvidas
						</h1>
					</div>
					<div className="w-full flex flex-col sm:flex-row gap-4">
						<button
							onClick={() => setIsPopupDuvidaVisivel(true)}
							className="w-full flex items-center justify-center p-3.5 font-bold bg-cta duration-300 hover:bg-green-500 rounded-md border-2 border-green-600 text-center"
							type="button"
						>
							Adicionar dúvida
						</button>
						<button
							id="duvidas"
							className="w-full flex items-center justify-center p-3.5 border-2 border-gray-800 rounded-md duration-300 hover:border-cta hover:text-cta"
							type="button"
							onClick={handleMinhaDuvidasButton}
						>
							Minhas dúvidas
						</button>
					</div>
				</header>

				<main className="w-full flex flex-col gap-0">
					{questoes.map((questao, index) => (
						<FilaQuestao
							key={`Q${index}`}
							index={index}
							maxQ={questoes.length - 1}
							capitulo={questao.capitulo}
							numero={questao.numero}
							alunos={questao.alunos}
						/>
					))}
				</main>
			</section>
			<section className="w-full h-full flex flex-col gap-10">
				<header>
					<div className="flex flex-col gap-4">
						<h4 className="hidden sm:block sm:text-lg">
							<br></br>
						</h4>
						<h1 className="font-bold text-2xl sm:text-3xl">
							Frequência
						</h1>
					</div>
				</header>
				<ListaFrequencia alunos={alunos} />
			</section>
			<PopupDuvida
				isVisivel={isPopupDuvidaVisivel}
				setIsVisivel={setIsPopupDuvidaVisivel}
				socket={socket}
				nome={nome}
			/>
		</div>
	);
}

export async function getServerSideProps(ctx) {
	const cookies = parseCookies(ctx);

	return {
		props: {
			nomeUsuario: cookies.nomeUsuario,
		},
	};
}
