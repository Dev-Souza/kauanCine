import * as Yup from 'yup';

export const LoginValidator = Yup.object().shape({
    email: Yup.string()
        .email("Email inválido")
        .required("O email é obrigatório"),
    senha: Yup.string()
        .required("A senha é obrigatória")
});