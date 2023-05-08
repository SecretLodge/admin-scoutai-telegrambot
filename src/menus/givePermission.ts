import { Menu, MenuRange } from '@grammyjs/menu'
import { Roles } from '@/models/Types'
import { UserModel } from '@/models/User'
import Context from '@/models/Context'

export const givePermissionMenu = new Menu<Context>(
  `givePermission-${Math.random() * 10 * 1000 * 1000 * 1000}`
)

export const rolesButtons =
  (id: number) => (ctx: Context, range: MenuRange<Context>) => {
    Object.values(Roles).forEach((role) => {
      range
        .text(role, async (ctx: Context) => {
          await UserModel.findOneAndUpdate({ id }, { role })
          void ctx.api.sendMessage(id, `• Вам выдали роль: <b>${role}</b>`, {
            parse_mode: 'HTML',
          })
        })
        .row()
    })
  }
