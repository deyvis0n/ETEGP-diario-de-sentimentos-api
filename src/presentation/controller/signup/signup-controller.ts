export class SignUpController {
  handle (httpRquest: any): any {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRquest.body[field]) {
        return { statusCode: 400 }
      }
    }
  }
}
