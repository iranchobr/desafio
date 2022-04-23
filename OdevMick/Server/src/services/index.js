export const deleteInstanceInDb = async (id,Model) => { 
    const result = await Model.destroy({where:{id:id}});
    if(result){
        return res(`${Model.name} deleted successfully!`,200);
    }
    return res(`${Model.name} not found!`,404);
};

const res = (message,status) => {
    return {"message": message, "status": status};
};
