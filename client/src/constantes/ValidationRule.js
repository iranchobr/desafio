export default ({
    FORM: {
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