import { Context as BaseContext } from 'grammy'
import { DocumentType } from '@typegoose/typegoose'
import { Menu } from '@grammyjs/menu'
import { Roles } from '@/models/Types'
import { User } from '@/models/User'

class Context extends BaseContext {
  dbuser!: DocumentType<User>

  replyWithMenu = (menu: Menu<Context>) => {
    return this.reply(
      `Привет, <b>${this.from?.first_name}</b>\n\n• Ваш статус: <b>${
        this.dbuser.role
      }</b>${
        !this.dbuser.requested && this.dbuser.role === Roles.Guest
          ? '\n\nНажмите на кнопку ниже, чтобы отправить запрос администратору.'
          : ''
      }`,
      { parse_mode: 'HTML', reply_markup: menu }
    )
  }
}

export default Context
