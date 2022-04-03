import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
}
var initialState = "";

export const TransactionProvider = ({ children }) => {
    
const [currentAccount, setCurrentAccount ] = useState(initialState);
const [formData, setFormData] = useState({ addressTo:'', amount:'', keyword:'', message:'' });
const [isLoading, setIsLoading] = useState(initialState);
const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));


    function handleChange(e, name) {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const checkIfWalletIsConnected = async () => {
    try{

    } catch(error){
        console.log(error);
        throw new Error("No ethereum object.");  
    }

        if(!ethereum) return alert ("Please install Metamask");

        const accounts = await ethereum.request({method: 'eth_accounts'});

        if(accounts.length){
            setCurrentAccount(accounts[0]);

            //getAlltxns
        }
        else{
            console.log('No accounts found');
        }

        console.log(accounts);
    }

    const connectWallet = async() =>{
       try{
        if(!ethereum) return alert ("Please install Metamask");

        const accounts = await ethereum.request({method: 'eth_requestAccounts'});
        setCurrentAccount(account[0]);
       } catch(error)
       {
        console.log(error);
        throw new Error("No ethereum object.");
       }
    }

    const sendTransaction = async() => {
        try {  

            if(!ethereum) return alert ("Please install Metamask");

            //get the data from the form...
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);


        await ethereum.request({
            method:'eth_sendTransaction',
            params: [{
                from: currentAccount,
                to: addressTo,
                gas: '0x5208', //hex... 21000 Gwei (like cent)
                value: parsedAmount._hex, //0.00001
            }]
        })

        // Add Transaction to Blockchain
        const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message,keyword);
         
        setIsLoading(true);
        console.log('Loading -' + transactionHash.hash);
        await transactionHash.wait();
        setIsLoading(false);
        console.log('Success -' + transactionHash.hash);

        const transactionCount = await transactionContract.getTransactionCount();
        setTransactionCount(transactionCount.toNumber());


       }catch(error)
       {
        console.log(error);
        throw new Error("No ethereum object.");
       }
    }

    useEffect(() => {
       checkIfWalletIsConnected();
    }, []);
    
    return (
<TransactionContext.Provider value={{ connectWallet, currentAccount, formData, sendTransaction, handleChange }}>
    {children}
</TransactionContext.Provider>
    );
}