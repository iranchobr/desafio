export default ({
    FORM: {
        ANIMAL: [
            {
                field: "name",
                rules: [
                    {
                        validation: "isLength",
                        options: { min: 1 },
                        valueExpected: true,
                        messageValidation: "O campo nome é obrigatório!"
                    }
                ]
            },
            {
                field: "species",
                rules: [
                    {
                        validation: "isLength",
                        options: { min: 1 },
                        valueExpected: true,
                        messageValidation: "O campo especie é obrigatório!"
                    }
                ]
            },
            {
                field: "weight",
                rules: [
                    {
                        validation: "isLength",
                        options: { min: 1 },
                        valueExpected: true,
                        messageValidation: "O campo peso é obrigatório!"
                    }
                ]
            },
            {
                field: "date_birth",
                rules: [
                    {
                        validation: "isLength",
                        options: { min: 1 },
                        valueExpected: true,
                        messageValidation: "O campo data de nascimento é obrigatório!"
                    }
                ]
            },
            {
                field: "sex",
                rules: [
                    {
                        validation: "isLength",
                        options: { min: 1 },
                        valueExpected: true,
                        messageValidation: "O campo sexo é obrigatório!"
                    }
                ]
            },
            {
                field: "people_id",
                rules: [
                    {
                        validation: "isLength",
                        options: { min: 1 },
                        valueExpected: true,
                        messageValidation: "O campo pessoas é obrigatório!"
                    }
                ]
            },
            {
                field: "farm_id",
                rules: [
                    {
                        validation: "isLength",
                        options: { min: 1 },
                        valueExpected: true,
                        messageValidation: "O campo fazenda é obrigatório!"
                    }
                ]
            }
        ],
        FARM: [
            {
                field: "name",
                rules: [
                    {
                        validation: "isLength",
                        options: { min: 1 },
                        valueExpected: true,
                        messageValidation: "O campo nome é obrigatório!"
                    }
                ]
            }
        ],
        PEOPLE: [
            {
                field: "name",
                rules: [
                    {
                        validation: "isLength",
                        options: { min: 1 },
                        valueExpected: true,
                        messageValidation: "O campo nome é obrigatório!"
                    }
                ]
            },
            {
                field: "email",
                rules: [
                    {
                        validation: "isEmail",
                        options: {},
                        valueExpected: true,
                        messageValidation: "O campo email está inválido!"
                    }
                ]
            },
            {
                field: "endereco",
                rules: [
                    {
                        validation: "isLength",
                        options: { min: 1 },
                        valueExpected: true,
                        messageValidation: "O campo endereço é obrigatório!"
                    }
                ]
            },
            {
                field: "sexo",
                rules: [
                    {
                        validation: "isLength",
                        options: { min: 1 },
                        valueExpected: true,
                        messageValidation: "O campo sexo é obrigatório!"
                    }
                ]
            }
        ]
    }
})