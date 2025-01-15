import './AboutPage.css';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative hero-gradient text-white py-24 overflow-hidden">
                <div className="africa-map-bg absolute inset-0"/>
                <div className="container mx-auto px-4 relative">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-up">
                        À Propos de FormatPlus
                    </h1>
                    <p className="text-xl md:text-2xl max-w-2xl animate-fade-up stagger-delay-1">
                        Façonnons ensemble l&#39;avenir numérique de l&#39;Afrique
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 animate-fade-up stagger-delay-1">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Mission</h2>
                            <p className="text-lg text-gray-600">
                                Chez FormatPlus, nous sommes déterminés à promouvoir l&#39;éducation numérique en Afrique
                                en proposant des formations de haute qualité, conçues par des experts dans leurs domaines respectifs.
                            </p>
                            <div className="section-divider"></div>
                            <p className="text-lg text-gray-600">
                                Notre objectif est de vous aider à acquérir de nouvelles compétences et à rentabiliser
                                votre temps passé en ligne.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                {
                                    title: "Formations Expertes",
                                    description: "Contenus de haute qualité conçus par des professionnels"
                                },
                                {
                                    title: "Prix Accessibles",
                                    description: "Formations abordables pour tous les budgets"
                                },
                                {
                                    title: "Système de Parrainage",
                                    description: "Gagnez en partageant vos connaissances"
                                },
                                {
                                    title: "Communauté Active",
                                    description: "Échangez avec d'autres apprenants passionnés"
                                }
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className={`feature-card bg-white p-6 rounded-xl shadow-lg animate-fade-up stagger-delay-${index + 1}`}
                                >
                                    <h3 className="text-xl font-semibold text-white-900 mb-3">{feature.title}</h3>
                                    <p className="text-white-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-16 px-4 bg-blue-50">
                <div className="container mx-auto max-w-6xl">
                    <div className="quote-bg rounded-2xl bg-white p-8 md:p-12 shadow-xl">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Vision pour l&#39;Afrique</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <p className="text-lg text-gray-600">
                                    Nous avons mis en place un système de parrainage innovant qui vous permet
                                    non seulement d&#39;apprendre, mais également de gagner en référençant d&#39;autres personnes.
                                </p>
                                <button className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                    Rejoignez l&#39;aventure
                                </button>
                            </div>
                            <div className="space-y-4">
                                <p className="text-lg text-gray-600">
                                    Notre mission est de fournir les outils et les ressources nécessaires pour que
                                    les Africains puissent pleinement bénéficier des opportunités offertes par le numérique.
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto max-w-6xl text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Prêt à commencer votre voyage numérique ?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Rejoignez notre communauté dynamique et contribuez à faire de l&#39;Afrique
                        un acteur majeur dans l&#39;évolution du numérique.
                    </p>
                    <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg">
                        Commencer maintenant
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;