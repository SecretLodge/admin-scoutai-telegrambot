import { Roles, Username } from '@/models/Types'
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @prop({ required: true, index: true, unique: true })
  id!: number
  @prop({ required: true, default: Roles.Guest })
  role!: Roles
  @prop({ required: false })
  usernames?: Username[]
  @prop({ required: true, default: false })
  requested!: boolean
}

export const UserModel = getModelForClass(User)

export async function findOrCreateUser(id: number, username?: Username) {
  const user = await UserModel.findOneAndUpdate(
    { id },
    {},
    { upsert: true, new: true }
  )
  if (!username || user.usernames?.includes(username as string)) return user
  return UserModel.findOneAndUpdate(
    { id },
    { $push: { usernames: username } },
    { upsert: true, new: true }
  )
}
