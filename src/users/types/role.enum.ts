// Добавление книги 1
// Обновление информации о книге 1
// Удаление книги 1
// Просмотр своего профиля 1
// Изменение ролей 1

const BOOK_CREATE = 16; // 10000
const BOOK_UPDATE = 8; // 01000
const BOOK_DELETE = 4; // 00100
const USERS_VIEW = 2; // 00010
const ACCESS_ADMIN = 1; // 00001

export enum RoleTypes {
  Admin = ACCESS_ADMIN | BOOK_CREATE | BOOK_UPDATE | BOOK_DELETE | USERS_VIEW, // 31
  User = USERS_VIEW,
}
