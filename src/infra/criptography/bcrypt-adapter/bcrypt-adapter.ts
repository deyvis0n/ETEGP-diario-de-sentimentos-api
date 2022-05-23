import { Hasher } from '../../../data/protocols/criptography/hasher'
import bcrypt from 'bcrypt'

export class BcrypterAdapter implements Hasher {
  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, 12)
    return hash
  }
}
