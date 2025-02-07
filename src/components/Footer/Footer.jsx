import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight, Send } from 'lucide-react';
import {SERVER_BASE_URL} from "@/Config.jsx";

const Footer = () => {
    const [footerInfo, setFooterInfo] = useState(null);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        fetch(`${SERVER_BASE_URL}/footer-info/`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setFooterInfo(data[0]); // Prendre le premier élément de la liste
                }
            })
            .catch(error => console.error('Error fetching footer info:', error));
    }, []);

    if (!footerInfo) {
        return null; // Ou un loader si vous préférez
    }

    return (
        <footer className="bg-gradient-to-br from-white to-blue-50">
            {/* Vague décorative */}
            <div className="w-full">
                <svg className="w-full h-12 fill-current text-blue-600/10" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
                {/* Section principale */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Colonne À propos */}
                    <div className="space-y-6">
                        <div>
                            <img src="Google_Drive_logo.png" alt="Logo" className="h-8" />
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Nous formons la prochaine génération de talents numériques avec une approche innovante et personnalisée.
                        </p>
                        <div className="flex space-x-4">
                            {footerInfo.facebook && (
                                <a href={footerInfo.facebook} className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors duration-200">
                                    <Facebook size={20} />
                                </a>
                            )}
                            {footerInfo.twitter && (
                                <a href={footerInfo.twitter} className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors duration-200">
                                    <Twitter size={20} />
                                </a>
                            )}
                            {footerInfo.linkedin && (
                                <a href={footerInfo.linkedin} className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors duration-200">
                                    <Linkedin size={20} />
                                </a>
                            )}
                            {footerInfo.instagram && (
                                <a href={footerInfo.instagram} className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors duration-200">
                                    <Instagram size={20} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Colonne Contact */}
                    <div>
                        <h3 className="text-gray-900 font-semibold text-lg mb-6">Contact</h3>
                        <ul className="space-y-4">
                            {footerInfo.phone && (
                                <li>
                                    <a href={`tel:${footerInfo.phone}`}
                                       className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center">
                                        <Phone size={20} className="mr-3 text-blue-600"/>
                                        {footerInfo.phone}
                                    </a>
                                </li>
                            )}
                            {footerInfo.telegram && (
                                <li>
                                    <a href={`https://t.me/${footerInfo.telegram}`}
                                       className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center">
                                        <Send size={20} className="mr-3 text-blue-600"/>
                                        {footerInfo.telegram}
                                    </a>
                                </li>
                            )}
                            {footerInfo.email && (
                                <li>
                                    <a href={`mailto:${footerInfo.email}`}
                                       className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center">
                                        <Mail size={20} className="mr-3 text-blue-600"/>
                                        {footerInfo.email}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Séparateur */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

                {/* Copyright et liens légaux */}
                <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>© {currentYear} Fox. Tous droits réservés.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/privacy" onClick={() => window.location.href = '/privacy'} className="hover:text-blue-600 transition-colors duration-200">
                            Politique de confidentialité
                        </Link>
                        <Link to="/privacy"  onClick={() => window.location.href = '/privacy'} className="hover:text-blue-600 transition-colors duration-200">
                            Conditions d&#39;utilisation
                        </Link>
                        <Link to="/privacy" onClick={() => window.location.href = '/privacy'} className="hover:text-blue-600 transition-colors duration-200">
                            Mentions légales
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;