import { Hasher } from '../../../data/protocols/criptography/hasher'
import bcrypt from 'bcrypt'

export class BcrypterAdapter implements Hasher {
  async hash (value: string): Promise<string> {
    await bcrypt.hash(value, 12)
    return null
  }
}
