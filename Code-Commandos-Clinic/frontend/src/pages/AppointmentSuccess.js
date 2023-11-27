import { useEffect } from "react";

const AppointmentSuccess = () => {
    useEffect(()=>{
        const subscribe = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const sessionID = urlParams.get('sessionID');
            const response = await fetch(`api/appointment/success/${sessionID}`, {
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
            <h2>Payment successful.</h2>
            
        </div>
    );
};

export default AppointmentSuccess
