import  { useState } from 'react';
import { Lock, PlayCircle, FileText, ChevronRight, ExternalLink, BookOpen, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CourseDetailPage.css';

const CourseDetailPage = () => {
    const [isAuthenticated] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
            {/* Hero Video Section */}
            <div className="w-full bg-gradient-to-br from-blue-900 to-blue-600 py-12">
                <div className="max-w-[1400px] mx-auto px-4">
                    <div className="grid lg:grid-cols-5 gap-8 items-start">
                        {/* Video Player Column */}
                        <div className="lg:col-span-3">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                                <div className="aspect-w-16 aspect-h-9">

                                        <video
                                            className="w-full h-full object-cover"
                                            controls
                                            poster="Macbook-Air-localhost.mp4"
                                        >
                                            <source src="Macbook-Air-localhost.mp4" type="video/mp4" />
                                            Votre navigateur ne supporte pas la lecture vidéo.
                                        </video>

                                </div>
                            </div>
                        </div>

                        {/* Course Info Column */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100">
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                    Formation Marketing Digital
                                </h1>
                                <div className="flex flex-wrap gap-4 mb-6">
                                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700">
                                        <Clock className="w-4 h-4 mr-2" />
                                        12h de formation
                                    </span>
                                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700">
                                        <BookOpen className="w-4 h-4 mr-2" />
                                        4 modules
                                    </span>

                                </div>

                                {isAuthenticated ? (
                                    <a
                                        href="https://drive.google.com/yourlink"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700
                                        text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300
                                        hover:shadow-lg mb-6"
                                    >
                                        <ExternalLink className="w-5 h-5 mr-2" />
                                        Accéder à la formation complète
                                    </a>
                                ) : (
                                    <Link
                                        to="/signup"
                                        className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700
                                        text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300
                                        hover:shadow-lg mb-6"
                                    >
                                        S&#39;inscrire maintenant
                                    </Link>
                                )}

                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        Ce que vous apprendrez
                                    </h2>
                                    <ul className="space-y-3">
                                        {[
                                            'Maîtrise complète du SEO',
                                            'Stratégies de content marketing',
                                            'Publicité sur les réseaux sociaux',
                                            'Analyse de données et KPIs'
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-start">
                                                <ChevronRight className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Content Section */}
            <div className="max-w-[1400px] mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Description */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900">
                                Description de la formation
                            </h2>
                            <div className="prose prose-lg max-w-none text-gray-700">
                                <p>
                                    Cette formation complète en marketing digital vous permettra de maîtriser
                                    les aspects essentiels du marketing en ligne. Vous apprendrez à créer et
                                    mettre en œuvre des stratégies efficaces pour développer votre présence digitale.
                                </p>
                                <p className="mt-4">
                                    Que vous soyez débutant ou que vous ayez déjà des bases en marketing digital,
                                    cette formation vous donnera les outils et les connaissances nécessaires pour
                                    réussir dans ce domaine en constante évolution.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                                <h3 className="text-xl font-bold mb-4 text-gray-900">
                                    Ce qui est inclus
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        { icon: PlayCircle, text: '12 heures de vidéo HD' },
                                        { icon: FileText, text: 'Resources téléchargeables' },
                                        { icon: ExternalLink, text: 'Accès à vie' }
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-center text-gray-700">
                                            <item.icon className="w-5 h-5 text-blue-600 mr-3" />
                                            {item.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {!isAuthenticated && (
                                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-xl">
                                    <h3 className="text-xl font-bold mb-3">
                                        Commencez maintenant
                                    </h3>
                                    <p className="mb-4 opacity-90">
                                        Inscrivez-vous pour accéder à cette formation et à tout notre catalogue
                                    </p>
                                    <Link
                                        to="/signup"
                                        className="w-full inline-flex items-center justify-center bg-white text-blue-600
                                        font-semibold px-6 py-3 rounded-xl transition-all duration-300
                                        hover:shadow-lg hover:bg-blue-50"
                                    >
                                        S&#39;inscrire
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailPage;