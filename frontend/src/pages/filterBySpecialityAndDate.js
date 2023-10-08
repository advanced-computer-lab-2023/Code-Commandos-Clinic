import {useState} from "react";
import DoctorDetails from "../components/DoctorDetails";

const FilterBySpecialityAndDate = ()=> {
    const [speciality, setSpeciality] = useState(null);
    const [date, setDate] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const [selectedDoctor,setSelectedDoctor] = useState(null)

    const fetchResults = async () => {
        let url = '/api/doctor/filterBySpecialityAndDate';
        if (!speciality) {
            url += "/none";
        }
        else {
            url += `/${speciality}`
        }
        if (!date) {
            url += "/none";
        }
        else {
            url += `/${date}:00.000+00:00`
        }
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const results = await response.json();
                setSearchResults(results)
            } else {
                const errorMessage = await response.text();
                alert(errorMessage)
                throw new Error(errorMessage)
            }
        }
        catch (error) {
            setSelectedDoctor(null)
        }
    }


    return (
        <div className="container mt-4">
            <h1 className="mb-4">Filter By Speciality And Date</h1>
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
            <div className="mb-3">
                <label htmlFor="date" className="form-label">
                    Date:
                </label>
                <input
                    type="datetime-local"
                    id="date"
                    className="form-control"
                    value={date !== null ? date : ""}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <button className="btn btn-primary" onClick={fetchResults}>
                Filter
            </button>

            <div className="results mt-4">
                {searchResults &&
                    searchResults.map((doctor) => (
                        <button
                            key={doctor._id}
                            className="btn btn-link"
                            onClick={() => setSelectedDoctor(doctor)} style={{ fontSize: "20px" }}>
                            {doctor.name}
                            <br/>
                        </button>
                    ))}
            </div>
            {selectedDoctor && <DoctorDetails key={selectedDoctor._id} doctor={selectedDoctor} />}

        </div>
    );
};

export default FilterBySpecialityAndDate