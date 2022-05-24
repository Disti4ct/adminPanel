import Web3 from 'web3'
import StorageBuild from './constants/storage.json'
import { ZERO_ADDRESS } from './constants'
import { log } from './utils'

export type Data = { [k: string]: any }

export default class Storage {
  address: string
  library: any
  instance: any
  signerInstance: any

  constructor({
    address,
    rpc,
    library,
  }: {
    address: string
    rpc: string
    library: any
  }) {
    // For the requests that don't change a blockchain state.
    // We can init it and use from any network
    const web3 = new Web3(rpc)
    // For the requests that change the state.
    // It works only when we're on the provider network during the changes.
    const signerWeb3 = new Web3(library?.provider || '')

    this.address = address
    this.library = library
    this.instance = new web3.eth.Contract(StorageBuild.abi as any, address)
    this.signerInstance = new signerWeb3.eth.Contract(
      StorageBuild.abi as any,
      address
    )
  }

  async allKeys() {
    try {
      return await this.instance.methods.allKeys().call()
    } catch (error) {
      log({ title: 'Storage: allKeys()', value: error, color: 'red' })
      throw error
    }
  }

  async allData() {
    try {
      return await this.instance.methods.allKeysData().call()
    } catch (error) {
      log({ title: 'Storage: allData()', value: error, color: 'red' })
      throw error
    }
  }

  async get(key: string) {
    try {
      const { info, owner } = await this.instance.methods.getData(key).call()

      return {
        data: info ? JSON.parse(info || '{}') : info,
        owner: owner && owner.toLowerCase() !== ZERO_ADDRESS ? owner : '',
      }
    } catch (error) {
      log({ title: 'Storage: get()', value: error, color: 'red' })
      throw error
    }
  }

  async set({
    key,
    data,
    owner,
    onHash,
    onReceipt,
  }: {
    key: string
    data: Data
    owner: string
    onHash?: (hash: string) => void
    onReceipt?: (receipt: any) => void
  }) {
    try {
      const { data: sourceData, owner: sourceOwner } = await this.get(key)

      const newData = this.mergeData({
        oldData: sourceData,
        newData: data,
      })

      return new Promise(async (resolve, reject) => {
        this.signerInstance.methods
          .setKeyData(key, {
            owner: sourceOwner || owner,
            info: JSON.stringify(newData),
          })
          .send({ from: sourceOwner || owner })
          .on('transactionHash', (hash: string) => {
            if (typeof onHash === 'function') onHash(hash)
          })
          .on('receipt', (receipt: any) => {
            if (typeof onReceipt === 'function') onReceipt(receipt)
          })
          .then(resolve)
          .catch(reject)
      })
    } catch (error) {
      log({ title: 'Storage: set()', value: error, color: 'red' })
      throw error
    }
  }

  async clearData({ key }: { key: string }) {
    try {
      const { data, owner } = await this.get(key)

      if (!data || !owner) return false

      return new Promise(async (resolve, reject) => {
        await this.signerInstance.methods
          .setKeyData(key, {
            owner,
            info: '',
          })
          .send({
            from: owner,
          })
          .then(resolve)
          .catch(reject)
      })
    } catch (error) {
      log({ title: 'Storage: clearData()', value: error, color: 'red' })
      throw error
    }
  }

  async delete({ key }: { key: string }) {
    try {
      const { owner } = await this.get(key)

      if (!owner) return false

      return new Promise(async (resolve, reject) => {
        await this.signerInstance.methods
          .clearKeyData(key, {
            owner,
            info: '',
          })
          .send({
            from: owner,
          })
          .then(resolve)
          .catch(reject)
      })
    } catch (error) {
      log({ title: 'Storage: delete()', value: error, color: 'red' })
      throw error
    }
  }

  mergeData({ oldData = {}, newData = {} }: { oldData: Data; newData: Data }) {
    try {
      const data = { ...oldData }

      Object.keys(newData).forEach((newKey) => {
        const newValue = newData[newKey]

        if (
          newValue !== Object(newValue) ||
          // do we need to check array values and update each of them the same way?
          Array.isArray(newValue) ||
          // functions won't be in the data in any case
          typeof newValue === 'function'
        ) {
          data[newKey] = newValue
        } else {
          data[newKey] = this.mergeData({
            oldData: data[newKey],
            newData: newValue,
          })
        }
      })

      return data
    } catch (error) {
      log({ title: 'Storage: mergeData()', value: error, color: 'red' })
      throw error
    }
  }
}
