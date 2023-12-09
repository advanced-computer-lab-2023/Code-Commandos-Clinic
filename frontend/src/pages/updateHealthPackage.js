import { useEffect, useState } from "react";

import PackageUpdateForm from '../components/PackageUpdateForm'

const HealthPackageUpdate = () => {

    const [healthPackages, setHealthPackages] = useState(null)

    useEffect(() => {
        const fetchHealthPackages = async () => {
            const response = await fetch('api/healthPackage/getPackages')
            const json = await response.json()

            if(response.ok){
                setHealthPackages(json)
            }
            else if (!response.ok){
                alert(await response.text())
            }
        }

        fetchHealthPackages()
    }, [])

    return (
        <div className="health-package-update m-5">
            <h2 className="mb-4">
                <hr className='linearound'></hr> Packages <hr className='linearound'></hr>
            </h2>
            <div>
                {healthPackages && healthPackages.map((healthPackage) => (
                    <PackageUpdateForm key={healthPackage._id} healthPackage={healthPackage}/>
                ))}
            </div>
        </div>
    )

}

export default HealthPackageUpdate