"use client"

import AngkasaStorePreview from "./AngkasaStorePreview"
import AngkasaKostPreview from "./AngkasaKostPreview"

export default function Proker() {
    return (
        <>
            <AngkasaStorePreview />
            <div className="mb-12"></div>
            <AngkasaKostPreview/>
        </>
    )
}