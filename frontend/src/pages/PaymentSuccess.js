import { useEffect } from "react";
import Swal from 'sweetalert2';
const PaymentSuccess = () => {
    const handlePaymentSuccess = () => {
        Swal.fire({
            icon: 'success',
            title: 'Payment successful!',
            text: 'You are now subscribed.',
            confirmButtonText: 'Back to health packages',
            showCancelButton: true,
            cancelButtonText: 'Close',
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirect the user to the health packages page
                window.location.href = '/HealthPackages';
            }
        });
    };
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
        <div class="health-page">
        <div class>
            <a href="handlePaymentSuccess"></a>
            <button  className="paymentsuccess-btn" onClick={handlePaymentSuccess}>Done</button>

        </div>
        </div>  
    );
};

export default PaymentSuccess

