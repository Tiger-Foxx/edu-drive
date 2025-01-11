import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import UserSpace from "./pages/UserSpace/UserSpace.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ReferralSection from "./pages/UserSpace/ReferralSection/ReferralSection.jsx";
import HelpSection from "./pages/UserSpace/HelpSection/HelpSection.jsx";
import ProfileSection from "./pages/UserSpace/ProfileSection/ProfileSection.jsx";
import CoursesPage from "./pages/Courses/CoursesPage.jsx";


function App() {
    const location = useLocation(); // Hook pour obtenir la localisation actuelle

    // Déterminer si le Footer doit s'afficher
    const showFooter = !location.pathname.includes('/dashboard');

    return (
        <div className="app">
            <Navbar />
            <Routes>
                <Route path="/dashboard" element={<UserSpace />}>
                    <Route path="profile" element={<ProfileSection />} />
                    <Route path="referral" element={<ReferralSection />} />
                    <Route path="help" element={<HelpSection />} />

                </Route>
                <Route path="/" element={<HomePage/>} />
                {/*<Route path="/signup" element={<SignupPage />} />*/}
                <Route path="/courses" element={<CoursesPage />} />

            </Routes>
            {showFooter && <Footer />}
        </div>
    );
}

// Pour inclure le Router avec le composant App
function Root() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default Root;
