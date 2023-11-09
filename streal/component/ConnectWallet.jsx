import React,{useContext} from 'react'
import { StrealContext } from '../pages/indexData'


const ConnectAccount = () => {
    const {
        connectWallet,

    } = useContext(StrealContext)
    
  return (
    <div>
        <button onClick={()=> connectWallet()}>Connect wallet</button>
    </div>
  )
}

export default ConnectAccount