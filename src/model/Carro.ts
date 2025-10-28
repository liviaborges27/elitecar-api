// import type Cliente from "./Cliente.js";
// import { DatabaseModel } from "./DatabaseModel.js";

// const database = new DatabaseModel().pool; // Inicializa o pool de conexões com o banco de dados


// class Carro {

//     // Atributos
//     private idCarro: number = 0;
//     private marca: string;
//     private modelo: string;
//     private ano: number;
//     private cor: string;

//     /**
     
//      * @param _marca 
//      * @param _modelo 
//      * @param _ano 
//      * @param _cor
//      */
//     constructor(
//         _marca: string,
//         _modelo: string,
//         _ano: number,
//         _cor: string
//     ) {
//         this.marca = _marca;
//         this.modelo = _modelo;
//         this.ano = _ano;
//         this.cor = _cor;
//     }

//     /**
//      * 
//      * @returns 
//      */
//     public getIdCarro(): number {
//         return this.idCarro;
//     }

//     /**
//      * Atribui um ID ao carro
//      * @param idCarro novo ID
//      */
//     public setIdCarro(idCarro: number): void {
//         this.idCarro = idCarro;
//     }

//     /**
//      * Retorna a marca
//      * @returns marca
//      */
//     public getMarca(): string {
//         return this.marca;
//     }

//     /**
//      *
//      * @param marca 
//      */
//     public setMarca(marca: string): void {
//         this.marca = marca;
//     }

//     /**
//      *
//      * @returns 
//      */
//     public getModelo(): string {
//         return this.modelo;
//     }

//     /**
//      * Atribui um CPF ao cliente
//      * @param modelo novo CPF do cliente
//      */
//     public setModelo(modelo: string): void {
//         this.modelo = modelo;
//     }

//     /**
//      * 
//      * @returns 
//      */
//     public getAno(): number {
//         return this.ano;
//     }

//     /**
//      * Atribui um telefone ao cliente
//      * @param ano novo telefone do cliente
//      */
//     public setAno(ano: number): void {
//         this.ano = ano;
//     }

//     /**
//      * Retorna os clientes cadastrados no banco de dados
//      * @returns Lista com clientes cadastrados
//      * @returns valor nulo em caso de erro na consulta
//      */
//     static async listarClientes(): Promise<Array<Cliente> | null> {
//         try {
//             // Cria uma lista vazia que irá armazenar os objetos do tipo Cliente
//             let listaDeClientes: Array<Cliente> = [];

//             // Define a consulta SQL que irá buscar todos os registros da tabela 'clientes'
//             const querySelectClientes = `SELECT * FROM clientes;`;

//             // Executa a consulta no banco de dados e aguarda a resposta
//             const respostaBD = await database.query(querySelectClientes);

//             // Percorre cada linha retornada pela consulta
//             respostaBD.rows.forEach((clienteBD: any) => {
//                 // Cria um novo objeto Cliente usando os dados da linha atual (nome, cpf, telefone)
//                 const novoCliente: Cliente = new Cliente(
//                     clienteBD.nome,
//                     clienteBD.cpf,
//                     clienteBD.telefone
//                 );

//                 // Define o ID do cliente usando o valor retornado do banco
//                 novoCliente.setIdCliente(clienteBD.id_cliente);

//                 // Adiciona o novo cliente à lista de clientes
//                 listaDeClientes.push(novoCliente);
//             });

//             // Retorna a lista completa de clientes
//             return listaDeClientes;
//         } catch (error) {
//             // Em caso de erro na execução da consulta, exibe uma mensagem no console
//             console.error(`Erro na consulta ao banco de dados. ${error}`);

//             // Retorna null para indicar que houve uma falha na operação
//             return null;
//         }
//     }
// }

// export default Cliente;