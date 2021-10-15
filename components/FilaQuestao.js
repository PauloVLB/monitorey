import { useState } from "react";

import { Menu, ChevronDown, ChevronUp } from "react-feather";

export function FilaQuestao(props) {
	const [contentState, setContentState] = useState("hidden");
	const [contentMenu, setContentMenu] = useState(<ChevronDown />);

	function handleMenuClick() {
		if (contentState === "hidden") {
			setContentState("");
			setContentMenu(<ChevronUp />);
		} else {
			setContentState("hidden");
			setContentMenu(<ChevronDown />);
		}
	}

	return (
		<>
			<main className="w-full flex flex-col border-2 border-gray-800 rounded-md">
				<header
					className="w-full bg-secondary px-6 py-4 rounded-t-md cursor-pointer flex justify-between"
					onClick={handleMenuClick}
				>
					<h2 className="font-bold">
						Cap. {props.capitulo} - Questão {props.numero}
					</h2>
					{contentMenu}
				</header>

				<div
					className={`${contentState} w-full flex flex-col gap-8 px-6 py-4 bg-primary-dark rounded-b-md border-t-2 border-gray-800`}
				>
					<div className="w-full flex flex-col sm:flex-row gap-6 sm:gap-8">
						<button className="w-full text-center px-3 py-2 border-2 rounded-md border-cta text-cta duration-300 hover:bg-cta hover:bg-opacity-20">
							Marcar como resolvida
						</button>
						<button className="w-full text-center px-3 py-2 border-2 rounded-md border-cta-complementary text-cta-complementary duration-300 hover:bg-cta-complementary hover:bg-opacity-20">
							Sair da questão
						</button>
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="font-semibold">Alunos</h3>
						<ul>
							{props.alunos.map((aluno, index) => (
								<li key={`aluno${index}`}>{aluno}</li>
							))}
						</ul>
					</div>
				</div>
			</main>
		</>
	);
}
