const PeopleEndpoint = require("../endpoints/PeopleEndpoint");
const peopleEndpoint = new PeopleEndpoint();

module.exports = (router) => {

    /**
     * @swagger
     * definitions:
     *    People:
     *      type: object  
     *      properties:
     *        name:
     *           type: string
     *        email:
     *           type: string
     *        address:
     *           type: string
     *        sex:
     *          type: string
     *        ic_active:
     *           type: boolean  
     */

    /**
     * @swagger
     * /peoples/{id}:
     *   get:
     *      tags:
     *        - People
     *      parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         type: integer
     *      produces:
     *        - application/json
     *      responses:
     *          200:
     *             description: Return one people
     *          404:
     *             description: Not found peole
     */
    router.get("/:id", peopleEndpoint.findById);

    /**
    * @swagger
    * /peoples/{id}:
    *   delete:
    *      tags:
    *        - People
    *      parameters:
    *       - name: id
    *         in: path
    *         required: true
    *         type: integer
    *      produces:
    *        - application/json
    *      responses:
    *          204:
    *             description: Delete success
    *          404:
    *             description: Not found peole
    */
    router.delete("/:id", peopleEndpoint.remove);

    /**
    * @swagger
    * /peoples/{id}:
    *   put:
    *      tags:
    *        - People
    *      parameters:
    *       - name: id
    *         in: path
    *         required: true
    *         type: integer
    *       - name: body
    *         in: body
    *         required: true
    *         schema:
    *          $ref: '#/paths/definitions/People'
    *      produces:
    *        - application/json
    *      responses:
    *          204:
    *             description: Update success
    *          409:
    *             description: Email already used per other people 
    *          404:
    *             description: Not found peole
    */
    router.put("/:id", peopleEndpoint.update);

    /**
     * @swagger
     * /peoples:
     *   get:
     *      tags:
     *        - People
     *      produces:
     *        - application/json
     *      responses:
     *          200:
     *             description: Return all peoples
     */
    router.get("/", peopleEndpoint.findAll);

    /**
     * @swagger
     * /peoples:
     *    post:
     *       tags:
     *         - People
     *       parameters:
     *        - name: body
     *          in: body
     *          required: true
     *          schema:
     *            $ref: '#/paths/definitions/People'
     *       produces:
     *         - application/json
     *       responses:
     *          201:
     *            description: Create success
     *          409:
     *            description: Email used per other people
     */
    router.post("/", peopleEndpoint.create);

    return router;
}