import { useEffect, useState } from "react";

const ViewMyWallet = () => {
   const [wallet, setWallet] = useState(0);
   
   useEffect(() => { 
       const fetchWallet = async () => {
           try {
               const response = await fetch('/api/wallet/getAmount/akram2002',{
                   method: 'GET',
                   headers: {
                       'Content-Type':'application/json',
                   },
               });
               if (response.ok){
                   const result = await response.json()
                   setWallet(result)
                   console.log(result)
               }
               else{
                   alert(await response.text())
               }
           } catch (error) {
               alert(error.message)
           }
       };

       fetchWallet();
   }  , []);   
   return( 
         <div className="container mt-4">
            <h2>My Wallet</h2>
            <div className="row">
                  <div className="col-md-3 mb-3">
                     <label htmlFor="wallet">Amount:</label>
                     <input
                        type="text"
                        className="form-control"
                        id="wallet"
                        value={wallet}
                        readOnly
                     />
                  </div>
            </div>
         </div>

   );
}

export default  ViewMyWallet;