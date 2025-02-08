import { useState, useEffect } from 'react';
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
import { getCurrentUser, logoutUser } from '../../services/userService';
import { SERVER_BASE_URL } from "@/Config.jsx";

const UserSpace = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const location = useLocation();
    const [footerInfo, setFooterInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (!mobile) setIsSidebarOpen(true);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${SERVER_BASE_URL}/footer-info/`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setFooterInfo(data[0]);
                }
            })
            .catch(error => {
                console.error('Error fetching footer info:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const handleTelegramClick = () => {
        if (footerInfo?.telegram_canal) {
            const CurrentUser=getCurrentUser();
            if (CurrentUser.telegram_group_joined) {
                window.open(footerInfo.telegram_canal);
            } else {
                window.open("/telegram-subscribe");
            }
        }

    };
    const handleTelegramSupportClick = () => {
        if (footerInfo?.telegram) {
            window.open("https://te.me/" + footerInfo.telegram);
        }
    };


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

    if (isLoading) {
        return <div className="loading-spinner">Chargement...</div>;
    }

    return (
        <div className="dashboard-container">
            {isMobile && (
                <button
                    className="hamburger-btn"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            )}

            <aside className={`dashboard-sidebar ${!isSidebarOpen ? 'closed' : ''}`}>
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
                    {footerInfo.telegram  && <button  onClick={handleTelegramSupportClick} className="action-button primary">
                        <MessageCircle className="w-5 h-5 mr-2"/>
                        Support Client
                    </button>}
                    {footerInfo?.telegram_canal && (
                        <button onClick={handleTelegramClick} className="action-button secondary">
                            <Send className="w-5 h-5 mr-2" />
                            Canal Telegram
                        </button>
                    )}
                    <button className="action-button danger" onClick={logoutUser}>
                        <LogOut className="w-5 h-5 mr-2" />
                        Déconnexion
                    </button>
                </div>
            </aside>

            <main className="dashboard-main">
                <Outlet />
            </main>

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