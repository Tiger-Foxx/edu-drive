// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
// import SignupPage from './pages/SignupPage';
// import DashboardPage from './pages/DashboardPage';

function App() {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    {/*<Route path="/signup" element={<SignupPage />} />*/}
                    {/*<Route path="/dashboard" element={<DashboardPage />} />*/}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;