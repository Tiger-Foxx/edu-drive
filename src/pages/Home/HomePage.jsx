// src/pages/HomePage.jsx
import 'react';
import HeroSection from "../../components/heroSection/HeroSection.jsx";
import HowItWorksSection from "../../components/howItWorkSection/HowItWorksSection.jsx";
import CoursesSection from "../../components/coursesSection/CoursesSection.jsx";

const HomePage = () => {
    return (
        <main className="min-h-screen">
            <HeroSection />
            <HowItWorksSection></HowItWorksSection>
            <CoursesSection></CoursesSection>
            {/* Vous pourrez ajouter d'autres sections ici plus tard */}
        </main>
    );
};

export default HomePage;