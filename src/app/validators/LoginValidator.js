import * as Yup from 'yup';

export const LoginValidator = Yup.object().shape({
    email: Yup.string()
        .required("O email é obrigatório"),
    senha: Yup.string()
        .required("A senha é obrigatória")
});