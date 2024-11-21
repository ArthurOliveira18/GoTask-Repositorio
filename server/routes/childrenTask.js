const express = require('express');
const router = express.Router();
const childrenTaskController = require('../controllers/getChildrenController');

// Rota para buscar crianças e suas tarefas
router.get('/childrenTask/:idResp', childrenTaskController.getChildrenTask);

/**
 * GET /childrenTask/:idResp
 * - `:idResp` é o ID do responsável.
 * - Retorna todas as crianças vinculadas ao responsável, juntamente com suas tarefas.
 */

// Rota para inserir uma nova tarefa no histórico de uma criança
router.post('/childrenTask/:idResp/add', childrenTaskController.createInsert);

/**
 * POST /childrenTask/:idResp/add
 * - `:idResp` é o ID do responsável.
 * - Corpo esperado (JSON):
 *   {
 *     "criancaId": number,
 *     "taskId": number,
 *     "feita": boolean,
 *     "dataTask": string (no formato 'YYYY-MM-DD HH:MM:SS')
 *   }
 * - Insere uma nova tarefa marcada como concluída no histórico da criança.
 */

// Rota para atualizar os pontos acumulados de uma criança
router.put('/childrenTask/updatePoints', childrenTaskController.updatePoints);

/**
 * PUT /childrenTask/updatePoints
 * - Corpo esperado (JSON):
 *   {
 *     "criancaId": number,
 *     "totalPoints": number
 *   }
 * - Atualiza os pontos acumulados de uma criança no banco de dados.
 */

// Rota para atualizar o status de uma tarefa específica
router.put('/childrenTask/updateStatus', childrenTaskController.updateTaskStatus);

/**
 * PUT /childrenTask/updateStatus
 * - Corpo esperado (JSON):
 *   {
 *     "criancaId": number,
 *     "taskId": number,
 *     "feita": boolean
 *   }
 * - Atualiza o status de uma tarefa (marcar como feita/não feita) para uma criança.
 */

module.exports = router;
