import * as Yup from "yup";

const PagamentosValidator = Yup.object().shape({
    tipo_ingresso: Yup.array().of(
        Yup.string().oneOf(['INTEIRA', 'ESTUDANTE', 'MEIA'], 'Tipo de ingresso inválido')
    ).required('Por favor, selecione o tipo de ingresso para cada assento')
});

export default PagamentosValidator;