import { NextFunction } from 'grammy'
import { findOrCreateUser } from '@/models/User'
import Context from '@/models/Context'

export default async function attachUser(ctx: Context, next: NextFunction) {
  if (!ctx.from) {
    throw new Error('No from field found')
  }
  ctx.dbuser = await findOrCreateUser(ctx.from.id, ctx.from.username)
  if (!ctx.dbuser) {
    throw new Error('User not found')
  }
  return next()
}
