import AccountService from '../services/account.service.js';

async function createAccount(req, res, next) {
  try {
    let account = req.body;

    if (!account.name || account.balance == null) {
      throw new Error('Name e Balance são obrigatórios');
    }

    account = await AccountService.createAccount(account);

    res.send(account);

    logger.info(`${req.method} ${req.baseUrl} - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
}

async function getAccounts(req, res, next) {
  try {
    res.send(await AccountService.getAccounts());

    logger.info(`${req.method} ${req.baseUrl} - ${JSON.stringify(data)}`);
  } catch (err) {
    next(err);
  }
}

async function getAccountById(req, res, next) {
  try {
    res.send(await AccountService.getAccountById(req.params.id));

    logger.info(`${req.method} ${req.baseUrl} - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function deleteAccount(req, res, next) {
  try {
    await AccountService.deleteAccount(req.params.id);
    res.end();

    logger.info(`${req.method} ${req.baseUrl}`);
  } catch (err) {
    next(err);
  }

  res.send(account);
}

async function updateAccount(req, res, next) {
  try {
    const account = req.body;

    if (!account.id || account.balance == null) {
      throw new Error('Id e Balance são obrigatórios');
    }

    res.send(await AccountService.updateAccount(account));

    logger.info(`${req.method} ${req.baseUrl} - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
}

async function updateBalance(req, res, next) {
  try {
    const account = req.body;

    if (!account.id || account.balance == null) {
      throw new Error('Id, Name e Balance são obrigatórios');
    }

    res.send(await AccountService.updateBalance(account));

    logger.info(`${req.method} ${req.baseUrl} - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createAccount,
  getAccounts,
  getAccountById,
  deleteAccount,
  updateAccount,
  updateBalance,
};
