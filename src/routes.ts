import { Router } from "express"; // Importa o módulo Router do express
import type { Request, Response } from "express"; // Importa os módulos de requisição e resposta
import CarroController from "./controller/CarroController.js";
import ClienteController from "./controller/ClienteController.js";

const router = Router(); // cria uma instância de Router

router.get("/api", (req: Request, res: Response) => {
    res.status(200).json({ mensagem: "Olá, seja bem-vindo!" });
});

/**
 * Endpoints (rotas) para Clientes
 */
// Retorna a lista com todos os clientes
router.get("/api/clientes", ClienteController.todos);
// Cadastra um novo cliente
router.post("/api/clientes", ClienteController.novo);

router.get("/api/carros", CarroController.todos);
router.post("/api/carros", CarroController.novo);

export { router }; // Exporta o roteador