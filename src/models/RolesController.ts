import { Roles } from '@/models/Types'
import Admin from '@/models/Admin'
import Context from '@/models/Context'
import Guest from '@/models/Guest'
import Moderator from '@/models/Moderator'

class RolesController {
  public constructor(ctx: Context) {
    this.roleSelection(ctx)
  }

  private roleSelection(ctx: Context) {
    switch (ctx.dbuser.role) {
      case Roles.Guest:
        return new Guest(ctx)
      case Roles.Moderator:
        return new Moderator(ctx)
      case Roles.Admin:
        return new Admin(ctx)
    }
  }
}

export default RolesController
