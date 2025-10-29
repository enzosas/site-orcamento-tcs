import "./ModelSelector.css"
import React, { useState, useEffect, useRef } from "react";

function ModelSelectorList({ modelos, onSelect }) {
    const [selecionado, setSelecionado] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        if (modelos.length > 0) {
            setSelecionado(0);
            onSelect(modelos[0]);
        }
    }, [modelos, onSelect]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (modelos.length === 0) return;

            if (e.key === "ArrowDown") {
                setSelecionado((prev) => {
                    const novo = (prev + 1) % modelos.length;
                    onSelect(modelos[novo]);
                    return novo;
                });
            }
            if (e.key === "ArrowUp") {
                setSelecionado((prev) => {
                    const novo = (prev - 1 + modelos.length) % modelos.length;
                    onSelect(modelos[novo]);
                    return novo;
                });
            }
        };

        const current = containerRef.current;
        if (current) {
            current.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            if (current) {
                current.removeEventListener("keydown", handleKeyDown);
            }
        };
    }, [modelos, onSelect]);

    return (
        <div
            className="selector-border"
            tabIndex={0} // deixa o elemento focável
            ref={containerRef}
        >
            <div className="selector">
                {modelos.map((modelo, index) => (
                    <div
                        key={index}
                        className={`modelo-opcao ${selecionado === index ? "selecionado" : ""}`}
                        onClick={() => {
                            setSelecionado(index);
                            onSelect(modelos[index]);
                        }}
                    >
                        {modelo.modelo}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ModelSelectorList;
