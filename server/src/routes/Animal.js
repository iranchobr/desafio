const AnimalEndpoint = require("../endpoints/AnimalEndpoint");
const animalEndpoint = new AnimalEndpoint();

module.exports = (router) => {

    /**
     * @swagger
     * definitions:
     *  Animal:
     *      properties:
     *        people_id:
     *           type: integer
     *        farm_id:
     *           type: integer
     *        name:
     *           type: string
     *        species:
     *           type: string
     *        sex:
     *           type: string
     *        weight:
     *           type: number
     *        date_birth:
     *           type: string
     */

    /**
     * @swagger
     * /animals/{id}:
     *   get:
     *     tags:
     *       - Animal
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         type: integer
     *     produces:
     *       - application/json
     *     responses:
     *        200:
     *          description: Return one animal
     *        404:
     *          description: Not found animal
     */
    router.get("/:id", animalEndpoint.findById);

    /**
    * @swagger
    * /animals/{id}:
    *   delete:
    *     tags:
    *       - Animal
    *     parameters:
    *       - name: id
    *         in: path
    *         required: true
    *         type: integer
    *     produces:
    *       - application/json
    *     responses:
    *        204:
    *          description: Delete success
    *        404:
    *          description: Not found animal
    */
    router.delete("/:id", animalEndpoint.remove);

    /**
    * @swagger
    * /animals/{id}:
    *   put:
    *     tags:
    *       - Animal
    *     parameters:
    *       - name: id
    *         in: path
    *         required: true
    *         type: integer
    *       - name: body
    *         in: body
    *         required: true
    *         type: object
    *         schema:
    *          $ref: "#/paths/definitions/Animal"
    *     produces:
    *       - application/json
    *     responses:
    *        204:
    *          description: Update success
    *        404:
    *          description: Not found register
    */
    router.put("/:id", animalEndpoint.update);

   /**
    * @swagger
    * /animals:
    *   get:
    *     tags:
    *       - Animal
    *     produces:
    *       - application/json
    *     responses:
    *        200:
    *          description: Return all animals
    */
    router.get("/", animalEndpoint.findAll);

    /**
     * @swagger
     * /animals:
     *   post:
     *     tags:
     *       - Animal
     *     parameters:
     *      - name: body
     *        in: body
     *        required: true
     *        schema:
     *          $ref: "#/paths/definitions/Animal"
     *     produces:
     *       - application/json
     *     responses:
     *        201:
     *          description: Created success
     *        400:
     *          description: Datas invalid
     *        404:
     *          description: The values of parameters people_id or farm_id can invalids
     */
    router.post("/", animalEndpoint.create);

    return router;
}