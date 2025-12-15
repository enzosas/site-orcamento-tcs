import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const capitalizarPalavras = (texto) => {
  if (!texto) return "";
  
  return texto
    .toLowerCase()
    .split(' ')
    .map(palavra => {
      return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    })
    .join(' ');
};

const getDataFormatada = () => {
  const hoje = new Date();
  
  return hoje.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const formatadorPreco = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 20,
    marginBottom: 20,
  },
  rowSimple: {
    flexDirection: 'row'
  },
  coluna: {
    flexGrow: 1,
    width: '50%',
    paddingRight: 10,
  },
  label: {
    width: '30%',
    fontWeight: 'bold',
  },
  value: {
    width: '70%',
  },
  text: {
    width: '100%',
    lineHeight: 1
  },
  marginBottom: {
    marginBottom: 20
  },
  marginTop: {
    marginTop: 20
  },
  alignRight: {
    textAlign: 'right'
  },
  alignCenter: {
    textAlign: 'center'
  },
  textIndent: {
    textIndent: 40
  }
});

export const RelatorioPDF = ({ dados, talha, config, cliente, precos }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image 
          style={[styles.header, { width: '50%', alignSelf: 'center' }]} 
          src={"tcsind.png"} 
        />
      <Text style={styles.header}>Orçamento</Text>
      <View style={styles.row}>
        <View style={styles.coluna}>
          <Text style={styles.text}>À {cliente.razaoSocial}</Text>
          <Text style={styles.text}>Telefone: {cliente.telefone}</Text>
          <Text style={styles.text}>Whatsapp: {cliente.whatsapp}</Text>
          <Text style={styles.text}>E-mail: {cliente.email}</Text>          
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>CNPJ: {cliente.cnpj}</Text>
          <Text style={styles.text}>Endereço: {cliente.telefone}</Text>
          <Text style={styles.text}>Bairro: {cliente.bairro}</Text>
          <Text style={styles.text}>CEP: {cliente.cep}  -  {cliente.cidade}/{cliente.estado}</Text>          
        </View>
      </View>
      <Text style={[styles.text, styles.marginBottom]}>Prezado Sr(a) {cliente.pessoaContato}</Text>
      <Text style={[styles.text, styles.marginBottom]}>Vimos por meio desta, apresentar proposta comercial para o fornecimento de talha elétrica, com as seguintes caracteristicas:</Text>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Modelo da talha elétrica:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{talha.modelo}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Capacidade:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{talha.capacidade} kg</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Grupo de Trabalho:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{talha.grupoTrabalho}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Tipo Construtivo:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{talha.formaConstrutiva}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Curso útil do gancho:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{talha.cursoUtilGancho} metros</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Número de Ramais de Corrente:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{talha.ramais}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Potência motor elevação:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{talha.motorElevacao} kW</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Velocidade de elevação:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{talha.velElevacaoPadrao} m/min</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Movimento de translação:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{talha.tipoTrole}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Potência motor translação:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{talha.motorTranslacao}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Velocidade de translação:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{talha.velTranslacaoPadrao}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Freio no carro de translação:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{talha.frenoNoCarroTranslacao ? "Sim" : "Não"}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Fim de curso sobe/desce:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{talha.fimCursoSobe}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Fim de curso direita/esquerda:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{config.fimCursoEsquerdaDireita ? "Sim" : "Não"}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>{talha.correnteCabo === "Corrente" ? "Guia para Corrente" : "Guia para Cabo de Aço"}:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{config.guiaCaboAco ? "Sim" : "Não"}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Célula de carga:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{config.celulaCarga ? "Sim" : "Não"}</Text>
        </View>
      </View>

      <Text style={[styles.text, styles.marginTop]}>Painel de comando:</Text>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Tipo:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{!config.excluirPainel ? talha.painelComandoPadrao : "Sem painel de comando"}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Sobe/Desce:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{!config.excluirPainel ? (config.duplaVelocidadeElevacao? "2 velocidades com inversor" : talha.acionamentoMotorElevacao) : ""}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Direita/Esquerda:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{!config.excluirPainel ? (config.duplaVelocidadeTranslacao? "2 velocidades com inversor" : talha.acionamentoMotorTranslacao) : ""}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Frente/Atrás:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{!config.excluirPainel ? (config.painel6Mov ? "2 movimentos" : "Não") : ""}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Potência do Motor da Ponte:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{config.painel6Mov ? config.potenciaMotores : ""}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Tensão de comando:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{!config.excluirPainel ? talha.tensaoComando : ""}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Tensão de trabalho:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{!config.excluirPainel ? config.tensao : ""}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Botoeira:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{!config.excluirPainel ? talha.botoeira : ""}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Controle Remoto:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{config.controleRemoto ? config.modeloControle : "Não"}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Transmissor Extra Controle Remoto:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{config.transmissorExtra ? "Sim" : "Não"}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Sinalizador Sonoro:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{!config.excluirPainel ? (config.incluirSinalizadores ? "Sim" : "Não") : "Não"}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Sinalizador Luminoso:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{!config.excluirPainel ? (config.incluirSinalizadores ? "Sim" : "Não") : "Não"}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Tomada para troca Rápida:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{!config.excluirPainel ? "Sim" : "Não"}</Text>
        </View>
      </View>

      <View style={[styles.rowSimple, styles.marginTop]}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Quantidade:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>1</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Valor Unitário:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{precos.totalTcs !== null ? formatadorPreco.format(precos.totalTcs) : "-"}</Text>
        </View>
      </View>
      <View style={styles.rowSimple}>
        <View style={styles.coluna}>
          <Text style={[styles.text, styles.alignRight]}>Valor Total:</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.text}>{precos.totalTcs !== null ? formatadorPreco.format(precos.totalTcs) : "-"}</Text>
        </View>
      </View>
      <View style={[styles.marginTop]}>
          <Text style={styles.text}>Prazo de Entrega: XXXXXXXX</Text>
          <Text style={styles.text}>Frete: XXXXXXXX</Text>
          <Text style={styles.text}>Forma de Pagamento: XXXXXXXX</Text>
          <Text style={styles.text}>Montagem: XXXXXXXX</Text>
          <Text style={styles.text}>Prazo de Validade deste Orçamento: XXXXXXXX</Text>
      </View>
      <View style={[styles.marginTop]}>
          <Text style={styles.text}>Garantia: XXXXXXXX</Text>
          <Text style={[styles.text, styles.textIndent]}>A garantia refere-se somente a mão de obra e a peça defeituosa. Despesas como frete, viagens rodoviarias e aéreas, hospedagem, alimentação, plataforma elevatória, guindastes não estão inclusas na garantia e serão de responsabilidade ao cliente.</Text>
          <Text style={[styles.text, styles.textIndent]}>Também não são cobertas pela garantia, pecas sujeitas a desgaste natural quando o equipamento for utilizado fora do seu regime de trabalho.</Text>
      </View>
      <View style={[styles.marginTop]}>
          <Text style={styles.text}>Impostos:</Text>
          <Text style={styles.text}>ICMS: Incluso no preço, base de cálculo reduzida.</Text>
          <Text style={styles.text}>IPI: 84251100 - 0%</Text>
      </View>
      <View style={[styles.marginTop]}>
          <Text style={styles.text}>Observações:</Text>
          <Text style={[styles.text, styles.textIndent]}>          Nos colocamos a disposição para esclarecer possiveis duvidas ou ajudar na definição do equipamento que melhor lhe atenderá, e também ficamos expectativa de sermos honrados c/ sua valiosa encomenda, firmamo-nos.</Text>
      </View>
      <View style={[styles.marginTop, styles.alignCenter]}>
          <Text style={styles.text}>Equipe de Vendas TCS</Text>
          <Text style={styles.text}>telefone</Text>
      </View>
      <View style={styles.marginTop}>
          <Text style={styles.text}>Conheça nossos outros canais de comunicação</Text>
          <Text style={styles.text}>Whatsapp: (55) 98118 6200</Text>
          <Text style={styles.text}>Facebook: https://m.facebook.com/tcsindustriametalurgica</Text>
          <Text style={styles.text}>Instagram: https://instagram.com/tcsmetalurgica</Text>
          <Text style={styles.text}>Website: https://www.lojatcs.com.br</Text>
      </View>

      



          
    </Page>
  </Document>
);