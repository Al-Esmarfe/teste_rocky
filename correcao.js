const fs = require('fs');

// Função para arrumar nomes de marcas e veículos
function consertaNomes(data) {
  if (typeof data === 'string') {
    // substitui os caracteres æ e ø por a e o
    return data.replace(/æ/g, 'a').replace(/ø/g, 'o');
  } else if (typeof data === 'object') {
    // faz a chamada recursiva da função para cada propriedade do objeto
    for (let key in data) {
      data[key] = consertaNomes(data[key]);
    }
  }
  return data;
}

// Função para arrumar o tipo da propriedade vendas
function consertaVendas(data) {
  if (typeof data === 'object') {
    // faz a chamada recursiva da função para cada propriedade do objeto
    for (let key in data) {
      if (key === 'vendas') {
        // converte a propriedade vendas para o tipo number
        data[key] = Number(data[key]);
      } else {
        data[key] = consertaVendas(data[key]);
      }
    }
  }
  return data;
}

// Função para ler o arquivo e arrumar suas informações
function consertaData(filePath) {
  // lê o arquivo
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // corrige os nomes de marcas e veículos
  const dataCorrigida = consertaNomes(data);

  // corrige o tipo da propriedade "vendas"
  const dataCorrigidaVendas = consertaVendas(dataCorrigida);

  // retorna os dados corrigidos
  return dataCorrigidaVendas;
}

// Função para enviar o arquivo arrumado
function exportarArquivo(filePath, data) {
  // converte os dados para o formato JSON
  const jsonData = JSON.stringify(data);

  // escreve o arquivo
  fs.writeFileSync(filePath, jsonData, 'utf8');
}

// Executa as funções para arrumar e enviar os arquivos
const data1Corrigido = consertaData('broken_database_1.json');
exportarArquivo('fixed_database_1.json', data1Corrigido);

const data2Corrigida = consertaData('broken_database_2.json');
exportarArquivo('fixed_database_2.json', data2Corrigida);
