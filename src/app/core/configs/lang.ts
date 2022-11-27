export const currentLang = localStorage.getItem('uniq_lang') === 'ru' ? 'ru' : 'en';

export const trnsttValues = {
  en: {
    user: {
      login: 'You have successfully logged in',
      userExist: 'User with this login already exists',
      inCorrect: 'Your login or password is incorrect',
      wrong: 'Sothng go wrong',
      token: 'Token not valid',
    },
    search: {
      request: 'Bad search request',
    },
    board: {
      notValid: 'Board ID is not valid',
    },
    file: {
      size: 'File size must not exceed 100kB',
      type: 'File type must be png, jpg or jpeg',
    },
  },
  ru: {
    user: {
      login: 'Вы успешно вошли',
      userExist: 'Пользователь с таким логином уже есть',
      inCorrect: 'Ваш логин или пароль недействителен',
      wrong: 'Что-то пошло не так',
      token: 'Токен истек',
    },
    search: {
      request: 'Плохой поисковой запрос',
    },
    board: {
      notValid: 'Неверный номер доски',
    },
    file: {
      size: 'Размер файла должен быть не больше 100kB',
      type: 'Тип файла должен быть png, jpg или jpeg',
    },
  },
};
