import { InjectedConnector } from '@web3-react/injected-connector'

export const NetworkContextName = 'NETWORK'

export const STORAGE_DEV_KEY =
  '03be10d1495f21f9efc8d198af492c6e00f3fc58b76d6f46efb5a534a29b83c9'

export const NETWORKS = {
  4: {
    id: 4,
    rpc: 'https://rinkeby.infura.io/v3/fc55ddb25b694fef8e2363f6b6c9341f',
    storage: '0xd2baDd65d97549EB8af9B83BcD74768c9ebaeC31',
  },
}

export const injected = new InjectedConnector({
  supportedChainIds: [...Object.keys(NETWORKS).map((id) => Number(id))],
})
