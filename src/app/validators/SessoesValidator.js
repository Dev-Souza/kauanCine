import * as Yup from 'yup';

export const SessoesValidator = Yup.object().shape({
    horario_sessao: Yup.string()
        .required('O horário da sessão é obrigatório'),
    data_sessao: Yup.date()
        .required('A data da sessão é obrigatória')
        .nullable(),
    filme: Yup.string()
        .required('O filme é obrigatório'),
    sala: Yup.string()
        .required('A sala é obrigatória')
});