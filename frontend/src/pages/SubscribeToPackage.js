import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const SubscribeToPackage = () => {
    const [selectedPackage, setSelectedPackage] = useState(null)
    const [selectedFamilyMember, setSelectedFamilyMember] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const familyMember = urlParams.get('familyMember');
        const healthPackage = urlParams.get('package')
        setSelectedPackage(healthPackage)
        if(familyMember)
            setSelectedFamilyMember(familyMember)
        else {
            setSelectedFamilyMember("user")
        }
    }, [])

    const handleSubmit = async () => {
        const response = await fetch(`http://localhost:3000/api/patient/payForSubscription/${selectedFamilyMember}/${selectedPackage}/${paymentMethod}`)
        const session = await response.json()
        if(paymentMethod==="credit_card"){
            window.location.href = session.url;
        } else {
            if(response.ok){
                navigate('/HealthPackages/Subscribe/Success')
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: session.error,
                });
            }
        }
    }

    return (
        <div className="healthPackages m-5">
            <h2>Select Payment Method:</h2>
            <ul className="list-group">
                <li className="list-group-item">
                    <button
                        className="btn btn-link"
                        onClick={() => setPaymentMethod("wallet")}
                        style={{ fontSize: "20px", textDecoration:"none" }}>
                        Pay with Wallet (Current balance: {}) {paymentMethod==="wallet" && <span>(selected)</span>}
                    </button>
                </li>
                <li className="list-group-item">
                    <button
                        className="btn btn-link"
                        onClick={() => setPaymentMethod("credit_card")}
                        style={{ fontSize: "20px", textDecoration:"none" }}>
                        Pay with Credit Card (Stripe) {paymentMethod==="credit_card" && <span>(selected)</span>}
                    </button>
                </li>
            </ul>
            <br/>
            {paymentMethod &&
                <button className="btn btn-success" onClick={() => handleSubmit()}>
                    Continue
                </button>
            }
        </div>
    )
}

export default SubscribeToPackage;