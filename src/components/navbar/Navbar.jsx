import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  Users,
  BookOpen,
  Gift,
  User2,
  SearchIcon,
} from "lucide-react";
import { checkUserPaid } from "@/services/userService.jsx";
import logo from "../../assets/Google_Drive_logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null); // Pour gérer le délai de fermeture

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
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
      path: "/about",
      submenu: [{ label: "A propos", path: "/about" }],
    },
    {
      label: "Mon espace",
      icon: <User2 className="w-4 h-4" />,
      submenu: [
        { label: "Aide", path: "/dashboard/help" },
        { label: "Parrainage", path: "/dashboard/referral" },
        { label: "Mon Profile", path: "/dashboard/profile" },
      ],
    },
    {
      label: "Communauté",
      icon: <Users className="w-4 h-4" />,
      submenu: [{ label: "Canal Telegram", path: "/telegram" }],
    },
  ];

  const handleMouseEnter = (index) => {
    if (hoverTimeout) clearTimeout(hoverTimeout); // Annule tout délai existant
    setActiveSubmenu(index);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveSubmenu(null);
    }, 300); // Délai avant de fermer le sous-menu
    setHoverTimeout(timeout);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
                ${
                  scrolled
                    ? "h-16 bg-white shadow-md"
                    : "h-20 bg-white/80 backdrop-blur-md"
                }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
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

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center justify-end flex-1">
              <ul className="flex items-center gap-8 mr-8">
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className="flex items-center gap-2 px-1 py-2 text-gray-700
                                                     hover:text-blue-600 transition-colors"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                    </button>

                    <div
                      className={`absolute top-full right-0 bg-white rounded-xl shadow-xl
                                                       border border-gray-100 min-w-[220px] py-2 mt-2
                                                       transition-all duration-200 transform
                                                       ${
                                                         activeSubmenu === index
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
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3">
                {!checkUserPaid() && (
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700
                                              hover:text-blue-600 transition-colors"
                  >
                    Connexion
                  </Link>
                )}
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600
                                             hover:bg-blue-700 rounded-lg transition-colors"
                >
                  S&#39;inscrire
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
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
      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 xl:hidden transition-all duration-300
                           ${
                             isMenuOpen
                               ? "opacity-100 visible"
                               : "opacity-0 invisible"
                           }`}
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 w-80 h-full bg-white shadow-2xl 
                               py-20 px-6 transition-transform duration-300 transform
                               ${
                                 isMenuOpen
                                   ? "translate-x-0"
                                   : "translate-x-full"
                               }`}
        >
          {menuItems.map((item, index) => (
            <div key={index} className="py-2">
              <button
                onClick={() =>
                  setActiveSubmenu(activeSubmenu === index ? null : index)
                }
                className="flex items-center justify-between w-full py-2 text-gray-700
                                         hover:text-blue-600 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200
                                              ${
                                                activeSubmenu === index
                                                  ? "rotate-180"
                                                  : ""
                                              }`}
                />
              </button>

              <div
                className={`pl-4 space-y-1 overflow-hidden transition-all duration-200
                                           ${
                                             activeSubmenu === index
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
            </div>
          ))}

          <div className="mt-6 space-y-3">
            <Link
              to="/login"
              className="block w-full px-4 py-2 text-center text-sm font-medium
                                     text-gray-700 border border-gray-200 rounded-lg
                                     hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Connexion
            </Link>
            <Link
              to="/signup"
              className="block w-full px-4 py-2 text-center text-sm font-medium
                                     text-white bg-blue-600 rounded-lg hover:bg-blue-700
                                     transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              S&#39;inscrire
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
