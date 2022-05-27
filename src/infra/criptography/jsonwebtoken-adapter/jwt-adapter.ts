import jwt from 'jsonwebtoken'
import { Encrypter } from '../../../data/protocols/criptography/encrypter'

export class JsonWebTokenAdapter implements Encrypter {
  constructor (private readonly secret: string) {}

  async generate (value: string): Promise<string> {
    await jwt.sign({ id: value }, this.secret)
    return null
  }
}
