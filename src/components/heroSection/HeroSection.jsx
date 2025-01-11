// src/components/HeroSection/HeroSection.jsx
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-badge">
            <span className="badge-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="badge-svg">
                <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
              </svg>
            </span>
                        Développez vos compétences avec nous
                    </div>

                    <h1 className="hero-title">
                        <span className="gradient-text">Maîtrisez</span> les compétences
                        <br />qui façonnent l&#39;avenir
                    </h1>

                    <p className="hero-description">
                        Accédez à des formations professionnelles de haute qualité et rejoignez
                        une communauté d&#39;apprenants passionnés. Investissez dans votre avenir
                        dès aujourd&#39;hui.
                    </p>

                    <div className="hero-cta">
                        <Link to="/signup" className="primary-button">
                            Commencer maintenant
                            <span className="button-icon">→</span>
                        </Link>
                        <Link to="/courses" className="secondary-button">
                            Découvrir les formations
                        </Link>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">15k+</span>
                            <span className="stat-label">Étudiants formés</span>
                        </div>
                        <div className="stat-separator" />
                        <div className="stat-item">
                            <span className="stat-number">95%</span>
                            <span className="stat-label">Taux de satisfaction</span>
                        </div>
                        <div className="stat-separator" />
                        <div className="stat-item">
                            <span className="stat-number">50+</span>
                            <span className="stat-label">Formations disponibles</span>
                        </div>
                    </div>
                </div>

                <div className="hero-image">
                    <div className="image-wrapper">
                        <img src="/api/placeholder/600/700" alt="Education" className="main-image" />
                        <div className="floating-card card-1">
                            <div className="card-icon">🎯</div>
                            <div className="card-content">
                                <h4>Objectifs personnalisés</h4>
                                <p>Suivez votre progression</p>
                            </div>
                        </div>
                        <div className="floating-card card-2">
                            <div className="card-icon">🏆</div>
                            <div className="card-content">
                                <h4>Certifications</h4>
                                <p>Reconnues par l&#39;industrie</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hero-shape-divider">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>
        </section>
    );
};

export default HeroSection;