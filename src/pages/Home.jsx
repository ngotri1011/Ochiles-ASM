import React from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Orchid from '../components/Orchid/Orchid'

export default function Home() {
    return (
        <div>
            <div>
                <Navigation />
            </div>
            <Orchid />
            <div>
                <Footer />
            </div>
        </div>
    )
}
