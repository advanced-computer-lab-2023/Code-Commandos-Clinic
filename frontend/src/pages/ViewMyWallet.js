import { useEffect, useState } from "react";

const ViewMyWallet = () => {
    const [wallet, setWallet] = useState(0);

    useEffect(() => {
        const fetchAmount = async () => {
            try {
                const response = await fetch('/api/wallet/getAmount/akram2002', {
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
        <div className="container mt-4">
            <h2>Your Wallet Amount:</h2>
            <h4>${wallet.amount}</h4>
        </div>

    );
}

export default ViewMyWallet;