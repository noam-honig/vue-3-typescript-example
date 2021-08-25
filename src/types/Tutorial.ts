import { BackendMethod, Remult, Entity, Field, IdEntity } from "remult";

@Entity<Tutorial>({
  key: 'tutorials',
  allowApiCrud: true
})
export default class Tutorial extends IdEntity {
  @Field()
  title: string = '';
  @Field()
  description: string = '';
  @Field()
  published?: boolean = false;
  @BackendMethod({ allowed: true })
  static async removeAll(remult?: Remult) {
    let repo = remult!.repo(Tutorial);
    for await (const tutorial of repo.iterate()) {
      await repo.delete(tutorial);
    }
  }
}

