import { useState } from 'react'
import family from '../images/family.jpg';
import Swal from 'sweetalert2';

const FamilyMemberForm = () => {
  const [name, setName] = useState('')
  const [nationalId, setNationalId] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [relation, setRelation] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const FamilyMember = { name: name, nationalId: nationalId, age: age, gender: gender, relation: relation}
    
    const response = await fetch('/api/familyMember/addFamilyMember', {
      method: 'POST',
      body: JSON.stringify(FamilyMember),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
        // alert(await response.text())
        Error('Something is missing or family member already added');
    }
    if (response.ok) {
        const json = await response.json()
        showSuccessNotification('New family member added successfully');
        setName('')
      setNationalId('')
      setAge('')
      //setGender('')
      //setRelation('')
      console.log('new family member added:', json)
    }

  }
  const Error = async (message) => {
    const result = await Swal.fire({
      title: message,
      icon: 'error',
      showCancelButton: true,
      showConfirmButton:false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Try again',
    });
    return result.isConfirmed;
  };
  const showSuccessNotification = (message) => {
    Swal.fire({
      icon: 'success',
      title: message,
    });
  };
  const ImageStyle = {
    // width: '60%', // Adjust the width as needed
    // height: 'auto',
    // position:'fixed' ,
    // right:0,
    // top:150,
     maxWidth: '50%', 
     height: 'auto' ,
    //  marginLeft:'80%',
    position: 'relative',
    bottom: -150,
    right: 100,

  };
  

    return (
        <form className="add m-5" onSubmit={handleSubmit}>
            <h2 className="mb-4"><hr className="lineAround"></hr>Add Family Member <hr className="lineAround"></hr></h2>
            <div className="box-with-image"> 
            <div className="box">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Name:
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="nationalId" className="form-label">
                    National ID:
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="nationalId"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="age" className="form-label">
                    Age:
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <div className="imageInside">
                <label>Gender:</label>
                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        id="MALE"
                        name="gender"
                        onChange={(e) => setGender(e.target.id)}
                    />
                    <label className="form-check-label" htmlFor="MALE">
                        Male
                    </label>
                </div>

                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        id="FEMALE"
                        name="gender"
                        onChange={(e) => setGender(e.target.id)}
                    />
                    <label className="form-check-label" htmlFor="FEMALE">
                        Female
                    </label>
                </div>
            </div>

            <div className="mb-3">
                <label>Relation:</label>                         
                         </div>
                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        id="WIFE"
                        name="relation"
                        onChange={(e) => setRelation(e.target.id)}
                    />
                    <label className="form-check-label" htmlFor="WIFE">
                        Wife
                    </label>
                </div>

                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        id="HUSBAND"
                        name="relation"
                        onChange={(e) => setRelation(e.target.id)}
                    />
                    <label className="form-check-label" htmlFor="HUSBAND">
                        Husband
                    </label>
                </div>

                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        id="CHILDREN"
                        name="relation"
                        onChange={(e) => setRelation(e.target.id)}
                    />
                    <label className="form-check-label" htmlFor="CHILDREN">
                        Children
                    </label>
                </div>
              </div>
             </div>
             <div className="imageInside" >
                
               
             <img src={family} style={ImageStyle} alt="Your Image" />
             </div>
         </div>

            <button id="button"type="submit" className="btn btn-primary">
                Add
            </button>
        </form>
    );
}

export default FamilyMemberForm