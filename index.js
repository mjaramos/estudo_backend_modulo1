import express from 'express';
import winston from 'winston';
import accountsRouter from './routes/account.routes.js';
import { promises as fs } from 'fs';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocumento } from './doc.js';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import AccountService from './services/account.service.js';

const { readFile, writeFile } = fs;

global.fileName = 'accounts.json';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}:  ${message}`;
});

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'my-bank-api.log',
    }),
  ],
  format: combine(label({ label: 'my-bank-api' }), timestamp(), myFormat),
});

const schema = buildSchema(`
  type Account {
    id: Int
    name: String
    balance: Float
  }
  input AccountInput {
    id: Int
    name: String
    balance: Float
  }
  type Query {
    getAccounts: [Account]
    getAccountById(id: Int): Account
  }
  type Mutation {
    createAccount(account: AccountInput): Account
    deleteAccount(id: Int): Boolean
    updateAccount(account: AccountInput): Account
  }
`);

const root = {
  getAccounts: () => AccountService.getAccounts(),
  getAccountById(args) {
    return AccountService.getAccountById(args.id);
  },
  createAccount({ account }) {
    return AccountService.createAccount(account);
  },
  deleteAccount(args) {
    AccountService.deleteAccount(args.id);
  },
  updateAccount({ account }) {
    return AccountService.updateAccount(account);
  },
};

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocumento));
app.use('/account', accountsRouter);

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(3001, async () => {
  try {
    await readFile('accounts.json');
    logger.info('API Started');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile('accounts.json', JSON.stringify(initialJson))
      .then(() => {
        logger.info('API Started and File Created.');
      })
      .catch(err => {
        logger.error(err);
      });
  }
});
