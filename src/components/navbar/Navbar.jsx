import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  Users,
  BookOpen,
  User2,
  SearchIcon,
  HelpCircle,
  Home,

} from "lucide-react";
import { checkUserPaid, logoutUser } from "@/services/userService.jsx";
import logo from "../../assets/Google_Drive_logo.png";
import { SERVER_BASE_URL } from "@/Config.jsx";
import { getCurrentUser } from './../../services/userService';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [footerInfo, setFooterInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isUserLoggedIn = checkUserPaid();
  const CurrentUser=getCurrentUser();

  const menuItemsNotLoggedIn = [
    {
      label: "Accueil",
      icon: <Home className="w-4 h-4" />,
      path: "/", // Ajoutez un chemin direct pour les éléments sans sous-menu
    },
    {
      label: "Formations",
      icon: <BookOpen className="w-4 h-4" />,
      submenu: [
        { label: "Catalogue", path: "/courses" },
        { label: "Nouveautés", path: "/courses" },
        { label: "Les plus populaires", path: "/courses" },
      ],
    },
    {
      label: "A propos",
      icon: <SearchIcon className="w-4 h-4" />,
      submenu: [
        { label: "A propos", path: "/about" },
        { label: "Mentions légales", path: "/privacy" }
      ],
    },
    {
      label: "Aide",
      icon: <HelpCircle className="w-4 h-4" />,
      submenu: [
        { label: "Comment ça marche ?", path: "/help" },
        { label: "Programme de parrainage", path: "/referral" }
      ],
    },
  ];

  const getMenuItemsLoggedIn = (telegramUrl) => [
    {
      label: "Accueil",
      icon: <Home className="w-4 h-4" />,
      path: "/", // Ajoutez un chemin direct pour les éléments sans sous-menu
    },
    {
      label: "Formations",
      icon: <BookOpen className="w-4 h-4" />,
      submenu: [
        { label: "Catalogue", path: "/courses" },
        { label: "Nouveautés", path: "/courses" },
        { label: "Les plus populaires", path: "/courses" },
      ],
    },
    {
      label: "Mon espace",
      icon: <User2 className="w-4 h-4" />,
      submenu: [
        { label: "Mon profil", path: "/dashboard/profile" },
        { label: "Aide", path: "/dashboard/help" },
        { label: "Parrainage", path: "/dashboard/referral" },
      ],
    },
    ...(telegramUrl ? [{
      label: "Telegram VIP",
      icon: <Users className="w-4 h-4" />,
      submenu: [{ label: "Canal Telegram", path: (CurrentUser.telegram_group_joined) ? telegramUrl : "/telegram-subscribe" }],
    }] : []),
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  const handleMouseEnter = (index) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setActiveSubmenu(index);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveSubmenu(null);
    }, 300);
    setHoverTimeout(timeout);
  };

  const menuItems = isUserLoggedIn
      ? getMenuItemsLoggedIn(footerInfo?.telegram_canal)
      : menuItemsNotLoggedIn;


      const renderMenuItems = (items) => (
        <ul className="flex items-center gap-8 mr-8">
          {items.map((item, index) => (
            <li
              key={index}
              className="relative group"
              onMouseEnter={() => item.submenu && handleMouseEnter(index)}
              onMouseLeave={() => item.submenu && handleMouseLeave()}
            >
              {item.path ? (
                <Link
                  to={item.path}
                  className="flex items-center gap-2 px-1 py-2 text-gray-700
                             hover:text-blue-600 transition-colors"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <button
                  className="flex items-center gap-2 px-1 py-2 text-gray-700
                             hover:text-blue-600 transition-colors"
                >
                  {item.icon}
                  <span>{item.label}</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>
              )}
      
              {item.submenu && (
                <div
                  className={`absolute top-full right-0 bg-white rounded-xl shadow-xl
                              border border-gray-100 min-w-[220px] py-2 mt-2
                              transition-all duration-200 transform
                              ${activeSubmenu === index
                                ? "opacity-100 translate-y-0 visible"
                                : "opacity-0 translate-y-2 invisible"
                              }`}
                >
                  {item.submenu.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subItem.path}
                      className="block px-4 py-2.5 text-sm text-gray-700
                                 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      );



  const renderAuthButtons = () => {
    if (isUserLoggedIn) {
      return (
          <div className="flex items-center gap-3">
            <Link
                to="/signin"
                className="px-4 py-2 text-sm font-medium text-white bg-red-600
                           hover:bg-red-700 rounded-lg transition-colors"
                onClick={logoutUser}
            >
              Déconnexion
            </Link>
          </div>
      );
    }
    return (
        <div className="flex items-center gap-3">
          <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-gray-700
                         hover:text-blue-600 transition-colors border-blue-600 border-2 rounded-lg"
          >
            Connexion
          </Link>
          <Link
              to="/signup"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600
                         hover:bg-blue-700 rounded-lg transition-colors"
          >
            S'inscrire
          </Link>
        </div>
    );
  };



  const renderMobileMenu = () => (
    <div
      className={`fixed inset-0 z-40 xl:hidden transition-all duration-300
                  ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={() => setIsMenuOpen(false)}
      />
  
      <div
        className={`absolute top-0 right-0 w-80 h-full bg-white shadow-2xl 
                    py-20 px-6 transition-transform duration-300 transform
                    ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {menuItems.map((item, index) => (
          <div key={index} className="py-2">
            {item.path ? (
              <Link
                to={item.path}
                className="flex items-center justify-between w-full py-2 text-gray-700
                           hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              </Link>
            ) : (
              <>
                <button
                  onClick={() => setActiveSubmenu(activeSubmenu === index ? null : index)}
                  className="flex items-center justify-between w-full py-2 text-gray-700
                             hover:text-blue-600 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200
                                ${activeSubmenu === index ? "rotate-180" : ""}`}
                  />
                </button>
  
                {item.submenu && (
                  <div
                    className={`pl-4 space-y-1 overflow-hidden transition-all duration-200
                                ${activeSubmenu === index
                        ? "max-h-screen opacity-100 mt-2"
                        : "max-h-0 opacity-0"
                      }`}
                  >
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className="block py-2 text-sm text-gray-600 hover:text-blue-600
                                 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
  
        {renderAuthButtons()}
      </div>
    </div>
  );


  if (isLoading) {
    return <div className="h-20 bg-white" />; // Placeholder during loading
  }

  return (
      <>
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
                    ${scrolled
                ? "h-16 bg-white shadow-md"
                : "h-20 bg-white/80 backdrop-blur-md"
            }`}
        >
          <div className="max-w-7xl mx-auto px-4 h-full">
            <div className="flex items-center justify-between h-full">
              <Link
                  to="/"
                  className="flex items-center gap-2"
                  onClick={() => window.location.href = '/'}
              >
                <img src={logo} alt="Logo" className="h-8 w-8" />
                <span className="font-bold text-xl text-gray-900">
                                FormatPlus
                            </span>
              </Link>

              <div className="hidden xl:flex items-center justify-end flex-1">
                {renderMenuItems(menuItems)}
                {renderAuthButtons()}
              </div>

              <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="xl:hidden p-2 text-gray-700 hover:text-blue-600
                               transition-colors"
                  aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {renderMobileMenu()}
      </>
  );
};

export default Navbar;