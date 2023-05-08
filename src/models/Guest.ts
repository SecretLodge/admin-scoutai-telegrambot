import { Commands } from '@/models/Types'
import Context from '@/models/Context'
import requestPermission from '@/menus/requestPermission'

class Guest {
  protected ctx: Context

  public constructor(ctx: Context) {
    this.ctx = ctx
    this.commandSelection()
  }

  private commandSelection() {
    switch (this.ctx.message?.text) {
      case Commands.Start:
        this.onStart()
    }
  }

  protected onStart() {
    void this.ctx.replyWithMenu(requestPermission)
  }
}

export default Guest
