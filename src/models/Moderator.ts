import Context from '@/models/Context'
import Guest from '@/models/Guest'

class Moderator extends Guest {
  constructor(ctx: Context) {
    super(ctx)
  }

  protected onStart() {
    //void this.ctx.replyWithMenu(GPTAPIKeysMenu)
  }
}

export default Moderator
