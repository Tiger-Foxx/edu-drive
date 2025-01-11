import { ArrowRight, BookOpen, CreditCard, GraduationCap } from 'lucide-react';

const HowItWorksSection = () => {
    const steps = [
        {
            icon: <BookOpen className="w-10 h-10 text-blue-600" />,
            title: "Sélectionnez une formation",
            description: "Parcourez notre catalogue de formations et choisissez celle qui correspond à vos objectifs d'apprentissage."
        },
        {
            icon: <CreditCard className="w-10 h-10 text-blue-600" />,
            title: "Effectuez le paiement",
            description: "Procédez à l'inscription et au paiement sécurisé pour débloquer l'accès à votre formation."
        },
        {
            icon: <GraduationCap className="w-10 h-10 text-blue-600" />,
            title: "Commencez à apprendre",
            description: "Accédez immédiatement à votre formation sur Google Drive et développez vos compétences."
        }
    ];

    return (
        <div className="bg-white py-16 px-4 overflow-hidden">
            {/* About Section */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                    <img
                        src="/api/placeholder/600/400"
                        alt="Education platform"
                        className="rounded-lg shadow-xl w-full object-cover"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-lg shadow-lg hidden md:block">
                        <p className="text-3xl font-bold">1M+</p>
                        <p className="text-sm">Étudiants formés</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-4xl font-bold text-gray-900">Formez-vous pour réussir</h2>
                    <p className="text-lg text-gray-600">
                        Accédez à des formations de qualité et rejoignez notre communauté d'apprenants motivés.
                        Développez vos compétences à votre rythme avec un accès illimité aux ressources.
                    </p>
                    <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Explorer les formations
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* How it Works Section */}
            <div className="mt-32">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Comment ça marche</h2>
                    <p className="text-lg text-gray-600">
                        Un processus simple en trois étapes pour commencer votre parcours d'apprentissage
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                    <div className="space-y-8">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`bg-white p-6 rounded-lg ${
                                    index === 0 ? 'shadow-xl' : 'border border-gray-200'
                                } transform hover:scale-105 transition-transform duration-300`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                        {step.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="relative">
                        <img
                            src="/api/placeholder/500/600"
                            alt="Learning process"
                            className="rounded-lg shadow-xl w-full object-cover"
                        />
                        <div className="absolute -top-6 -left-6 bg-blue-100 p-4 rounded-lg hidden md:block">
                            <div className="bg-blue-600 text-white p-4 rounded-lg">
                                <p className="text-lg font-semibold">Accès illimité</p>
                                <p className="text-sm">aux formations</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorksSection;