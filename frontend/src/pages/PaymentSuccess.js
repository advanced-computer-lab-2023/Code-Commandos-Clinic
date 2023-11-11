import { useEffect } from "react";
const PaymentSuccess = () => {
    useEffect(()=>{
        const subscribe = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const sessionID = urlParams.get('sessionID');
            const response = await fetch(`http://localhost:3000/api/patient/subscribeToPackage/${sessionID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log(await response.json())
        }

        subscribe()
    },[])
    return (
        <div>
            <h2>Payment successful. You are now subscribed.</h2>
            <a href="/HealthPackages">Go back to health packages page.</a>
        </div>
    );
};

export default PaymentSuccess

