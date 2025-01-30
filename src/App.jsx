import {BrowserRouter, BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import UserSpace from "./pages/UserSpace/UserSpace.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ReferralSection from "./pages/UserSpace/ReferralSection/ReferralSection.jsx";
import HelpSection from "./pages/UserSpace/HelpSection/HelpSection.jsx";
import ProfileSection from "./pages/UserSpace/ProfileSection/ProfileSection.jsx";
import CoursesPage from "./pages/Courses/CoursesPage.jsx";
import CourseDetailPage from "./pages/CourseDetailPage/CourseDetailPage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import LoginPage from "./pages/SigninPage/LoginPage.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import LegalPage from "./pages/Privacy/Privacy.jsx";
import PayementTankYouPage from "@/pages/Payment/PayementTankYouPage.jsx";
import ProtectedRoute from "@/protectedRoutes.jsx";


function App() {
    const location = useLocation(); // Hook pour obtenir la localisation actuelle

    // Déterminer si le Footer doit s'afficher
    const showFooter = !location.pathname.includes('/dashboard');

    return (
        <div className="app">
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/signin" element={<LoginPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/courses" element={<CoursesPage/>}/>
                <Route path="/courses-detail/:id" element={<CourseDetailPage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/privacy" element={<LegalPage/>}/>
                <Route path="/payment/thank-you" element={<PayementTankYouPage/>}/>

                {/* Routes protégées */}
                <Route
                    path="/dashboard/*"
                    element={
                        <ProtectedRoute>
                            <UserSpace/>
                        </ProtectedRoute>
                    }
                >
                    <Route path="profile" element={<ProfileSection/>}/>
                    <Route path="referral" element={<ReferralSection/>}/>
                    <Route path="help" element={<HelpSection/>}/>
                </Route>
            </Routes>
            {showFooter && <Footer/>}
        </div>
    );
}

// Pour inclure le Router avec le composant App
function Root() {
    return (
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    );
}

export default Root;
