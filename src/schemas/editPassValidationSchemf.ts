import * as yup from 'yup';

export const editPassValidationSchema = yup.object({
  password: yup
    .string()
    .required('Введите пароль!')
    .min(6, 'Минимальная длина пароля - 6 символов!'),
  passwordNew: yup
    .string()
    .notOneOf(
      [yup.ref('password')],
      'Новый пароль не должен совпадать со старым!'
    )
    .required('Введите пароль!')
    .min(6, 'Минимальная длина пароля - 6 символов!'),
  passwordRep: yup
    .string()
    .oneOf([yup.ref('passwordNew'), 'Пароли не совпадают!'])
    .required('Повторите пароль!'),
});
