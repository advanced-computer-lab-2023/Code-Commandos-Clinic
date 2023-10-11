import {useState} from "react";
import DoctorDetails from "../components/DoctorDetails";

const SearchByNameAndOrSpeciality = ()=> {
    const [name,setName] = useState(null);
    const [speciality, setSpeciality] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const [selectedDoctor,setSelectedDoctor] = useState(null)
    const fetchResults = async () => {
        try{
            let url = '/api/doctor/searchByNameAndOrSpeciality';
            if (!name) {
                url += "/none";
            }
            else {
                url += `/${name}`
            }
            if (!speciality) {
                url += "/none";
            }
            else {
                url += `/${speciality}`
            }
            const response = await fetch(url,{
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                },
            });
            if (response.ok){
                const results = await response.json();
                setSearchResults(results)
                setSelectedDoctor(null)
            }
            else {
                const errorMessage = await response.text();
                alert(errorMessage)
                throw new Error(errorMessage)
            }
        }
        catch (error){
            setSelectedDoctor(null)
        }
    };


    return (
        <div className="container m-5">
            <h1 className="mb-4">Search by Name and Speciality</h1>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Name:
                </label>
                <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name !== null ? name : ""}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="speciality" className="form-label">
                    Speciality:
                </label>
                <input
                    type="text"
                    id="speciality"
                    className="form-control"
                    value={speciality !== null ? speciality : ""}
                    onChange={(e) => setSpeciality(e.target.value)}
                />
            </div>
            <button className="btn btn-primary" onClick={fetchResults}>
                Search
            </button>

            <div className="results mt-4">
                {searchResults &&
                    searchResults.map((doctor) => (
                        <button
                            key={doctor._id}
                            className="btn btn-link"
                            onClick={() => setSelectedDoctor(doctor)}
                        >
                            {doctor.name}
                            <br/>
                        </button>
                    ))}
            </div>
            {selectedDoctor && <DoctorDetails key={selectedDoctor._id} doctor={selectedDoctor} />}
        </div>
    );
};

export default SearchByNameAndOrSpeciality