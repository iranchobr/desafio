const FarmEndpoint = require("../endpoints/FarmEndpoint");
const farmEndpoint = new FarmEndpoint();

module.exports = (router) => {

    /**
     * @swagger
     * definitions:
     *   Farm:
     *    type: "object"
     *    properties:
     *        name:
     *          type: "string"
     */

    /**
     * @swagger 
     * /farms/{id}:
     *  get:
     *     tags:
     *      - Farm
     *     description: Return all farms
     *     parameters:
     *      - name: id
     *        in: path
     *        required: true
     *        type: integer 
     *     produces:
     *         - application/json
     *     responses:
     *       200:
     *        description: Return one farm
     *       404:
     *        description: Not found farm   
     *             
     */
    router.get("/:id", farmEndpoint.findById);

    /**
     * @swagger
     * /farms/{id}:
     *   delete:
     *      tags:
     *         - Farm
     *      description: Delete one farm
     *      parameters:
     *        - name: id
     *          in: path  
     *          required: true
     *          type: integer
     *      produces:
     *         - application/json
     *      responses:
     *         204:
     *            description: Delete success
     *         404:
     *            description: Delete one farm failed
     */
    router.delete("/:id", farmEndpoint.remove);

    /**
     * @swagger
     * /farms/{id}:
     *    put:
     *      tags:
     *        - Farm
     *    parameters:
     *     - name: id
     *       in: path
     *       required: true
     *       type: integer
     *     - name: body
     *       in: body
     *       required: true
     *       schema:
     *          $ref: '#/paths/definitions/Farm'
     *    produces:
     *      - application/json
     *    responses:
     *        204:
     *          description: Update datas with success
     *        404:
     *          description: Farm not exist to update
     */
    router.put("/:id", farmEndpoint.update);

    /**
     * @swagger
     * /farms:
     *    get:
     *       tags:
     *          - Farm
     *       description: Return all farms
     *       produces:
     *         - application/json
     *       responses:
     *         200:
     *           description: Return all farms
     */
    router.get("/", farmEndpoint.findAll);

    /**
     * @swagger
     * /farms:
     *    post:
     *      tags:
     *        - Farm
     *      parameters:
     *       - in: body
     *         name: body
     *         required: true
     *         schema:
     *           $ref: '#paths/definitions/Farm'
     *      produces:
     *          - application/json
     *      responses:
     *         200:
     *           description: Create new farm
     *         400:
     *           description: Datas invalids
     *         409:
     *           description: The farm with name mencionated used per other
     */
    router.post("/", farmEndpoint.create);
    
    return router;
}