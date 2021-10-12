import { useState } from "react";


const MAX_CAPITULO = 50;
const MAX_QUESTAO = MAX_CAPITULO;

export function PopupDuvida({ socket, isVisivel, setIsVisivel }) {
    const [tipoDuvida, setTipoDuvida] = useState("Questão");
    const [capitulo, setCapitulo] = useState("1");
    const [questao, setQuestao] = useState("1");

    function getNumFrom(num) {
        const numberNum = Number(num);
        const isNum = !isNaN(numberNum);
        
        return (isNum)? numberNum: false;
    }

    function canChangeNum(numberNum, maxValue) {
        return numberNum && numberNum > 0 && numberNum < maxValue
    }

    function handleCapitulo(num) {
        const numberNum = getNumFrom(num);
        if(canChangeNum(numberNum, MAX_CAPITULO)) {
            setCapitulo(num);
        } else {
            setCapitulo("");
        }
    }

    function handleQuestao(num) {
        const numberNum = getNumFrom(num);

        if(canChangeNum(numberNum, MAX_QUESTAO)) {
            setQuestao(num);
        } else {
            setQuestao("");
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        // TODO: Enviar o nome do aluno que enviou a dúvida
        socket.emit("new-doubt", {
            tipo: tipoDuvida,
            capitulo,
            questao
        })
        
        setIsVisivel(false);
    }
    return (isVisivel && (
        <div className="fixed top-0 w-screen h-screen bg-black bg-opacity-70 grid place-items-center">
            <section className="bg-primary w-full max-w-md text-white p-8 rounded-md grid gap-8">
                <header>
                    <h2 className="font-bold text-2xl">Nova dúvida</h2>
                </header>
                <main className="grid gap-8">
                    <form 
                        className="grid gap-6"
                        onSubmit={e => handleSubmit(e)}
                    >
                        <div className="input-container">
                            <label htmlFor="inputTipoDuvida">Tipo de dúvida</label>
                            <select 
                                id="inputTipoDuvida" 
                                className="input"
                                onChange={e => setTipoDuvida(e.target.value)}
                                value={tipoDuvida}
                                required
                            >
                                <option selected={true}>Questão</option>
                                <option>Teórica</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label>Número do capítulo</label>
                            <input
                                className="input"
                                onChange={e => handleCapitulo(e.target.value)}
                                value={capitulo}
                                required
                            />
                        </div>
                        {tipoDuvida == "Questão" && (
                            <div className="input-container">
                                <label>Número da questão</label>
                                <input
                                    className="input"
                                    onChange={e => handleQuestao(e.target.value)}
                                    value={questao}
                                    required
                                />
                            </div>
                        )}
                        <div>
                            <input
                                type="submit"
                                value="Adicionar dúvida"
                                className="bg-green-700 cursor-pointer w-full px-4 py-2 rounded-md border-2 border-green-600 text-center"
                            />
                        </div>
                    </form>
                </main>
            </section>
        </div>
    ) || null)
}