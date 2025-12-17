import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { RelatorioPDF } from '../../../../utils/orcamentoPDF';

const PDFViewerTela = ({ isOpen, onClose, talha, config, cliente, precos }) => {

    if (!isOpen) return null;

    return (
        <div className='pdf'>
            <div className='frame'>
                <PDFViewer width="99.8%" height="99.8%">
                    <RelatorioPDF talha={talha} config={config} cliente={cliente} precos={precos} />
                </PDFViewer>
                <button onClick={() => onClose()}>
                    Voltar
                </button>
            </div>
        </div>
    );
};

export default PDFViewerTela;