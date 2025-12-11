import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
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
    paddingBottom: 5,
    marginBottom: 5,
  },
  label: {
    width: '30%',
    fontWeight: 'bold',
  },
  value: {
    width: '70%',
  },
});

export const RelatorioPDF = ({ dados, talha, config, cliente, precos }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Orçamento</Text>

      <View style={styles.section}>
        <View style={styles.row}></View>
      </View>
      
      
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{dados.nome}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{dados.email}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>ID do Pedido:</Text>
          <Text style={styles.value}>{dados.pedidoId}</Text>
        </View>
      </View>
    </Page>
  </Document>
);