import Head from "next/head";

import { FilaQuestao } from "../components/FilaQuestao";
import { ListaFrequencia } from "../components/ListaFrequencia";
import { PopupDuvida } from "../components/PopupDuvida";
import { parseCookies } from "nookies";

import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://monitorey-back.herokuapp.com/", { transports: ["websocket"] });

export default function Fila({ nomeUsuario, senhaMonitor, opcoesMonitor }) {
	const [alunos, setAlunos] = useState([]);
	const [questoes, setQuestoes] = useState([]);
	const [questoesVisiveis, setQuestoesVisiveis] = useState();
	const [isMinhasDuvidas, setIsMinhasDuvidas] = useState(false);
	const [nome, setNome] = useState(nomeUsuario);
	const [isPopupDuvidaVisivel, setIsPopupDuvidaVisivel] = useState(false);
	const [isMonitor, setIsMonitor] = useState(opcoesMonitor);

	useEffect(() => {
		socket.emit("new-user", { nome });
	}, [nome]);

	socket.on("listar-alunos", (data) => {
		setAlunos(data.alunos);
	});

	socket.on("listar-questoes", (data) => {
		setQuestoes(data.questoes);
		if (isMinhasDuvidas) {
			showMinhasDuvidas();
		} else {
			setQuestoesVisiveis(questoes);
		}
	});

	function handleExcluir(index) {
		socket.emit("delete", { index });
	}

	function showMinhasDuvidas() {
		const newQuestoesVisiveis = questoes.filter(questao => questao.alunos.includes(nome));
		
		if (newQuestoesVisiveis.length) {
			setQuestoesVisiveis(newQuestoesVisiveis);
		}
	}

	function handleMinhaDuvidasButton() {
		const newIsMinhasDuvidas = !isMinhasDuvidas;
		setIsMinhasDuvidas(newIsMinhasDuvidas);

		document
			.getElementById("duvidas")
			.classList.toggle("underline-btn-active");

		if (newIsMinhasDuvidas) {
			showMinhasDuvidas();
		} else {
			setQuestoesVisiveis(questoes);
		}
	}

	function handleSalvarDados() {
  		const senhaInformada = prompt("Qual é a senha?", "");
		if (senhaInformada == senhaMonitor) {
			let dataStr = JSON.stringify(alunos.map(aluno => aluno.nome));
			let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
		
			let exportFileDefaultName = 'data.json';
		
			let linkElement = document.createElement('a');
			linkElement.setAttribute('href', dataUri);
			linkElement.setAttribute('download', exportFileDefaultName);
			linkElement.click();
		}
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
						{!isMonitor && (
							<>
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
							</>
						) || (
							<>
								<button
									onClick={handleSalvarDados}
									className="w-full flex items-center justify-center p-3.5 font-bold bg-cta duration-300 hover:bg-green-500 rounded-md border-2 border-green-600 text-center"
									type="button"
								>
									Salvar dados
								</button>
							</>
						)}
						
						
					</div>
				</header>

				<main className="w-full flex flex-col gap-0">
					{questoesVisiveis?.map((questao, index) => (
						<FilaQuestao
							key={`Q${index}`}
							index={index}
							maxQ={questoes.length - 1}
							capitulo={questao.capitulo}
							numero={questao.numero}
							tipo={questao.tipo}
							alunos={questao.alunos}
							socket={socket}
							nomeAluno={nome}
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

	const opcoesMonitor = ctx.query.view == "monitor";

	return {
		props: {
			nomeUsuario: cookies.nomeUsuario,
			senhaMonitor: process.env.SENHA_MONITOR,
			opcoesMonitor
		},
	};
}
