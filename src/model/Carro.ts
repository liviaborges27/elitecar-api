import type { CarroDTO } from "../interface/CarroDTO.js";
import { DatabaseModel } from "./DatabaseModel.js"; // Importa a classe DatabaseModel

const database = new DatabaseModel().pool; // Inicializa o pool de conexões com o banco de dados

class Carro{

    // Atributos
    private idCarro: number = 0;
    private marca: string;
    private modelo: string;
    private ano: number;
    private cor: string;

    /**
     * Construtor da classe Cliente
     * @param _marca
     * @param _modelo 
     * @param _ano 
     * @param_cor
     */
    constructor(
        _marca: string,
        _modelo: string,
        _ano: number,
        _cor: string
    ) {
        this.marca = _marca;
        this.modelo = _modelo;
        this.ano = _ano;
        this.cor = _cor;
    }

    /**
     * 
     * @returns 
     */
    public getIdCarro(): number {
        return this.idCarro;
    }

    /**
     * 
     * @param idCarro 
     */
    public setIdCarro(idCarro: number): void {
        this.idCarro = idCarro;
    }

    /**
     * 
     * @returns 
     */
    public getMarca(): string {
        return this.marca;
    }

    /**
     * 
     * @param marca
     */
    public setMarca(marca: string): void {
        this.marca = marca;
    }

    /**
     * 
     * @returns 
     */
    public getModelo(): string {
        return this.modelo;
    }

    /**
     * 
     * @param modelo 
     */
    public setModelo(modelo: string): void {
        this.modelo = modelo;
    }

    /**
     * 
     * @returns 
     */
    public getAno(): number {
        return this.ano;
    }

    /**
     * 
     * @param ano 
     */
    public setAno(ano: number): void {
        this.ano = ano;
    }
    /**
     * 
     * @returns 
     */
    public getCor(): string {
        return this.cor;
    }

    /**
     * 
     * @param cor
     */
    public setCor(cor: string): void {
        this.cor = cor;
    }


    /**
     * 
     * @returns lista com carros cadastrados
     * @returns valor nulo em caso de erro na consulta
     */
    static async listarCarros(): Promise<Array<Carro> | null> {
        try {
            // Cria uma lista vazia que irá armazenar os objetos do tipo Carro
            let listaDeCarro: Array<Carro> = [];

            // Define a consulta SQL que irá buscar todos os registros da tabela 'clientes'
            const querySelectCarros = `SELECT * FROM carros;`;

            // Executa a consulta no banco de dados e aguarda a resposta
            const respostaBD = await database.query(querySelectCarros);

            // Percorre cada linha retornada pela consulta
            respostaBD.rows.forEach((carroBD) => {
              
                const novoCarro: Carro = new Carro(
                    carroBD.marca,
                    carroBD.modelo,
                    carroBD.ano,
                    carroBD.cor
                );

              
                novoCarro.setIdCarro(carroBD.id_carro);

                
                listaDeCarro.push(novoCarro);
            });

            
            return listaDeCarro;
        } catch (error) {
            // Em caso de erro na execução da consulta, exibe uma mensagem no console
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            // Retorna null para indicar que houve uma falha na operação
            return null;
        }
    }

    /**
     * I
     * 
     * @param carro objeto a ser inserido no banco
     * @returns **true** caso a inserção tenha sido feita, **false** em caso de erro
     */
    static async cadastrarCarro(carro: CarroDTO): Promise<boolean> {
        try {
            // Define a query SQL para inserir um novo cliente na tabela 'cliente'
            // Os valores serão passados como parâmetros ($1, $2, $3)
            // O comando RETURNING retorna o id_cliente gerado automaticamente pelo banco
            const queryInsertCarro = `INSERT INTO carros (marca, modelo, ano, cor)
                                VALUES
                                ($1, $2, $3, $4)
                                RETURNING id_carro;`;

            // Executa a query no banco de dados, passando os dados do cliente como parâmetros

            const respostaBD = await database.query(queryInsertCarro, [
                 carro.marca.toUpperCase(), // marca do carro em letra maiúscula
                carro.modelo.toUpperCase(), // modelo do carro em letra maiúscula
                carro.ano,       // ano do carro convertido em inteiro
                carro.cor.toUpperCase()     // cor do carro em letra maiúscula       
            ]);

           
            if (respostaBD.rows.length > 0) {
                
                console.info(`Carro cadastrado com sucesso. ID: ${respostaBD.rows[0].id_carro}`);

                // Retorna true indicando que o cadastro foi realizado com sucesso
                return true;
            }

            // Se nenhuma linha foi retornada, significa que o cadastro falhou
            // Retorna false indicando falha na operação
            return false;
        } catch (error) {
            // Em caso de erro na execução da query, exibe uma mensagem de erro no console
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            // Retorna false indicando que houve uma falha na operação
            return false;
        }
    }
}

export default Carro;