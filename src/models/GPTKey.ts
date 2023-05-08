import { Status } from '@/models/Types'
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class GPTKey {
  @prop({ required: true, index: true, unique: true })
  key!: number
  @prop({ required: true })
  status!: Status
}

export const KeyModel = getModelForClass(GPTKey)
