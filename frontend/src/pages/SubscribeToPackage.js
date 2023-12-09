import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

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
      try {
          const response = await fetch(`http://localhost:3000/api/patient/payForSubscription/${selectedFamilyMember}/${selectedPackage}/${paymentMethod}`);
          const session = await response.json();
          
          if (paymentMethod === "credit_card") {
              window.location.href = session.url;
          } else {
              if (response.ok) {
                  navigate('/HealthPackages/Subscribe/Success');
              } else {
                  Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: session.error
                  });
              }
          }
      } catch (error) {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'An unexpected error occurred!'
          });
          console.error(error);
      }
  };
  
    return (
       
       
         <div className="container">
         <h2 className="mb-4"><hr className="lineAround"></hr>Subscribe To Package<hr className="lineAround"></hr></h2>
        
            
          <div className="row">
          
          <div className="col-md-6 mb-3">
          
              <button
                className={`cash-btn ${paymentMethod === 'wallet' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setPaymentMethod('wallet')}
              >
                Pay with Wallet (Current balance: {}) {paymentMethod === 'wallet' && <span>(selected)</span>}
              </button>
             <button
                className={`credit-btn ${paymentMethod === 'credit_card' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setPaymentMethod('credit_card')}
              >
                Pay with Credit Card (Stripe) {paymentMethod === 'credit_card' && <span>(selected)</span>}
              </button>
              
            </div>
          </div>
          {paymentMethod && (
            <button className="con-btn" onClick={() => handleSubmit()}>
              Continue
            </button>
          )}
        </div>
       
        
      );
    };
    
    export default SubscribeToPackage;