import { randomUUID } from 'node:crypto'

export abstract class Entity<Props> {
  public id: string
  public props: Props
  public createdAt: Date
  public updatedAt: Date

  constructor(props: Props) {
    this.id = randomUUID()
    this.props = props
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}
