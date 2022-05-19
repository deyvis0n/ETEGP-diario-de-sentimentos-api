# Cadastro

## Sucesso

1. 🔲 Recebe uma requisição POST na rota /api/signup
2. ✅ Valida os campos obrigatórios name, password, passwordConfirmation
3. ✅ Valida se os campos password e passwordConfirmation são iguais
4. 🔲 Valida se o campo email possui um formato de e-mail válido
5. 🔲 Valida se já existe um usuário cadastrado com o email fornecido
6. 🔲 gera uma senha criptografada (tipo hash)
7. 🔲 Cria uma conta para o usuário com os dados informados, substituido a senha fornecida pela senha criptografada
8. 🔲 Gera um token de acesso a partir do ID do usuário
9. 🔲 Atualiza os dados do usuario com o token de acesso gerado
10. 🔲 Retorna 200 com o token de acesso e o nome do usuário

## Falha

1. 🔲 Retorna erro 404 se a API não existir
2. ✅ Retorna erro 400 se name, email, password, ou passwordConfirmation não forem fornecidos pelo usuario
3. ✅ Retorna erro 400 se password e passwordConfirmation não forem iguais
4. 🔲 Retorna erro 400 se o campo email for um e-mail invalido
5. 🔲 Retorna erro 400 se o email fornecido já estiver em uso
6. 🔲 Retorna erro 500 se der erro ao tentar gerar um senha criptografada
7. 🔲 Retorna erro 500 se der erro ao tentar criar a conta do usuário
8. 🔲 Retorna erro 500 se der erro ao gerar o token de acesso
9. 🔲 Retorna erro 500 se der erro ao tentar atualizar o usuário com o token de acesso gerado