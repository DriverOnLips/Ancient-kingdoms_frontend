export const nameMatching = (name: string): string =>
  name === ''
    ? name
    : name === 'kingdom'
    ? 'Княжества'
    : name === 'application'
    ? 'Записи'
    : name === 'login'
    ? 'Вход'
    : name === 'signup'
    ? 'Регистрация'
    : name === 'application_moderator'
    ? 'Записи пользователей'
    : name === 'kingdom_moderator'
    ? 'Таблица княжеств'
    : name === 'kingdom_add'
    ? 'Добавление княжества'
    : name === 'kingdom_edit'
    ? 'Изменение княжества'
    : name;
    