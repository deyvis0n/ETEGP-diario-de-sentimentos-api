# Loguin

## Sucesso

1. ✅ Recebe uma requisição POST na rota /api/login
2. ✅ Valida os campos obrigatórios email e password
3. 🔲 Valida se o campo email é valido
4. ✅ Busca o usuario do email fornecido
5. ✅ Gera um token de acesso utilizando o id do usuario
6. ✅ Atualiza o token de acesso do usuario
10. 🔲 Retorna 200 com o token de acesso e o nome do usuário

## Falha

1. ✅ Retorna erro 404 se a API não existir
2. ✅ Retorna erro 400 se email e password não forem fornecidos pelo usuario
4. 🔲 Retorna erro 400 se o campo email for um e-mail invalido
5. ✅ Retorna erro 401 se não localizar o usuario fornecido
6. ✅ Retorna erro 500 se der erro ao tentar localizar o usuario
7. ✅ Retorna erro 500 se der erro ao tentar comparar os hash
8. ✅ Retorna erro 500 se der erro ao tentar gerar o token
9. ✅ Retorna erro 500 se der erro ao tentar atualizar o usuario com o token de acesso gerado