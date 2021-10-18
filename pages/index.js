import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { setCookie } from "nookies";

export default function Home() {
	const [nome, setNome] = useState("");
	const router = useRouter();

	function handleConnect(event) {
		event.preventDefault();

		if (nome.split(" ").length <= 1) {
			alert("Você deve informar seu nome completo.");
			return;
		}

		setCookie(null, "nomeUsuario", nome, {
			path: '/',
			maxAge: 86400
		});
		router.push("/fila");
	}

	return (
		<section className="h-screen bg-primary flex flex-col justify-center items-center gap-16 text-white p-8">
			<Head>
				<title>Monitorey | Matemática Elementar</title>
			</Head>
			<header className="w-full max-w-xl text-center grid gap-4">
				<h1 className="font-bold text-2xl sm:text-3xl">
					Organize suas dúvidas na monitoria de Matemática Elementar
				</h1>
				<h2 className="text-gray-300">
					Um jeito fácil e rápido de controlar a frequência na
					monitoria.
				</h2>
			</header>
			<main className="w-full max-w-sm">
				<form className="w-full grid gap-8">
					<div className="grid gap-2">
						<label
							htmlFor="inputNomeCompleto"
							className="font-bold"
						>
							Seu nome completo
						</label>
						<input
							value={nome}
							id="inputNomeCompleto"
							type="text"
							className="bg-secondary w-full p-4 rounded-md border-2 border-gray-800"
							placeholder="Jean Baptiste Joseph Fourier"
							onChange={(e) => setNome(e.target.value)}
						/>
					</div>

					<button
						onClick={handleConnect}
						className="bg-green-700 w-full p-4 rounded-md border-2 border-green-600 text-center"
					>
						Quero tirar dúvidas
					</button>
				</form>
			</main>
		</section>
	);
}
