module.exports = (sequelize, DataTypes) => {
    const Animals = sequelize.define('Animals', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        people_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: {
                    msg: "Needed informate people."
                }
            }
        },
        farm_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: {
                    msg: "Needed informate farm."
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "The field name is required."
                }
            }
        },
        species: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "The field species is required."
                }
            }
        },
        sex: {
            type: DataTypes.STRING(1),
            validate: {
                notEmpty: {
                    msg: "The field sex is required."
                }
            }
        },
        weight: {
            type: DataTypes.DECIMAL(7, 2),
            validate: {
                notEmpty: {
                    msg: "The field weight is required."
                }
            }
        },
        date_birth: {
            type: DataTypes.DATE,
            validate: {
                notEmpty: {
                    msg: "The field date birth is required."
                }
            }
        }
    });

    return Animals;
}