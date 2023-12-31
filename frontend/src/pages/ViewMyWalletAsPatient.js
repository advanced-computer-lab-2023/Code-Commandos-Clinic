import { useEffect, useState } from "react";
import "../css/ViewMyWalletAsPatient.css";
import wallett from '../images/wallet.jpg';
import Swal from 'sweetalert2';

const ViewMyWalletAsPatient = () => {
    const [wallet, setWallet] = useState(0);

    useEffect(() => {
        const fetchAmount = async () => {
            try {
                const response = await fetch('/api/patient/getAmount', {
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
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: await response.text(),
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: error.message,
                });
            }
        };

        fetchAmount();

        
    }, []);
    return (
        <div className="bodyy">  
        <h2 className="mb-4"><hr className="lineAround"></hr>Wallet Amount <hr className="lineAround"></hr></h2>
        <div class ="bodyyy2">
        <div class ="walletcon">
        <img src={wallett} className="wallett" alt="wallet" />
        <h4 class="ammouunt">Amount of money in your wallet : {wallet} <span class ="dollar">$ </span></h4>
        </div>
        </div>
    </div>


    );
}

export default ViewMyWalletAsPatient;