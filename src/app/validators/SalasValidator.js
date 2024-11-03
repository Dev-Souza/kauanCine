import * as Yup from 'yup';

export const SalasValidator = Yup.object().shape({
    nome: Yup.string()
        .required('O nome da sala é obrigatório')
        .min(3, 'O nome deve ter pelo menos 3 caracteres'),
    tipo_sala: Yup.string()
        .required('O tipo da sala é obrigatório')
});