import * as yup from 'yup';

export const profileValidationSchema = yup.object({
  fullName: yup
    .string()
    .required('Введите имя!')
    .min(2, 'Минимальная длина имени - 2 символа!'),
  email: yup.string().required('Введите email!').email('Неверный формат!'),
});
