import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import AccountMutation from './mutations/account.mutation.js';
import AccountQuery from './queries/account.query.js';

// const schema = buildSchema(`
//   type Account {
//     id: Int
//     name: String
//     balance: Float
//   }
//   input AccountInput {
//     id: Int
//     name: String
//     balance: Float
//   }
//   type Query {
//     getAccounts: [Account]
//     getAccountById(id: Int): Account
//   }
//   type Mutation {
//     createAccount(account: AccountInput): Account
//     deleteAccount(id: Int): Boolean
//     updateAccount(account: AccountInput): Account
//   }
// `);

// const root = {
//   getAccounts: () => AccountService.getAccounts(),
//   getAccountById(args) {
//     return AccountService.getAccountById(args.id);
//   },
//   createAccount({ account }) {
//     return AccountService.createAccount(account);
//   },
//   deleteAccount(args) {
//     AccountService.deleteAccount(args.id);
//   },
//   updateAccount({ account }) {
//     return AccountService.updateAccount(account);
//   },
// };

const Schema = new GraphQLSchema({
  types: null,
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...AccountQuery,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
      ...AccountMutation,
    },
  }),
});

export default Schema;
