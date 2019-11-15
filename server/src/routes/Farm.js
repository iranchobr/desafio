const FarmEndpoint = require("../endpoints/FarmEndpoint");
const farmEndpoint = new FarmEndpoint();

module.exports = (router) => {

    router.get("/:id", farmEndpoint.findById);
    router.delete("/:id", farmEndpoint.remove);
    router.put("/:id", farmEndpoint.update);
    router.get("/", farmEndpoint.findAll);
    router.post("/", farmEndpoint.create);
    
    return router;
}