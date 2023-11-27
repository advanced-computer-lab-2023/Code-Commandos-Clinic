
import { useState } from 'react'

const DoctorRegistrationForm = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [hourlyRate, setHourlyRate] = useState('')
    const [affiliation, setAffiliation] = useState('')
    const [educationalBackground, setEducationalBackground] = useState('')
    const [speciality, setSpeciality] = useState('')
    const [medicalIDFile, setMedicalIDFile] = useState(null);
    const [medicalLicensesFile, setMedicalLicensesFile] = useState(null);
    const [medicalDegreeFile, setMedicalDegreeFile] = useState(null);
    const [IDID, setIDID] = useState(null);
    const [LicenseID, setLicenseID] = useState(null);
    const [DegreeID, setDegreeID] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!IDID || !LicenseID || !DegreeID){
            alert("You need to submit the three files before you confirm registration")
            return
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('dateOfBirth', dateOfBirth);
        formData.append('hourlyRate', hourlyRate);
        formData.append('affiliation', affiliation);
        formData.append('educationalBackground', educationalBackground);
        formData.append('speciality', speciality);
        formData.append('medicalID', IDID);
        formData.append('medicalLicenses',LicenseID );
        formData.append('medicalDegree',DegreeID );
        const jsonFormData = {};
        formData.forEach((value, key) => {
            jsonFormData[key] = value;
            console.log(key, value)
        });

        const response = await fetch('/api/doctorRegistration/doctorRegistrationRequest', {
            method: 'POST',
            body: JSON.stringify(jsonFormData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            alert(errorMessage);
        }
        if (response.ok) {
            const json = await response.json()
            setName('')
            setUsername('')
            setEmail('')
            setPassword('')
            setHourlyRate('')
            setAffiliation('')
            setEducationalBackground('')
            setMedicalIDFile(null);
            setMedicalLicensesFile(null);
            setMedicalDegreeFile(null);
            setSpeciality('')
            alert('Request to register successful.')
            console.log('new doctor registration request added:', json)
        }

    }
    const handleMedicalIDSubmit = async () => {
        setIDID( await handleFileSubmit( medicalIDFile));

    };

    const handleMedicalLicensesSubmit = async () => {
        setLicenseID (await handleFileSubmit(medicalLicensesFile));

    };

    const handleMedicalDegreeSubmit = async () => {
        setDegreeID( await handleFileSubmit( medicalDegreeFile));
    };

    const handleFileSubmit = async ( file) => {
        if (!file) {
            alert('Please select a file to upload');
            return;
        }
        if(!username){
            alert("You have to enter username before submitting the files")
        }
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`/api/file/addSingleFileGuest/${username}`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                alert(errorMessage);
                throw new Error(errorMessage);
            } else {
                alert('File is uploaded successfully');
                const fileId = await response.json();
                return fileId;
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <form className="create m-5" >
            <h2>Apply as a doctor to join the platform:</h2>

            <div className="mb-3">
                <label htmlFor="username" className="form-label">
                    Username:
                </label>
                <input
                    required={true}
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Name:
                </label>
                <input
                    required={true}
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    E-mail:
                </label>
                <input
                    required={true}
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Password:
                </label>
                <input
                    required={true}
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="dateOfBirth" className="form-label">
                    Date of Birth:
                </label>
                <input
                    required={true}
                    type="date"
                    className="form-control"
                    id="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="hourlyRate" className="form-label">
                    Hourly Rate:
                </label>
                <input
                    required={true}
                    type="number"
                    className="form-control"
                    id="hourlyRate"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="affiliation" className="form-label">
                    Affiliation:
                </label>
                <input
                    required={true}
                    type="text"
                    className="form-control"
                    id="affiliation"
                    value={affiliation}
                    onChange={(e) => setAffiliation(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="educationalBackground" className="form-label">
                    Educational Background:
                </label>
                <input
                    required={true}
                    type="text"
                    className="form-control"
                    id="educationalBackground"
                    value={educationalBackground}
                    onChange={(e) => setEducationalBackground(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="specialty" className="form-label">
                    Speciality:
                </label>
                <select
                    required={true}
                    id="speciality"
                    name="speciality"
                    className="form-select"
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                >
                    <option value="">Select a specialty</option>
                    <option value="ALLERGISTS/IMMUNOLOGISTS">Allergists/Immunologists</option>
                    <option value="ANESTHESIOLOGISTS">Anesthesiologists</option>
                    <option value="CARDIOLOGISTS">Cardiologists</option>
                    <option value="COLON AND RECTAL SURGEONS">Colon and Rectal Surgeons</option>
                    <option value="CRITICAL CARE MEDICINE SPECIALISTS">Critical Care Medicine Specialists</option>
                    <option value="DERMATOLOGISTS">Dermatologists</option>
                    <option value="ENDOCRINOLOGISTS">Endocrinologists</option>
                    <option value="EMERGENCY MEDICINE SPECIALISTS">Emergency Medicine Specialists</option>
                    <option value="FAMILY PHYSICIANS">Family Physicians</option>
                    <option value="GASTROENTEROLOGISTS">Gastroenterologists</option>
                    <option value="GERIATRIC MEDICINE SPECIALISTS">Geriatric Medicine Specialists</option>
                    <option value="HEMATOLOGISTS">Hematologists</option>
                    <option value="HOSPICE AND PALLIATIVE MEDICINE SPECIALISTS">Hospice and Palliative Medicine Specialists</option>
                    <option value="INFECTIOUS DISEASE SPECIALISTS">Infectious Disease Specialists</option>
                    <option value="INTERNISTS">Internists</option>
                    <option value="MEDICAL GENETICISTS">Medical Geneticists</option>
                    <option value="NEPHROLOGISTS">Nephrologists</option>
                    <option value="NEUROLOGISTS">Neurologists</option>
                    <option value="OBSTETRICIANS AND GYNECOLOGISTS">Obstetricians and Gynecologists</option>
                    <option value="ONCOLOGISTS">Oncologists</option>
                    <option value="OPHTHALMOLOGISTS">Ophthalmologists</option>
                    <option value="OSTEOPATHS">Osteopaths</option>
                    <option value="OTOLARYNGOLOGISTS">Otolaryngologists</option>
                    <option value="PATHOLOGISTS">Pathologists</option>
                    <option value="PEDIATRICIANS">Pediatricians</option>
                    <option value="PHYSIATRISTS">Physiatrists</option>
                    <option value="PLASTIC SURGEONS">Plastic Surgeons</option>
                    <option value="PODIATRISTS">Podiatrists</option>
                    <option value="PREVENTIVE MEDICINE SPECIALISTS">Preventive Medicine Specialists</option>
                    <option value="PSYCHIATRISTS">Psychiatrists</option>
                    <option value="PULMONOLOGISTS">Pulmonologists</option>
                    <option value="RADIOLOGISTS">Radiologists</option>
                    <option value="RHEUMATOLOGISTS">Rheumatologists</option>
                    <option value="SLEEP MEDICINE SPECIALISTS">Sleep Medicine Specialists</option>
                    <option value="SPORTS MEDICINE SPECIALISTS">Sports Medicine Specialists</option>
                    <option value="GENERAL SURGEONS">General Surgeons</option>
                    <option value="UROLOGISTS">Urologists</option>
                    <option value="DENTIST">Dentist</option>
                </select>
            </div>

            <hr />
            <div className="mb-3">
                <label htmlFor="medicalIDFile" className="form-label">
                    Upload Medical ID:
                </label>
                <input
                    required={true}
                    type="file"
                    className="form-control"
                    id="medicalIDFile"
                    onChange={  (e) => setMedicalIDFile(e.target.files[0])}
                />
                <button type="button" className="btn btn-primary" onClick={handleMedicalIDSubmit}>
                    Submit Medical ID
                </button>
            </div>

            <hr />
            <div className="mb-3">
                <label htmlFor="medicalLicensesFile" className="form-label">
                    Upload Medical Licenses:
                </label>
                <input
                    required={true}
                    type="file"
                    className="form-control"
                    id="medicalLicensesFile"
                    onChange={(e) => setMedicalLicensesFile(e.target.files[0])}
                />
                <button type="button" className="btn btn-primary" onClick={handleMedicalLicensesSubmit}>
                    Submit Medical Licenses
                </button>
            </div>

            <hr />

            <div className="mb-3">
                <label htmlFor="medicalDegreeFile" className="form-label">
                    Upload Medical Degree:
                </label>
                <input
                    required={true}
                    type="file"
                    className="form-control"
                    id="medicalDegreeFile"
                    onChange={(e) => setMedicalDegreeFile(e.target.files[0])}
                />
                <button type="button" className="btn btn-primary" onClick={handleMedicalDegreeSubmit}>
                    Submit Medical Degree
                </button>
            </div>

            <hr />
            <button type="submit" className="btn btn-primary" onClick={handleSubmit} >
                Register
            </button>
        </form>
    );
}

export default DoctorRegistrationForm