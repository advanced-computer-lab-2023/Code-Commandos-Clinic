import { useEffect, useState } from "react";
import "../css/ViewMyWalletAsDoctor.css";
import wallett from '../images/wallet.jpg';
const ViewMyWalletAsPatient = () => {
    const [wallet, setWallet] = useState(0);

    useEffect(() => {
        const fetchAmount = async () => {
            try {
                const response = await fetch('/api/doctor/getAmount', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });


                if (response.ok) {
                    const result = await response.json()
                    setWallet(result);
                }
                else {
                    alert(await response.text())
                }
            } catch (error) {
                alert(error.message)
            }
        };

        fetchAmount();
    }, []);
    return (
        <div className="bodyy111">
        <h1 class ="tittle">Your Wallet Amount:</h1>
        <div class ="bodyyy1">
        <div class ="walletcon">
        <img src={wallett} className="wallett" alt="wallet" />
        <h4 class="ammouunt">Amount of money in your wallet : {wallet} <span class ="dollar">$ </span></h4>
        </div>
        </div>
    </div>

    );
}

export default ViewMyWalletAsPatient;