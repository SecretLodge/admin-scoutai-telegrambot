import 'module-alias/register'
import 'reflect-metadata'
import 'source-map-support/register'

import { givePermissionMenu } from '@/menus/givePermission'
import { ignoreOld, sequentialize } from 'grammy-middlewares'
import { run } from '@grammyjs/runner'
import RolesController from '@/models/RolesController'
import attachUser from '@/middlewares/attachUser'
import bot from '@/helpers/bot'
import requestPermission from '@/menus/requestPermission'
import startMongo from '@/helpers/startMongo'

async function runApp() {
  console.log('Starting app...')
  await startMongo()
  console.log('Mongo connected')
  //Midlewares
  bot
    .use(sequentialize())
    .use(ignoreOld())
    .use(attachUser)
    .use(givePermissionMenu)
    .use(requestPermission)
  //Commands
  bot.command('start', (ctx) => new RolesController(ctx))
  bot.catch(console.error)
  await bot.init()
  run(bot)
  console.info(`Bot ${bot.botInfo.username} is up and running`)
}

void runApp()
