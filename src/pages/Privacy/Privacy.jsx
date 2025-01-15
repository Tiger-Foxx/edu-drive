import { useState, useEffect } from 'react';
import './Privacy.css';

const LegalPage = () => {
    const [activeSection, setActiveSection] = useState('privacy');
    const [isNavSticky, setIsNavSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const navOffset = document.getElementById('legal-nav').offsetTop;
            setIsNavSticky(window.scrollY > navOffset);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="legal-header-bg text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-6">Informations Légales</h1>
                    <p className="text-xl opacity-90">Politique de confidentialité, mentions légales et conditions d&#39;utilisation</p>
                </div>
            </header>

            {/* Navigation */}
            <nav
                id="legal-nav"
                className={`legal-nav py-4 border-b ${isNavSticky ? 'sticky top-0 z-50 shadow-md' : ''}`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { id: 'privacy', label: 'Politique de Confidentialité' },
                            { id: 'legal', label: 'Mentions Légales' },
                            { id: 'terms', label: 'Conditions d\'Utilisation' }
                        ].map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => scrollToSection(id)}
                                className={`px-6 py-2 rounded-lg transition-all ${
                                    activeSection === id
                                        ? 'section-active font-semibold'
                                        : 'text-gray-600 hover:text-blue-600'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto space-y-16">
                    {/* Politique de Confidentialité */}
                    <section id="privacy" className="legal-content">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Politique de Confidentialité</h2>
                        <div className="prose prose-lg max-w-none">
                            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Collecte des Informations</h3>
                            <p className="text-gray-600 mb-4">
                                Nous collectons les informations que vous nous fournissez directement, notamment lors de votre inscription :
                                nom, adresse e-mail et numéro de téléphone. Ces informations sont nécessaires pour vous fournir accès à nos services.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Utilisation des Données</h3>
                            <p className="text-gray-600 mb-4">
                                Vos données sont utilisées pour gérer votre compte, traiter vos paiements, et vous donner accès à nos formations.
                                Elles servent également à gérer le système de parrainage et à calculer les commissions.
                            </p>

                            <div className="section-divider my-8"></div>
                        </div>
                    </section>

                    {/* Mentions Légales */}
                    <section id="legal" className="legal-content">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Mentions Légales</h2>
                        <div className="prose prose-lg max-w-none">
                            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Éditeur du Site</h3>
                            <p className="text-gray-600 mb-4">
                                FormatPlus est une plateforme de formation en ligne. [informations légales spécifiques]
                            </p>

                            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Hébergement</h3>
                            <p className="text-gray-600 mb-4">
                                Le site est hébergé par [hébergeur], [Adresse hébergeur]
                            </p>

                            <div className="section-divider my-8"></div>
                        </div>
                    </section>

                    {/* Conditions d'Utilisation */}
                    <section id="terms" className="legal-content">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Conditions d&#39;Utilisation</h2>
                        <div className="prose prose-lg max-w-none">
                            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Inscription et Accès</h3>
                            <p className="text-gray-600 mb-4">
                                L&#39;inscription nécessite un code de parrainage valide. L&#39;accès aux formations est conditionné au paiement
                                des frais d&#39;inscription. Les utilisateurs s&#39;engagent à fournir des informations exactes.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Système de Parrainage</h3>
                            <p className="text-gray-600 mb-4">
                                Les parrains reçoivent 40% du montant payé par leurs filleuls directs et 10% pour les parrainages indirects.
                                Les retraits sont possibles à hauteur de 98% du solde disponible.
                            </p>
                        </div>
                    </section>
                </div>
            </div>

            {/* Footer CTA */}
            <div className="bg-blue-50 py-12 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                        Vous avez des questions ?
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Notre équipe de support est là pour vous aider à comprendre nos politiques
                    </p>
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Contacter le Support
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LegalPage;