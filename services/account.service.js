import AccountRepository from '../repositories/account.repository.js';

async function createAccount(account) {
  return await AccountRepository.insertAccount(account);
}

async function getAccounts() {
  return await AccountRepository.getAccounts();
}

async function getAccountById(id) {
  return await AccountRepository.getAccountById(id);
}

async function deleteAccount(id) {
  await AccountRepository.deleteAccount(id);
}

async function updateAccount(account) {
  return await AccountRepository.updateAccount(account);
}

async function updateBalance(account) {
  const acc = await AccountRepository.getAccountById(account.id);
  acc.balance = account.balance;

  return await AccountRepository.updateAccount(acc);

  // const data = JSON.parse(await readFile(global.fileName));
  // const index = data.accounts.findIndex(a => a.id === account.id);

  // if (index === -1) {
  //   throw new Error('Registro não encontrado');
  // }

  // data.accounts[index].balance = account.balance;

  // await writeFile(global.fileName, JSON.stringify(data, null, 2));

  //return data.accounts[index];
}

export default {
  createAccount,
  getAccounts,
  getAccountById,
  deleteAccount,
  updateAccount,
  updateBalance,
};
