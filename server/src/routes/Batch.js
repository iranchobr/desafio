const BatchEndpoint = require("../endpoints/BatchEndpoint");
const batchEndpoint = new BatchEndpoint();

module.exports = (router) => {

    router.get("/:id", batchEndpoint.findById);
    router.delete("/:id", batchEndpoint.remove);
    router.put("/:id", batchEndpoint.update);
    router.get("/", batchEndpoint.findAll);
    router.post("/", batchEndpoint.create);
    
    return router;
}