import { BackendMethod, Context, Entity, Field, getEntityRef } from "remult";
import { v4 as v4uuid } from 'uuid';

@Entity<Tutorial>({
  key: 'tutorials',
  allowApiCrud: true,
  saving: tutorial => {
    if (tutorial.context.backend && getEntityRef(tutorial).isNew())
      tutorial.id = v4uuid();
  }
})
export default class Tutorial {
  @Field()
  id: string = '';
  @Field()
  title: string = '';
  @Field()
  description: string = '';
  @Field()
  published?: boolean = false;
  @BackendMethod({ allowed: true })
  static async removeAll(context?: Context) {
    let repo = context!.for(Tutorial);
    for await (const tutorial of repo.iterate()) {
      await repo.delete(tutorial);
    }
  }
  constructor(private context: Context) {

  }
}

 