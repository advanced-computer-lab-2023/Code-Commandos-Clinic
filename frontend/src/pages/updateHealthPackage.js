import { useEffect, useState } from "react";

import PackageUpdateForm from '../components/PackageUpdateForm'

const HealthPackageUpdate = () => {

    const [healthPackages, setHealthPackages] = useState(null)

    useEffect(() => {
        const fetchHealthPackages = async () => {
            const response = await fetch('api/healthPackage/')
            const json = await response.json()

            if(response.ok){
                setHealthPackages(json)
            }
        }

        fetchHealthPackages()
    }, [])

    return (
        <div className="health-package-update">
            <div>
                {healthPackages && healthPackages.map((healthPackage) => (
                    <PackageUpdateForm key={healthPackage._id} healthPackage={healthPackage}/>
                ))}
            </div>
        </div>
    )

}

export default HealthPackageUpdate