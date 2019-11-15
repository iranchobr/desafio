const AnimalEndpoint = require("../endpoints/AnimalEndpoint");
const animalEndpoint = new AnimalEndpoint();

module.exports = (router) => {

    router.get("/:id", animalEndpoint.findById);
    router.delete("/:id", animalEndpoint.remove);
    router.put("/:id", animalEndpoint.update);
    router.get("/", animalEndpoint.findAll);
    router.post("/", animalEndpoint.create);
    
    return router;
}