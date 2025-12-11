import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { RelatorioPDF } from '../../../../utils/orcamentoPDF';

const PDFViewerTela = ({ isOpen, onClose, talha, config, cliente, precos }) => {
    const dadosExemplo = {
        nome: "Maria Oliveira",
        email: "maria@teste.com",
        pedidoId: "98765"
    };

    if (!isOpen) return null;

    return (
        <div className='pdf'>
            <div className='frame'>
                <PDFViewer width="99.8%" height="99.8%">
                    <RelatorioPDF dados={dadosExemplo} />
                </PDFViewer>
                <button onClick={() => onClose()}>
                    Voltar
                </button>
            </div>
        </div>
    );
};

export default PDFViewerTela;