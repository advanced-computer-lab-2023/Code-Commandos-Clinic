import { useEffect, useState } from "react";

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
            <h4>${wallet}</h4>
        </div>

    );
}

export default ViewMyWalletAsPatient;