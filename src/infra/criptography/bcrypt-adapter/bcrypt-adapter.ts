import { Hasher } from '../../../data/protocols/criptography/hasher'
import { HasherCompare } from '../../../data/protocols/criptography/hasher-compare'
import bcrypt from 'bcrypt'

export class BcrypterAdapter implements Hasher, HasherCompare {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    await bcrypt.compare(value, hash)
    return null
  }
}
