import * as Yup from "yup";

export const UsersValidator = Yup.object().shape({
    nome: Yup.string()
        .required("O nome é obrigatório")
        .min(3, "O nome deve ter pelo menos 3 caracteres"),
    data_nascimento: Yup.date()
        .required("A data de nascimento é obrigatória")
        .max(new Date(), "A data de nascimento deve ser no passado")
        .test(
            "idade-minima",
            "Você precisa ter pelo menos 18 anos",
            function (value) {
                if (!value) return false;
                const hoje = new Date();
                const dataNascimento = new Date(value);
                const idade = hoje.getFullYear() - dataNascimento.getFullYear();
                const ajusteMes = hoje.getMonth() - dataNascimento.getMonth() < 0 || 
                                  (hoje.getMonth() === dataNascimento.getMonth() && hoje.getDate() < dataNascimento.getDate());
                return idade - (ajusteMes ? 1 : 0) >= 18;
            }
        ),
    cpf: Yup.string()
        .required("O CPF é obrigatório")
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
    celular: Yup.string()
        .required("O celular é obrigatório")
        .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Celular inválido"),
    email: Yup.string()
        .email("Email inválido")
        .required("O email é obrigatório"),
    senha: Yup.string()
        .required("A senha é obrigatória")
        .min(6, "A senha deve ter pelo menos 6 caracteres")
});