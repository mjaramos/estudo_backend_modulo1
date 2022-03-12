Testar as chamadas do GraphQL
http://localhost:3001/graphql

Se chamar a mutation, não pode chamar as queries.
mutation {
  createAccount(account: {name: "Ramos", balance: 1895685.76}) {
    id
    name
    balance
  }
  updateAccount(account : {
    id: 10,
    name: "Adélia"
    balance: 1895685.76
  }) {
    id
    name
    balance
  }
  deleteAccount(id: 7)
}

{
  getAccountById(id: 8) {
   id,
   balance,
   name
  }
  getAccounts {
    id,
    name,
    balance
  }
}