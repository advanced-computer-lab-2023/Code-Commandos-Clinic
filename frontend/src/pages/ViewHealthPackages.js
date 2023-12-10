import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import PackageDetails from '../components/PackageDetails'
import PatientNavbar from "../components/patientNavbar";

const HealthPackages = () => {
    const [healthPackages, setHealthPackages] = useState(null)
    const [discountedHealthPackages, setDiscountedHealthPackages] = useState(null)
    const [subscribedPackage, setSubscribedPackage] = useState({})
    const [subscribedPackageStatus, setSubscribedPackageStatus] = useState({})
    const [selectedPackage, setSelectedPackage] = useState({})
    const [familyMembers, setFamilyMembers] = useState(null)
    const [selectedFamilyMember, setSelectedFamilyMember] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState(null)

    const navigate = useNavigate()

    const fetchAll = () => {
        const fetchSubscribedPackage = async () => {
            const response = await fetch('api/healthPackagePatient/getSubscribedPackage')
            const json = await response.json()

            if(response.ok){
                setSubscribedPackage(json)
                setSelectedPackage(json)
            }
            else {
                setSubscribedPackage({})
                setSelectedPackage({})
            }
        }
        const fetchFamilyMembers = async () => {
            const response = await fetch('api/familyMember/getSubscribedPackagesForFamilyMembers')
            const json = await response.json()

            if(response.ok){
                setFamilyMembers(json)
            }
            else {
                setFamilyMembers(null)
            }
        }
        fetchSubscribedPackage()
        fetchFamilyMembers()
        setSelectedFamilyMember(null)
    }

    useEffect(() => {
        fetchAll()
        const payment = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const familyMember = urlParams.get('familyMember');
            const healthPackage = urlParams.get('package')
            setSelectedPackage(healthPackage)
            if(familyMember)
                setSelectedFamilyMember(familyMember)
            else {
                setSelectedFamilyMember("user")
            }
        }
        const fetchSubscribedPackageStatus = async () => {
            const response = await fetch('api/healthPackagePatient/getSubscribedPackageStatus')
            const json = await response.json()

            if(response.ok){
                setSubscribedPackageStatus(json)
            }
            else {
                setSubscribedPackageStatus({})
            }
        }
        const fetchHealthPackages = async () => {
            const response = await fetch('api/healthPackage/getPackages')
            

            if(response.ok){
                const json = await response.json()
                setHealthPackages(json)
               
            }
            else {
                alert(await response.text())
            }
        }
        const fetchDiscountedHealthPackages = async () => {
            const response = await fetch('api/healthPackage/getPackagesWithDiscount')
            const json = await response.json()

            if(response.ok){
                setDiscountedHealthPackages(json)
            }
            else {
                setDiscountedHealthPackages(null)
            }
        }
        
        fetchSubscribedPackageStatus()
        fetchHealthPackages()
        fetchDiscountedHealthPackages()
    }, [])
   

    const handleSubmit = async () => {
        let url = "/HealthPackages/Subscribe"
        if(selectedPackage)
            url+= "?package=" + selectedPackage._id
        if(selectedFamilyMember)
            url+= "&familyMember=" + selectedFamilyMember._id
        navigate(url)
    }
    const handleSubmitpay = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/patient/payForSubscription/${selectedFamilyMember}/${selectedPackage}/${paymentMethod}`);
            const session = await response.json();
            
            if (paymentMethod === "credit_card") {
                window.location.href = session.url;
            } else {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'payment succefully done',
                        showConfirmButton: true,
                   
                        
                    });
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
   
      
    const handleDelete = async () => {
        const familyMemberID = selectedFamilyMember? selectedFamilyMember._id: "user"
        const response = await fetch(`http://localhost:3000/api/healthPackagePatient/cancelSubscription/${familyMemberID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
        })
        if(response.ok) {
            alert("Subscription cancelled successfully")
            window.location.reload()
        } else {
            //alert("Something went wrong")
        }
    }

    const selectFamilyMember = (familyMember) => {
        console.log(familyMember.healthPackage)
        if(familyMember.healthPackage){
            setSubscribedPackage(familyMember.healthPackage.healthPackageID)
            setSelectedPackage(familyMember.healthPackage.healthPackageID)
        } else {
            setSubscribedPackage({})
            setSelectedPackage({})
        }
        setSelectedFamilyMember(familyMember)
    }
    const handleBack=  () => {
      
        navigate('/patientHome');
    };
    return (
        <body className="my-patient-background">
        {<PatientNavbar />}
        <div className="healthPackages m-5">
          
            <br/><li className="list-group-item">

            {subscribedPackage._id? 
            
                <h2 className="mb-4">Change or Cancel Current Health Package:</h2>: <h2 className="mb-4"><hr className="lineAround"></hr>Subscribe to a Health Package:<hr className="lineAround"></hr></h2> 
            }
            <div className="dropdown">
                
            <button
           className="btn paymentsuccess-btn dropdown-toggle"
           type="button"
           data-bs-toggle="dropdown"
         aria-expanded="false"
         >
          {selectedFamilyMember ? selectedFamilyMember.name : "Select Family member"}
          </button>

               <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button
               className="btn btn-link"
                onClick={() => fetchAll()} 
                style={{ fontSize: "20px", textDecoration:"none" }}
           >
                {selectedFamilyMember ? (
           <>
                You selecting <b>{selectedFamilyMember.name}</b>
          </>
                ) : (
                  <>
                   You <b>(Yourself)</b>
                    </>
                   )}
                  </button>
            
                    Subscription Status:&nbsp;
                    {(subscribedPackageStatus._id&&subscribedPackageStatus.status==="SUBSCRIBED")? 
                        <span><span className="badge bg-primary"><b>{subscribedPackageStatus.status}</b></span> <span className="badge bg-primary"><b>renews {(new Date(subscribedPackageStatus.renewalDate)).toLocaleDateString("en-GB")}</b></span></span>
                    :(subscribedPackageStatus._id&&subscribedPackageStatus.status==="CANCELLED")? 
                        <span><span className="badge bg-danger"><b>{subscribedPackageStatus.status}</b></span> <span className="badge bg-danger"><b>ends {(new Date(subscribedPackageStatus.renewalDate)).toLocaleDateString("en-GB")}</b></span></span>
                    :
                        <span className="badge bg-secondary"><b>UNSUBSCRIBED</b></span>
                    }
              
                    {familyMembers &&
                        familyMembers.map((familyMember) => (
                            <li key={familyMember._id}>
                                <button
                                    className="dropdown-item"
                                    onClick={() => selectFamilyMember(familyMember)}
                                    style={{ fontSize: "20px", textDecoration: "none" }}
                                >
                                    {familyMember.name} {familyMember === selectedFamilyMember }
                                </button>
                                <div className="dropdown-item">
                                    Subscription Status:&nbsp;
                                    {(familyMember.healthPackage && familyMember.healthPackage.status === "SUBSCRIBED") ?
                                        <span><span className="badge bg-primary"><b>{familyMember.healthPackage.status}</b></span> <span className="badge bg-primary"><b>renews {(new Date(familyMember.healthPackage.renewalDate)).toLocaleDateString("en-GB")}</b></span></span>
                                        : (familyMember.healthPackage && familyMember.healthPackage.status === "CANCELLED") ?
                                            <span><span className="badge bg-danger"><b>{familyMember.healthPackage.status}</b></span> <span className="badge bg-danger"><b>ends {(new Date(familyMember.healthPackage.renewalDate)).toLocaleDateString("en-GB")}</b></span></span>
                                            :
                                            <span className="badge bg-secondary"><b>UNSUBSCRIBED</b></span>
                                    }
                                </div>
                            </li>
                        ))}
                </ul>
                </div>
            <div>
                {(discountedHealthPackages&&selectedFamilyMember)? 
                discountedHealthPackages.map((healthPackage) => (
                    <div
                    onClick={() => setSelectedPackage(healthPackage)}
                    style={{cursor: "pointer"}}
                    >
                    {selectedPackage._id===healthPackage._id?
                    <PackageDetails key={healthPackage._id} healthPackage={healthPackage} currentPlan={healthPackage._id===subscribedPackage._id} selected={true}/>:
                    <PackageDetails key={healthPackage._id} healthPackage={healthPackage} currentPlan={healthPackage._id===subscribedPackage._id} selected={false}/>}
                    <br/>
                    </div>
                ))
                :healthPackages?
                healthPackages.map((healthPackage) => (
                    <div
                    onClick={() => setSelectedPackage(healthPackage)}
                    style={{cursor: "pointer"}}
                    >
                    {selectedPackage._id===healthPackage._id?
                    <PackageDetails key={healthPackage._id} healthPackage={healthPackage} currentPlan={healthPackage._id===subscribedPackage._id} selected={true}/>:
                    <PackageDetails key={healthPackage._id} healthPackage={healthPackage} currentPlan={healthPackage._id===subscribedPackage._id} selected={false}/>}
                    <br/>
                    </div>
                ))    
                :<br/>}
                {(selectedPackage._id && subscribedPackage._id !== selectedPackage._id) ? (
             <div>
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
      {paymentMethod && (
            <button className="con-btn" onClick={() => handleSubmitpay()}>
              Continue
            </button>
          )}
    </div>
  ) : 
  
    <button className="select-btn" disabled>
  Select
    </button>
    
                }&nbsp;
                {(subscribedPackage._id&&( (selectedFamilyMember&&selectedFamilyMember.healthPackage.status!="CANCELLED")||(!selectedFamilyMember&&subscribedPackageStatus.status!="CANCELLED") )) &&
                    <button className="btn btn-danger" onClick={() => handleDelete()}>
                        Cancel Subscription
                    </button>
                }  
                 </div>  
              </li>
              <button className="back-btn" onClick={handleBack}>
                       
                    </button>
               
                
                </div>
                </body>
    );
};

export default HealthPackages;