module.exports = (sequelize, DataTypes) => {
    const Farm = sequelize.define('Farms', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "The field name is required!"
                }
            }
        },
    });

    return Farm;
}