import type { CarroDTO } from "../interface/CarroDTO.js";
import Carro from "../model/Carro.js";
import type { Request, Response } from "express";

class CarroController extends Carro {

    /**
     * 
     * 
     * @param req Requisição do cliente
     * @param res Resposta do servidor
     * @returns 
     * @returns 
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            // Chama o método listarClientes da classe Cliente para buscar todos os clientes no banco de dados
            const listaCarro: Array<Carro> | null = await Carro.listarCarros();

            // Retorna uma resposta HTTP com status 200 (OK) e envia a lista de clientes em formato JSON
            return res.status(200).json(listaCarro);
        } catch (error) {
            // Em caso de erro, exibe a mensagem no console para ajudar na depuração
            console.error(`Erro ao consultar modelo. ${error}`);

            // Retorna uma resposta HTTP com status 500 (erro interno do servidor)
            // Envia uma mensagem informando que não foi possível acessar os dados
            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de carros." });
        }
    }

    //Chama o  modelo para obter o carro selecionado e devolve ao cliente
    /**
     * F
     * @param req 
     * @param res 
     * @returns
     * @returns 
     * @returns 
     */
    static async carro(req: Request, res: Response): Promise<Response> {
        try {

            const dadosRecebidosCarro = req.body;
            const respostaModelo = await Carro.cadastrarCarro(dadosRecebidosCarro);

            
            if (respostaModelo) {
                return res.status(201).json({ mensagem: "Carro cadastrado com sucesso." });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar carro." });
            }
            
        } catch (error) {
            console.error(`Erro no modelo. ${error}`);

            // Retorna uma resposta HTTP com status 500 (Internal Server Error)
            // Envia uma mensagem informando que não foi possível inserir o novo carro
            return res.status(500).json({ mensagem: "Não foi possível inserir o cliente" });
        }

  
    }
    
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // Extrai os dados enviados pelo cliente na requisição HTTP (normalmente via POST)
            // Esses dados devem estar no corpo da requisição e seguir o formato da interface CarroDTO
            const dadosRecebidosCarro = req.body;

            // validação de dados ...

            // Chama o método cadastrarCarro da classe Carro, passando os dados recebidos
            // Esse método deve inserir o carro no banco de dados e retornar true ou false
            const respostaModelo = await Carro.cadastrarCarro(dadosRecebidosCarro);

            // Verifica se o cadastro foi bem-sucedido
            if (respostaModelo) {
                // Se sim, retorna uma resposta HTTP com status 201 (Created)
                // Envia uma mensagem informando que o carro foi cadastrado com sucesso
                return res.status(201).json({ mensagem: "Carro cadastrado com sucesso." });
            } else {
                // Se não, retorna uma resposta HTTP com status 400 (Bad Request)
                // Envia uma mensagem informando que houve erro no cadastro
                return res.status(400).json({ mensagem: "Erro ao cadastrar carro." });
            }
        } catch (error) {
            // Em caso de erro inesperado (como falha de conexão ou erro interno), exibe a mensagem no console
            console.error(`Erro no modelo. ${error}`);

            // Retorna uma resposta HTTP com status 500 (Internal Server Error)
            // Envia uma mensagem informando que não foi possível inserir o novo carro
            return res.status(500).json({ mensagem: "Não foi possível inserir o carro" });
        }
            
}
}
export default CarroController;