import { GraphQLInt, GraphQLList } from 'graphql';
import Account from '../types/Account.js';
import AccountResolver from '../resolvers/account.resolver.js';

const accountQueries = {
  getAccounts: {
    type: new GraphQLList(Account),
    resolve: () => AccountResolver.getAccounts(),
  },
  getAccountById: {
    type: Account,
    args: {
      id: {
        name: 'id',
        type: GraphQLInt,
      },
    },
    resolve: (_, args) => AccountResolver.getAccountById(args.id),
  },
};

export default accountQueries;
