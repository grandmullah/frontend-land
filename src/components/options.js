import { Drizzle, generateStore } from "drizzle";



import land from '../contracts/Lands.json'
import identity from '../contracts/Identity.json'
import coin from '../contracts/KCHcoins.json'

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [land] // identity, coin]

}

export default options
