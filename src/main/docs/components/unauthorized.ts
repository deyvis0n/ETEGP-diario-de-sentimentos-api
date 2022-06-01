export const unauthorized = {
  description: 'Credenciais de autenticação invalidas',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
