import "./TalhaWindow.css";
import React, { useState, useEffect } from "react";

const verificarImagemExiste = (url) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
};

function TalhaWindow({ talha }) {
    const [imagePath, setImagePath] = useState(null);
    const [isFallback, setIsFallback] = useState(false);

    const logoFallback = `${import.meta.env.BASE_URL}tcslogo.png`;

    useEffect(() => {
        if (!talha || !talha.modelo) {
            setImagePath(logoFallback);
            setIsFallback(true);
            return;
        }

        const modeloCompleto = talha.modelo;
        const modeloSem4Letras = modeloCompleto.length > 4 
            ? modeloCompleto.slice(0, -4) 
            : modeloCompleto;

        const urlCompleta = `${import.meta.env.BASE_URL}fotos/${modeloCompleto}.jpg`;
        const urlSem4Letras = `${import.meta.env.BASE_URL}fotos/${modeloSem4Letras}.jpg`;

        const definirImagem = async () => {
            if (await verificarImagemExiste(urlCompleta)) {
                setImagePath(urlCompleta);
                setIsFallback(false);
                return;
            }
            if (await verificarImagemExiste(urlSem4Letras)) {
                setImagePath(urlSem4Letras);
                setIsFallback(false);
                return;
            }
            setImagePath(logoFallback);
            setIsFallback(true);
        };

        definirImagem();
    }, [talha]);

    if (!imagePath) return null;

    return (
        <div className="frame-imagem">
            <img 
                src={imagePath} 
                alt={talha?.modelo || "Logo TCS"} 
                className={isFallback ? "imagem-fallback-logo" : "imagem-talha"}
                onError={(e) => {
                    e.target.src = logoFallback;
                    setIsFallback(true);
                }}
            />
        </div>
    );
}

export default TalhaWindow;