import { MongoClient, Collection, ObjectId } from 'mongodb'

export const MongoHelper = {
  client: MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map: (data: any): any => {
    const { _id, ...rest } = data
    return { ...rest, id: _id.toHexString() }
  },

  postMap: (data: any): any => {
    const { _id, userId, ...rest } = data
    return { ...rest, id: _id.toHexString(), userId: userId.toHexString() }
  },

  objectId: (id: string): ObjectId => {
    return new ObjectId(id)
  }
}
