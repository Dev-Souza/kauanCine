import * as Yup from 'yup';

export const FilmesSchema = Yup.object().shape({
    titulo: Yup.string()
        .required("O título é obrigatório")
        .min(2, "O título deve ter pelo menos 2 caracteres"),
    data_lancamento: Yup.string()
        .required("A data de lançamento é obrigatória"),
    duracao: Yup.string()
        .required("A duração é obrigatória"),
    genero: Yup.string()
        .required("O gênero é obrigatório"),
    classificacao: Yup.string()
        .required("A classificação é obrigatória")
});