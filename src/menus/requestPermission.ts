import { Menu } from '@grammyjs/menu'
import { Roles, Username } from '@/models/Types'
import { UserModel } from '@/models/User'
import { givePermissionMenu, rolesButtons } from '@/menus/givePermission'
import Context from '@/models/Context'

const requestPermissionMenu = new Menu<Context>('requestPermission', {
  onMenuOutdated: false,
})

const dynamicLabel = (ctx: Context) =>
  `${ctx.dbuser.requested ? 'Запрос отправлен, ожидайте' : 'Отправить запрос'}`

const textRequestNotification = (
  id: number | undefined,
  username: Username | undefined,
  name: string | undefined,
  lastName: string | undefined,
  role: Roles,
  languageCode: string | undefined
) =>
  `Пользователь отправил вам запрос\n\n• ID: <b>${id}</b>\n• Username: <b>@${username}</b>\n• Fullname: <b>${
    name ?? ''
  } ${
    lastName ?? ''
  }</b>\n• Language: <b>${languageCode}</b>\n• Role: <b>${role}</b>`

const sendRequestPermission = async (ctx: Context) => {
  //   ctx.dbuser.requested = false
  //   void ctx.dbuser.save()
  // if (ctx.dbuser.requested) return
  const admin = await UserModel.findOne({ role: Roles.Admin })
  void ctx.api.sendMessage(
    admin?.id as number,
    textRequestNotification(
      ctx.from?.id,
      ctx.from?.username,
      ctx.from?.first_name,
      ctx.from?.last_name,
      ctx.dbuser.role,
      ctx.from?.language_code
    ),
    {
      parse_mode: 'HTML',
      reply_markup: givePermissionMenu.dynamic(
        rolesButtons(ctx.from?.id as number)
      ),
    }
  )
  ctx.dbuser.requested = true
  void ctx.dbuser.save()
}

requestPermissionMenu.text(dynamicLabel, sendRequestPermission)

export default requestPermissionMenu
