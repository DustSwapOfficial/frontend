import { erc20_abi, factory_abi, router_abi } from "./abi";
import * as web3Utils from "web3-utils";
import { LINEA_ROUTER_ADDRESS } from "./chain";

export async function getSymbol(web3: any, token: any): Promise<any> {
  const contract = new web3.eth.Contract(erc20_abi, token);
  return contract.methods.symbol().call();
}

export async function getDecimals(web3: any, token: any): Promise<any> {
  const contract = new web3.eth.Contract(erc20_abi, token);
  return contract.methods.decimals().call();
}

export async function getBalanceOf(
  web3: any,
  token: any,
  account: any
): Promise<any> {
  const contract = new web3.eth.Contract(erc20_abi, token);
  const balance = await contract.methods.balanceOf(account).call();
  return balance;
}

export async function getBalanceEth(web3: any, account: any): Promise<any> {
  const balance = await web3.eth.getBalance(account);
  return balance;
}

export function tokenAmountToWei(amount: any, decimals: any) {
  let number = (
    (amount?.toString() || 0) *
    10 ** (decimals?.toString() || 18)
  ).toLocaleString("fullwide", {
    useGrouping: false,
  });
  return web3Utils.toBigInt(number || 0);
}

export function weiToTokenAmount(amount: any, decimals: any) {
  let number = (
    (amount?.toString() || 0) /
    10 ** (decimals?.toString() || 0)
  ).toLocaleString("fullwide", {
    useGrouping: false,
  });
  // console.error(amount, number, decimals);
  return number;
}

export async function approveTokenTransfer(
  web3: any,
  token: any,
  owner: any,
  spender: any,
  balance: any
): Promise<any> {
  // console.error(token, owner, spender, balance);
  const contract = new web3.eth.Contract(erc20_abi, token);
  const gasPrice = await web3.eth.getGasPrice();
  if (!balance) {
    balance = await getBalanceOf(web3, token, owner);
  } else {
    balance = tokenAmountToWei(balance, await getDecimals(web3, token));
  }
  const params = [spender, balance] as const;
  console.error("params -> ", params);
  // @ts-ignore
  const method = contract.methods.approve(...params);
  const estimateGas = await method.estimateGas({
    from: owner,
    type: 2,
  });
  const tx = await method.send({
    from: owner,
    gas: estimateGas.toString(),
    maxPriorityFeePerGas: Math.round(+gasPrice.toString() * 1.01).toString(),
    maxFeePerGas: Math.round(+gasPrice.toString() * 1.01).toString(),
    type: 2,
  });
  return tx;
}

export async function addLiquidity(
  web3: any,
  token0: any,
  token1: any,
  token0Amount: any,
  token1Amount: any,
  owner: any
) {
  const contract = new web3.eth.Contract(router_abi, LINEA_ROUTER_ADDRESS);
  const gasPrice = await web3.eth.getGasPrice();
  const params = [
    token0,
    token1,
    tokenAmountToWei(token0Amount, await getDecimals(web3, token0)),
    tokenAmountToWei(token1Amount, await getDecimals(web3, token1)),
    0,
    0,
    owner,
    Math.round(Date.now() / 1000) + 60 * 20,
  ] as const;
  // @ts-ignore
  const method = contract.methods.addLiquidity(...params);
  const estimateGas = await method.estimateGas({
    from: owner,
    type: 2,
  });
  const tx = await method.send({
    from: owner,
    gas: estimateGas,
    maxPriorityFeePerGas: Math.round(+gasPrice.toString() * 1.01),
    maxFeePerGas: Math.round(+gasPrice.toString() * 1.01),
    type: 2,
  });
  return tx;
}

export async function addLiquidityEth(
  web3: any,
  token0: any,
  token0Amount: any,
  ethAmount: any,
  owner: any
) {
  const contract = new web3.eth.Contract(router_abi, LINEA_ROUTER_ADDRESS);
  const gasPrice = await web3.eth.getGasPrice();
  const params = [
    token0,
    tokenAmountToWei(token0Amount, await getDecimals(web3, token0)),
    0,
    0,
    owner,
    Math.round(Date.now() / 1000) + 60 * 20,
  ] as const;
  console.error(params);
  // @ts-ignore
  const method = contract.methods.addLiquidityETH(...params);
  const estimateGas = await method.estimateGas({
    from: owner,
    type: 2,
    value: web3.utils.toWei(ethAmount, "ether"),
  });
  const tx = await method.send({
    from: owner,
    gas: estimateGas,
    maxPriorityFeePerGas: Math.round(+gasPrice.toString() * 1.01),
    maxFeePerGas: Math.round(+gasPrice.toString() * 1.01),
    type: 2,
    value: web3.utils.toWei(ethAmount, "ether"),
  });
  return tx;
}

export async function swapExactTokensForETH(
  web3: any,
  token0: any,
  token0Amount: any,
  sender: any,
  receiver: any
) {
  const contract = new web3.eth.Contract(router_abi, LINEA_ROUTER_ADDRESS);
  const gasPrice = await web3.eth.getGasPrice();
  let token0Decimals = await getDecimals(web3, token0);
  const path = [token0, await getWeth(web3)];
  // @ts-ignore
  const amountsOut: any = await contract.methods
    // @ts-ignore
    .getAmountsOut(tokenAmountToWei(token0Amount, token0Decimals), path)
    .call();

  const params = [
    tokenAmountToWei(token0Amount, token0Decimals),
    amountsOut[amountsOut.length - 1],
    path,
    receiver,
    Math.round(Date.now() / 1000) + 60 * 20,
  ] as const;
  // @ts-ignore
  const method = contract.methods.swapExactTokensForETH(...params);
  const estimateGas = await method.estimateGas({
    from: sender,
    type: 2,
  });
  console.log("estimateGas -> ", estimateGas);
  const tx = await method.send({
    from: sender,
    gas: estimateGas,
    maxPriorityFeePerGas: Math.round(+gasPrice.toString() * 1.01),
    maxFeePerGas: Math.round(+gasPrice.toString() * 1.01),
    type: 2,
  });
  return tx;
}

export async function swapETHForExactTokens(
  web3: any,
  ethAmount: any,
  token1: any,
  sender: any,
  receiver: any
) {
  const contract = new web3.eth.Contract(router_abi, LINEA_ROUTER_ADDRESS);
  const gasPrice = await web3.eth.getGasPrice();
  const params = [
    web3.utils.toWei(ethAmount, "ether"),
    [await getWeth(web3), token1],
    receiver,
    Math.round(Date.now() / 1000) + 60 * 20,
  ] as const;
  // @ts-ignore
  const method = contract.methods.swapExactETHForTokens(...params);
  const estimateGas = await method.estimateGas({
    from: sender,
    type: 2,
    value: web3.utils.toWei(ethAmount, "ether"),
  });
  // console.error("estimateGas -> ", estimateGas);
  const tx = await method.send({
    from: sender,
    gas: estimateGas,
    maxPriorityFeePerGas: Math.round(+gasPrice.toString() * 1.01),
    maxFeePerGas: Math.round(+gasPrice.toString() * 1.01),
    type: 2,
    value: web3.utils.toWei(ethAmount, "ether"),
  });
  return tx;
}

export async function getPairAddress(web3: any, token0: any, token1: any) {
  const contract = new web3.eth.Contract(router_abi, LINEA_ROUTER_ADDRESS);
  const factoryAddress: any = await contract.methods.factory().call();
  const factoryContract = new web3.eth.Contract(factory_abi, factoryAddress);
  const pairAddress: any = await factoryContract.methods
    // @ts-ignore
    .getPair(token0, token1)
    .call();
  return pairAddress;
}

export async function getLiquidity(web3: any, token0: any, token1: any) {
  console.log(token0, token1);
  const pairAddress = await getPairAddress(web3, token0, token1);
  console.log(pairAddress);
  const pairContract = new web3.eth.Contract(erc20_abi, pairAddress);
  const liquidity = await pairContract.methods.totalSupply().call();
  return liquidity;
}

export async function getLiquidityOf(
  web3: any,
  token0: any,
  token1: any,
  owner: any
) {
  const pairAddress = await getPairAddress(web3, token0, token1);
  const pairContract = new web3.eth.Contract(erc20_abi, pairAddress);
  const liquidity = await pairContract.methods.balanceOf(owner).call();
  return liquidity;
}

export async function removeLiquidityETH(
  web3: any,
  token0: any,
  liquidity: any,
  owner: any
) {
  const contract = new web3.eth.Contract(router_abi, LINEA_ROUTER_ADDRESS);
  const gasPrice = await web3.eth.getGasPrice();

  const params = [
    token0,
    liquidity,
    `0`,
    `0`,
    owner,
    Math.round(Date.now() / 1000) + 60 * 20,
  ] as const;
  // @ts-ignore
  const method = contract.methods.removeLiquidityETH(...params);
  const estimateGas = await method.estimateGas({
    from: owner,
    type: 2,
  });
  // console.log("estimateGas -> ", estimateGas);
  const tx = await method.send({
    gas: estimateGas,
    maxPriorityFeePerGas: Math.round(+gasPrice.toString() * 1.01),
    maxFeePerGas: Math.round(+gasPrice.toString() * 1.01),
    type: 2,
  });
  return tx;
}

export async function getWeth(web3: any) {
  const contract = new web3.eth.Contract(router_abi, LINEA_ROUTER_ADDRESS);
  const weth = await contract.methods.WETH().call();
  return weth;
}

export async function getAmountsOut(web3: any, path: any, token0Amount: any) {
  console.log("LINEA_ROUTER_ADDRESS -> ", LINEA_ROUTER_ADDRESS);
  const contract = new web3.eth.Contract(router_abi, LINEA_ROUTER_ADDRESS);
  const amountsOut: any = await contract.methods
    // @ts-ignore
    .getAmountsOut(
      tokenAmountToWei(token0Amount, await getDecimals(web3, path[0])),
      path
    )
    .call();
  console.log("amountsOut -> ", amountsOut);
  return amountsOut;
}

export async function getAmountsIn(web3: any, path: any, token1Amount: any) {
  const contract = new web3.eth.Contract(router_abi, LINEA_ROUTER_ADDRESS);
  const amountsIn: any = await contract.methods
    // @ts-ignore
    .getAmountsIn(
      tokenAmountToWei(token1Amount, await getDecimals(web3, path[1])),
      path
    )
    .call();
  return amountsIn;
}

export async function swapExactTokensForTokens(
  web3: any,
  token0: any,
  token1: any,
  token0Amount: any,
  sender: any,
  receiver: any
) {
  const contract = new web3.eth.Contract(router_abi, LINEA_ROUTER_ADDRESS);
  const gasPrice = await web3.eth.getGasPrice();
  const token0AmountWei = tokenAmountToWei(
    token0Amount,
    await getDecimals(web3, token0)
  );
  const path = [token0, token1];
  // @ts-ignore
  const amountsOut: any = await contract.methods
    // @ts-ignore
    .getAmountsOut(token0AmountWei, path)
    .call();

  const params = [
    token0AmountWei,
    amountsOut[amountsOut.length - 1],
    path,
    receiver,
    Math.round(Date.now() / 1000) + 60 * 20,
  ] as const;
  // @ts-ignore
  const method = contract.methods.swapExactTokensForTokens(...params);
  const estimateGas = await method.estimateGas({
    from: sender,
    type: 2,
  });
  const tx = await method.send({
    from: sender,
    gas: estimateGas,
    maxPriorityFeePerGas: Math.round(+gasPrice.toString() * 1.01),
    maxFeePerGas: Math.round(+gasPrice.toString() * 1.01),
    type: 2,
  });
  return tx;
}

export async function removeLiquidity(
  web3: any,
  token0: any,
  token1: any,
  liquidity: any,
  owner: any
) {
  const contract = new web3.eth.Contract(router_abi, LINEA_ROUTER_ADDRESS);
  const gasPrice = await web3.eth.getGasPrice();

  const params = [
    token0,
    token1,
    liquidity,
    `0`,
    `0`,
    owner,
    Math.round(Date.now() / 1000) + 60 * 20,
  ] as const;
  // @ts-ignore
  const method = contract.methods.removeLiquidity(...params);
  const estimateGas = await method.estimateGas({
    from: owner,
    type: 2,
  });
  // console.log("estimateGas -> ", estimateGas);
  const tx = await method.send({
    gas: estimateGas,
    maxPriorityFeePerGas: Math.round(+gasPrice.toString() * 1.01),
    maxFeePerGas: Math.round(+gasPrice.toString() * 1.01),
    type: 2,
  });
  return tx;
}
