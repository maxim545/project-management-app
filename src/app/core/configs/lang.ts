export const currentLang = localStorage.getItem('uniq_lang') === 'ru' ? 'ru' : 'en';

export const trnsttValues = {
  en: {
    user: {
      login: 'You have successfully logged in',
    },
  },
  ru: {
    user: {
      login: 'Вы успешно вошли',
    },
  },
};
