"use client"

import AngkasaCareHub from "./AngkasaCareHub"
import AngkasaStorePreview from "./AngkasaStorePreview"
import AngkasaKostPreview from "./AngkasaKostPreview"
// angkasa kost blm dibikin sectionnya

export default function Proker() {
    return (
        <section id="proker" className="relative bg-[#FBF5EA] py-15 md:py-20">
            <AngkasaCareHub />
            <div className="py-10 md:py-15"></div>
            <AngkasaStorePreview />
            <div className="mb-12"></div>
            <AngkasaKostPreview/>
        </section>
    )
}