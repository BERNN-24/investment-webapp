export  const trxAddress =  (walletAddress ,value) => {
        const findCrypto = walletAddress.find((data)=>data.name == value);
        if(!findCrypto) return "Not Available";
        const {wallet_address : w_address} = findCrypto;
        return w_address;
    }