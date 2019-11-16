module.exports = (sequelize, DataTypes) => {
    const batchs = sequelize.define('Batchs', {
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
        description: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "The field description is required!"
                }
            }
        }
    });

    return batchs;
}