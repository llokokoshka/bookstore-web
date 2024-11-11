import * as yup from 'yup';

export const loginValidationSchema = yup.object({
  email: yup.string().required('Введите email!').email('Неверный формат!'),
  password: yup
    .string()
    .required('Введите пароль!')
    .min(5, 'Минимальная длина пароля - 6 символов!'),
});
