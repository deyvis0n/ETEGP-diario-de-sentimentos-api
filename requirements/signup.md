# Cadastro

## Sucesso

1. ✅ Recebe uma requisição POST na rota /api/signup
2. ✅ Valida os campos obrigatórios name, email, password, passwordConfirmation
3. ✅ Valida se os campos password e passwordConfirmation são iguais
4. ✅ Valida se o campo email possui um formato de e-mail válido
5. ✅ Valida se a senha possui um formato de senha válido
6. ✅ Valida se já existe um usuário cadastrado com o email fornecido
7. ✅ Gera uma senha criptografada (tipo hash)
8. ✅ Cria uma conta para o usuário com os dados informados, substituido a senha fornecida pela senha criptografada
9. ✅ Gere um token de acesso a partir do ID do usuário
10. ✅ Atualiza os dados do usuario com o token de acesso gerado
11. ✅ Retorna 200 com o token de acesso e o nome do usuário

## Falha

1. ✅ Retorna erro 404 se a API não existir
2. ✅ Retorna erro 400 se name, email, password, ou passwordConfirmation não forem fornecidos pelo usuario
3. ✅ Retorna erro 400 se password e passwordConfirmation não forem iguais
4. ✅ Retorna erro 400 se o campo email for um e-mail invalido
5. ✅ Retorna erro 400 se a senha possuir um formato invalido
6. ✅ Retorna erro 403 se o email fornecido já estiver em uso
7. ✅ Retorna erro 500 se der erro ao tentar gerar um senha criptografada
8. ✅ Retorna erro 500 se der erro ao tentar criar a conta do usuário
9. ✅ Retorna erro 500 se der erro ao gerar o token de acesso
10. ✅ Retorna erro 500 se der erro ao tentar atualizar o usuário com o token de acesso gerado