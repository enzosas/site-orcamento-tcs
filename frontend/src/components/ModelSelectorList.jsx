import "./ModelSelector.css"
import React, { useState, useEffect } from "react";


function ModelSelectorList() {
  // Estado para armazenar a lista de modelos vinda da API
  const [modelos, setModelos] = useState([]);
  const [selecionado, setSelecionado] = useState(0);

  // useEffect para buscar os dados da API quando o componente for montado
  useEffect(() => {
    // A função de busca de dados
    const fetchModelos = async () => {
      try {
        // Faz a requisição para o seu endpoint que retorna todas as talhas
        // Certifique-se que a porta (ex: 8080) está correta
        const response = await fetch("http://localhost:8081/api/talhas/");
        const data = await response.json();
        
        // Extrai apenas os nomes dos modelos do array de objetos
        const nomesDosModelos = data.map(talha => talha.modelo);
        
        // Atualiza o estado com os modelos buscados
        setModelos(nomesDosModelos);

      } catch (error) {
        console.error("Erro ao buscar os modelos:", error);
        // Opcional: você pode definir um estado de erro para exibir uma mensagem ao usuário
      }
    };

    fetchModelos();
  }, []); // O array vazio [] faz com que o useEffect execute apenas uma vez

  return (
    <div className="selector-border">
        <div className="selector">
        {modelos.map((modelo, index) => (
            <div
            key={index}
            className={`modelo-opcao ${selecionado === index ? "selecionado" : ""}`}
            onClick={() => setSelecionado(index)}
            >
            {modelo}
            </div>
        ))}
        </div>
    </div>
  );
}

export default ModelSelectorList;