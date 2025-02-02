import  { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    UserCircle,
    Users,
    HelpCircle,
    LogOut,
    MessageCircle,
    Send,
    Menu,
    X,
    ChevronRight
} from 'lucide-react';
import './UserSpace.css';
import {logoutUser} from '../../services/userService';

const UserSpace = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (!mobile) setIsSidebarOpen(true);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const menuItems = [
        {
            path: '/dashboard/profile',
            icon: <UserCircle className="w-6 h-6" />,
            label: 'Mon Profil',
            description: 'Gérer vos informations personnelles'
        },
        {
            path: '/dashboard/referral',
            icon: <Users className="w-6 h-6" />,
            label: 'Parrainage',
            description: 'Suivez vos gains et vos filleuls'
        },
        {
            path: '/dashboard/help',
            icon: <HelpCircle className="w-6 h-6" />,
            label: 'Aide',
            description: 'Centre d\'assistance et guides'
        }
    ];

    return (
        <div className="dashboard-container">
            {/* Hamburger Button for Mobile */}
            {isMobile && (
                <button
                    className="hamburger-btn"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            )}

            {/* Sidebar */}
            <aside className={`dashboard-sidebar ${!isSidebarOpen ? 'closed' : ''}`}>
                {/*<div className="sidebar-header">*/}
                {/*    <div className="flex items-center space-x-3">*/}
                {/*        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">*/}
                {/*            <UserCircle className="w-6 h-6 text-blue-600" />*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <h2 className="font-semibold text-gray-900">Mon Espace</h2>*/}
                {/*            <p className="text-sm text-gray-500">Tableau de bord</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="sidebar-menu">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
                            onClick={() => isMobile && setIsSidebarOpen(false)}
                        >
                            <span className="menu-item-icon">{item.icon}</span>
                            <div>
                                <div className="font-medium">{item.label}</div>
                                <div className="text-sm opacity-75">{item.description}</div>
                            </div>
                            <ChevronRight className="ml-auto w-5 h-5" />
                        </Link>
                    ))}
                </div>

                <div className="bottom-actions">
                    <button className="action-button primary">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Support Client
                    </button>
                    <button className="action-button secondary">
                        <Send className="w-5 h-5 mr-2" />
                        Canal Telegram
                    </button>
                    <button className="action-button danger" >
                        <LogOut className="w-5 h-5 mr-2" />
                        <a href="/signin"> Déconnexion</a>
                       
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                <Outlet />
            </main>

            {/* Mobile Overlay */}
            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default UserSpace;