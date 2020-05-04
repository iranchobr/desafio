module.exports = (sequelize, DataTypes) => {
    const batchsAnimal = sequelize.define('BatchsAnimals', {
        batch_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
          }, 
          animal_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: "Is Needed informate animal!"
                }
            }
          }, 
          date_output: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "The field date output is required!"
                }
            }
          },
          date_input: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "The field date input is required!"
                }
            }
          },
          date_last_movimentation: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "The field date last movimentation is required!"
                }
            }
          },
          ic_animal: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "The field ic animal is required!"
                }
            }
          }
    });

    return batchsAnimal;
}