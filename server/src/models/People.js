module.exports = (sequelize, DataTypes) => {
    const People = sequelize.define('Peoples', {
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
        email: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "The field email is required!"
                },
                isEmail: {
                    msg: "The field email is invalid!"
                }
            }
        },
        address: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "The field address is required!"
                }
            }
        },
        sex: {
            type: DataTypes.STRING(1),
            validate: {
                notEmpty: {
                    msg: "The field sex is required!"
                }
            }
        },
        ic_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    });

    return People;
}