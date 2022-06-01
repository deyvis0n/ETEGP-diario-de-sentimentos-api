import { FieldValidator } from '../../validation/protocols/field-validator'

export class EmailValidatorAdapter implements FieldValidator {
  isValid (email: string): boolean {
    const regex: RegExp = /^[a-zA-Z]{3,20}\.[a-zA-Z]{3,20}@aluno.educacao.pe.gov.br.com$/
    return regex.test(email)
  }
}
