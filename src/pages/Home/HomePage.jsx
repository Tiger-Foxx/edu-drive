// src/pages/HomePage.jsx
import 'react';
import HeroSection from "../../components/heroSection/HeroSection.jsx";

const HomePage = () => {
    return (
        <main className="min-h-screen">
            <HeroSection />
            {/* Vous pourrez ajouter d'autres sections ici plus tard */}
        </main>
    );
};

export default HomePage;