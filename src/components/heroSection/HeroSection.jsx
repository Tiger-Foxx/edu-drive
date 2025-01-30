import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, BookOpen, Target } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';
// import {Particles} from 'particles.js';
import './HeroSection.css';
import {checkUserPaid, getCurrentUser} from "@/services/userService.jsx";

const HeroSection = () => {
    const typedRef = useRef(null);
    const particlesRef = useRef(null);

    useEffect(() => {
        // Initialize Typed.js
        const typed = new Typed(typedRef.current, {
            strings: ['Formation', 'Certification', 'Service client 24/7', 'Payement simple'],
            typeSpeed: 50,
            backSpeed: 35,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });

        // Initialize particles.js
        if (particlesRef.current) {
            window.particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 75,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: '#60a5fa'
                    },
                    shape: {
                        type: 'circle'
                    },
                    opacity: {
                        value: 0.5,
                        random: false
                    },
                    size: {
                        value: 3,
                        random: true
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#60a5fa',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 5,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'grab'
                        },
                        resize: true
                    }
                },
                retina_detect: true
            });
        }

        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <section className="relative min-h-screen bg-gradient-to-br from-white via-blue-50 to-white overflow-hidden">
            {/* Particles background */}
            <div id="particles-js" ref={particlesRef} className="absolute inset-0" />

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-blue-100/30 blur-3xl animate-pulse-slow" />
                <div className="absolute -bottom-[40%] -right-[20%] w-[70%] h-[70%] rounded-full bg-blue-100/30 blur-3xl animate-pulse-slower" />

                {/* Geometric patterns */}
                <div className="absolute inset-0">
                    <div className="absolute top-[10%] left-[5%] w-4 h-4 border-2 border-blue-200 rounded-full animate-geometric-1" />
                    <div className="absolute top-[20%] right-[10%] w-6 h-6 border-2 border-blue-300 rotate-45 animate-geometric-2" />
                    <div className="absolute bottom-[15%] left-[15%] w-8 h-8 border-2 border-blue-400 rounded-lg animate-geometric-3" />
                </div>
            </div>

            {/* Main content */}
            <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left column - Content */}
                    <div className="space-y-8">
                        {/* Badge with glow effect */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-medium text-sm shadow-glow relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/0 via-blue-200/30 to-blue-100/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            <Users size={18} className="animate-bounce-subtle" />
                            <span>Rejoignez notre communauté d&#39;apprenants</span>
                        </div>

                        {/* Animated heading with Typed.js */}
                        <h1 className="text-5xl lg:text-5xl font-bold leading-tight intro">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 animate-gradient">
                                FormatPlus :
                            </span>
                            <br />
                            <span className="relative text-blue-600" ref={typedRef}></span>
                        </h1>

                        {/* Description with fade-in effect */}
                        <p className="text-lg text-gray-600 max-w-xl animate-fade-in">
                            { `Accédez à des formations de qualité et bénéficiez de notre système de parrainage exclusif avec jusqu'à 40% de commission.`  }
                        </p>

                        {/* CTA buttons with enhanced hover effects */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/signup"
                                className="group relative inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative flex items-center">
                                    Commencer maintenant
                                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                                </span>
                            </Link>
                            <Link
                                to="/referral"
                                className="group inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                            >
                                Programme de parrainage
                                <BookOpen className="ml-2 opacity-0 group-hover:opacity-100 transition-all" size={20} />
                            </Link>
                        </div>

                        {/* Enhanced Statistics with hover effects */}
                        <div className="grid grid-cols-3 gap-4 pt-8">
                            {[
                                { icon: BookOpen, value: "40%", label: "Commission parrainage" },
                                { icon: Target, value: "50+", label: "Formations" },
                                { icon: BookOpen, value: "24/7", label: "Accès illimité" }
                            ].map((stat, index) => (
                                <div key={index} className="group relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl blur-lg transform group-hover:scale-110 transition-transform" />
                                    <div className="relative text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-blue-100">
                                        <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                                        <div className="text-2xl font-bold text-blue-600 group-hover:scale-110 transition-transform">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-gray-600">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right column - Enhanced Image Section */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-2xl blur-2xl transform scale-95" />
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <img
                                src="HeroDrive.png"
                                alt="Education"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Enhanced Floating cards */}
                            <div className="absolute -left-6 top-1/4 animate-float">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl blur-lg" />
                                    <div className="relative p-4 bg-white rounded-xl shadow-lg max-w-[200px] backdrop-blur-sm border border-white/50">
                                        <div className="flex items-center gap-3">
                                            <Award className="text-blue-600 animate-pulse" size={24} />
                                            <div>
                                                <h4 className="font-semibold text-sm">Illimité</h4>
                                                <p className="text-xs text-gray-500">Un nombre alucinant</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -right-6 bottom-1/4 animate-float-delayed">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl blur-lg" />
                                    <div className="relative p-4 bg-white rounded-xl shadow-lg max-w-[200px] backdrop-blur-sm border border-white/50">
                                        <div className="flex items-center gap-3">
                                            <BookOpen className="text-blue-600 animate-pulse" size={24} />
                                            <div>
                                                <h4 className="font-semibold text-sm">Drive</h4>
                                                <p className="text-xs text-gray-500">Accès immédiat</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Corner decorations */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20 blur-2xl" />
                        <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full opacity-20 blur-2xl" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
