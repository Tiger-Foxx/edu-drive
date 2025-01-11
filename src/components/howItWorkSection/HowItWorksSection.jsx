// src/components/howItWorksSection/HowItWorksSection.jsx
import { BookOpen, CreditCard, GraduationCap, ArrowRight, Users, Target, Award } from 'lucide-react';
import './HowItWorksSection.css';
import {useEffect, useRef} from "react";

const HowItWorksSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1
        };

        const handleIntersect = entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        const animatedElements = sectionRef.current.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const stats = [
        { icon: <Users className="w-6 h-6" />, value: "1M+", label: "Étudiants" },
        { icon: <Target className="w-6 h-6" />, value: "95%", label: "Taux de réussite" },
        { icon: <Award className="w-6 h-6" />, value: "500+", label: "Formations" }
    ];

    const steps = [
        {
            icon: <BookOpen className="w-8 h-8" />,
            title: "Explorez nos formations",
            description: "Parcourez notre catalogue complet de formations professionnelles et choisissez celle qui correspond à vos objectifs de carrière.",
            gradient: "from-blue-400 to-blue-600"
        },
        {
            icon: <CreditCard className="w-8 h-8" />,
            title: "Inscription simple",
            description: "Procédez à votre inscription avec un paiement sécurisé et accédez instantanément à votre espace de formation.",
            gradient: "from-blue-500 to-blue-700"
        },
        {
            icon: <GraduationCap className="w-8 h-8" />,
            title: "Commencez à apprendre",
            description: "Accédez à vos formations sur Google Drive et développez vos compétences à votre rythme avec un support continu.",
            gradient: "from-blue-600 to-blue-800"
        }
    ];

    return (
        <section ref={sectionRef} className="how-it-works-section overflow-hidden">
            {/* About Section */}
            <div className="about-container">
                <div className="image-container animate-on-scroll slide-right">
                    <div className="image-wrapper">
                        <img
                            src="/api/placeholder/600/400"
                            alt="Platform preview"
                            className="main-image"
                        />
                        <div className="floating-card stats-card">
                            {stats.map((stat, index) => (
                                <div key={index} className="stat-item">
                                    {stat.icon}
                                    <span className="stat-value">{stat.value}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="content-container animate-on-scroll slide-left">
                    <h2 className="section-title">
                        <span className="highlight">Transformez</span> votre avenir
                    </h2>
                    <p className="section-description">
                        Accédez à des formations d&#39;excellence et rejoignez une communauté dynamique d&#39;apprenants.
                        Notre plateforme vous offre un accès illimité aux meilleures ressources éducatives.
                    </p>
                    <button className="cta-button">
                        <span>Découvrir nos formations</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* How it Works Section */}
            <div className="process-section">
                <div className="section-header animate-on-scroll fade-up">
                    <h2 className="section-title">Comment ça marche</h2>
                    <p className="section-subtitle">
                        Un processus simplifié en trois étapes pour commencer votre parcours d&#39;apprentissage
                    </p>
                </div>

                <div className="steps-container">
                    <div className="steps-grid">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`step-card animate-on-scroll slide-up delay-${index}`}
                            >
                                <div className={`icon-wrapper bg-gradient-to-r ${step.gradient}`}>
                                    {step.icon}
                                </div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-description">{step.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="illustration-container animate-on-scroll slide-left">
                        <img
                            src="/api/placeholder/500/600"
                            alt="Learning process"
                            className="illustration-image"
                        />
                        <div className="floating-card feature-card">
                            <div className="feature-content">
                                <span className="feature-title">Accès Premium</span>
                                <span className="feature-subtitle">Formations illimitées</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;