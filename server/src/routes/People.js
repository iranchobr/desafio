const PeopleEndpoint = require("../endpoints/PeopleEndpoint");
const peopleEndpoint = new PeopleEndpoint();

module.exports = (router) => {

    router.get("/:id", peopleEndpoint.findById);
    router.delete("/:id", peopleEndpoint.remove);
    router.put("/:id", peopleEndpoint.update);
    router.get("/", peopleEndpoint.findAll);
    router.post("/", peopleEndpoint.create);
    
    return router;
}