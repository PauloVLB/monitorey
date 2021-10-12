export function ListaFrequencia(props) {
	return (
		<main className="border-2 border-gray-800 rounded-md">
			<ul className="flex flex-col">
				{props.alunos.map((aluno, index) => (
					<li
						key={`Al${index}`}
						className={`
							px-6 py-4 
							${index % 2 === 0 ? "bg-primary-dark" : "bg-primary-light"} 
							${index === 0 && "rounded-t-md"} 
							${index === props.alunos.length - 1 && "rounded-b-md"}
						`}
					>
						{aluno.nome}
					</li>
				))}
			</ul>
		</main>
	);
}
