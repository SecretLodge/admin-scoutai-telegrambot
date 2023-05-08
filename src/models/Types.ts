export enum Roles {
  Admin = 'admin',
  Moderator = 'moderator',
  Guest = 'guest',
}

export enum Status {
  Used = 'Работает',
  Waiting = 'Ждёт',
  Utilized = 'Закончился',
  incorrect = 'Не корректный',
}

export enum Commands {
  Start = '/start',
}

export type Username = string
