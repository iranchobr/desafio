const BatchEndpoint = require("../endpoints/BatchEndpoint");
const batchEndpoint = new BatchEndpoint();

module.exports = (router) => {

    /**
     * @swagger
     * definitions:
     *  BatchAnimal:
     *      properties:
     *        animal_id:
     *           type: integer
     *        date_output:
     *           type: string
     *        date_input:
     *           type: string
     *        date_last_movimentation:
     *           type: string
     *  Batch:
     *    properties:
     *      name: 
     *        type: string
     *      description:
     *        type: string
     *      batch_animal:
     *        type: array
     *        items:
     *          $ref: '#/paths/definitions/BatchAnimal'
     */

     /**
     * @swagger
     * /batchs/{id}:
     *   get:
     *     tags:
     *       - Batch
     *     parameters:
     *      - name: id
     *        in: path
     *        required: true
     *        type: integer
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: Return one batchs
     *       404: 
     *         description: Not found register
     */
    router.get("/:id", batchEndpoint.findById);

     /**
     * @swagger
     * /batchs/{id}:
     *   delete:
     *     tags:
     *       - Batch
     *     parameters:
     *      - name: id
     *        in: path
     *        required: true
     *        type: integer
     *     produces:
     *      - application/json
     *     responses:
     *       204:
     *         description: Delete success
     *       404: 
     *         description: Not found register
     */
    router.delete("/:id", batchEndpoint.remove);

     /**
     * @swagger
     * /batchs/{id}:
     *    put:
     *       tags:
     *         - Batch
     *       parameters:
     *        - name: id
     *          in: path
     *          required: true
     *          type: integer
     *        - name: body
     *          in: body
     *          required: true
     *          schema:
     *            $ref: "#/paths/definitions/Batch"
     *       produces:
     *          - application/json
     *       responses:
     *          204:
     *            description: Updated success
     *          404:
     *            description: Not found register
     */
    router.put("/:id", batchEndpoint.update);

    /**
     * @swagger
     * /batchs:
     *   get:
     *     tags:
     *       - Batch
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: Return all batchs
     */
    router.get("/", batchEndpoint.findAll);

    /**
     * @swagger
     * /batchs:
     *    post:
     *       tags:
     *         - Batch
     *       parameters:
     *        - name: body
     *          in: body
     *          required: true
     *          schema:
     *            $ref: "#/paths/definitions/Batch"
     *       produces:
     *          - application/json
     *       responses:
     *          201:
     *            description: Created success
     *          400:
     *            description: Datas invalid
     *          404:
     *            description: Informated animal not exist.
     */
    router.post("/", batchEndpoint.create);
    
    return router;
}