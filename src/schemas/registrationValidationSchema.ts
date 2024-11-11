import * as yup from 'yup';

export const registrationValidationSchema = yup.object({
  email: yup.string().required('Введите email!').email('Неверный формат!'),
  password: yup
    .string()
    .required('Введите пароль!')
    .min(5, 'Минимальная длина пароля - 6 символов!'),
  passwordRep: yup
    .string()
    .oneOf([yup.ref('password'), 'Пароли не совпадают!'])
    .required('Повторите пароль!'),
});
