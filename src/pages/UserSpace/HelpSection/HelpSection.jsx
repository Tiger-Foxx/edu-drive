import { useState } from 'react';
import {
    Search,
    ChevronRight,
    Users,
    Wallet,
    Shield,
    AlertCircle,
    Menu,
    X
} from 'lucide-react';

const HelpSection = () => {
    const [activeSection, setActiveSection] = useState('referral-system');
    const [searchQuery, setSearchQuery] = useState('');
    const [showMobileNav, setShowMobileNav] = useState(false);

    const helpSections = {
        'referral-system': {
            title: 'Système de Parrainage',
            icon: Users,
            content: [
                {
                    title: "Comment fonctionne le système de parrainage ?",
                    content: (
                        <div className="space-y-4">
                            <p>Notre système de parrainage vous permet de gagner de l&#39;argent en invitant
                                d&#39;autres personnes à rejoindre notre plateforme. Voici comment cela fonctionne :</p>

                            <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                                <h4 className="font-semibold text-blue-800">Gains Directs (40%)</h4>
                                <p>Pour chaque personne qui s&#39;inscrit avec votre code de parrainage et paie son
                                    inscription :</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Vous recevez 40% du montant de leur inscription</li>
                                    <li>Le gain est automatiquement crédité dans votre porte-monnaie</li>
                                    <li>Aucune limite sur le nombre de filleuls directs</li>
                                </ul>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg space-y-2">
                                <h4 className="font-semibold text-green-800">Gains Indirects (15%)</h4>
                                <p>Lorsque vos filleuls parrainent à leur tour :</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Vous gagnez 15% sur leurs parrainages</li>
                                    <li>Ces gains s&#39;ajoutent automatiquement à votre solde</li>
                                    <li>Revenus passifs sur plusieurs niveaux</li>
                                </ul>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg space-y-2">
                                <h4 className="font-semibold text-green-800">Gains Indirects de vos filleuls (20%)</h4>
                                <p>et Lorsque les filleurs de vos filleuls parrainent à leur tour :</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Vous gagnez 20% sur leurs parrainages</li>
                                    <li>Ces gains s&#39;ajoutent automatiquement à votre solde</li>
                                    <li>Revenus passifs sur plusieurs niveaux</li>
                                </ul>
                            </div>

                            <div className="bg-purple-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-purple-800">Exemple Concret</h4>
                                <p>Si un filleul paie 50 000 XAF :</p>
                                <div className="mt-2 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span>Votre gain direct (40%)</span>
                                        <span className="font-semibold">20 000 XAF</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Gain sur leurs filleuls (15%)</span>
                                        <span className="font-semibold">7 500 XAF</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                },
                {
                    title: "Comment obtenir mon code de parrainage ?",
                    content: (
                        <div className="space-y-4">
                            <p>Votre code de parrainage est automatiquement généré lors de votre inscription. Pour le
                                trouver :</p>

                            <ol className="space-y-4">
                                <li className="flex items-start">
                                    <div
                                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">1
                                    </div>
                                    <div className="ml-4">
                                        <p className="font-medium">Accédez à votre tableau de bord</p>
                                        <p className="text-gray-600">Connectez-vous à votre compte et accédez à la section &#34;Parrainage</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">2</div>
                                    <div className="ml-4">
                                        <p className="font-medium">Localisez votre code</p>
                                        <p className="text-gray-600">Votre code est affiché dans une zone dédiée, facilement copiable</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">3</div>
                                    <div className="ml-4">
                                        <p className="font-medium">Partagez votre code</p>
                                        <p className="text-gray-600">Utilisez le bouton de copie pour partager facilement votre code</p>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    )
                }
            ]
        },
        'withdrawals': {
            title: 'Retraits',
            icon: Wallet,
            content: [
                {
                    title: "Comment effectuer un retrait ?",
                    content: (
                        <div className="space-y-4">
                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <h4 className="flex items-center text-yellow-800 font-semibold">
                                    <AlertCircle className="w-5 h-5 mr-2" />
                                    Important à savoir
                                </h4>
                                <p className="mt-2">Le montant maximum de retrait est de 98% de votre solde disponible.</p>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-semibold">Étapes pour effectuer un retrait :</h4>
                                <ol className="space-y-4">
                                    <li className="flex items-start">
                                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">1</div>
                                        <div className="ml-4">
                                            <p className="font-medium">Accédez à la section Parrainage&#34;</p>
                                            <p className="text-gray-600">Cliquez sur le bouton &#34;Demander un retrait</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">2</div>
                                        <div className="ml-4">
                                            <p className="font-medium">Remplissez le formulaire</p>
                                            <ul className="list-disc list-inside mt-2 text-gray-600">
                                                <li>Montant souhaité (maximum 98% du solde)</li>
                                                <li>Nom du bénéficiaire</li>
                                                <li>Numéro de téléphone du bénéficiaire</li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">3</div>
                                        <div className="ml-4">
                                            <p className="font-medium">Confirmez la demande</p>
                                            <p className="text-gray-600">Vérifiez les informations et validez</p>
                                        </div>
                                    </li>
                                </ol>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-green-800">Délais de traitement</h4>
                                <p className="mt-2">Les retraits sont traités sous 24-48h ouvrées.</p>
                            </div>
                        </div>
                    )
                }
            ]
        },
        'security': {
            title: 'Sécurité',
            icon: Shield,
            content: [
                {
                    title: "Conseils de sécurité",
                    content: (
                        <div className="space-y-4">
                            <div className="bg-red-50 p-4 rounded-lg">
                                <h4 className="text-red-800 font-semibold flex items-center">
                                    <AlertCircle className="w-5 h-5 mr-2" />
                                    Avertissement Important
                                </h4>
                                <p className="mt-2">Ne partagez jamais vos informations personnelles de connexion avec qui que ce soit.</p>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-semibold">Bonnes pratiques de sécurité :</h4>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                                        <div className="flex items-center mb-2">
                                            <Shield className="w-5 h-5 text-blue-600 mr-2" />
                                            <h5 className="font-medium">Mot de passe fort</h5>
                                        </div>
                                        <p className="text-gray-600">Utilisez une combinaison de lettres, chiffres et caractères spéciaux</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                                        <div className="flex items-center mb-2">
                                            <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
                                            <h5 className="font-medium">Connexion sécurisée</h5>
                                        </div>
                                        <p className="text-gray-600">Déconnectez-vous toujours après utilisation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            ]
        }
    };

    // Filtrage du contenu basé sur la recherche
    const filteredContent = Object.entries(helpSections).reduce((acc, [key, section]) => {
        const filteredArticles = section.content.filter(article =>
            article.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filteredArticles.length > 0) {
            acc[key] = { ...section, content: filteredArticles };
        }
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            {/* Barre de recherche fixe en haut */}
            <div className="sticky top-0 z-40 bg-gray-50 pt-2 pb-4">
                <div className="relative max-w-3xl mx-auto">
                    <input
                        type="text"
                        placeholder="Rechercher dans l'aide..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            {/* Menu mobile et navigation */}
            <div className="relative max-w-7xl mx-auto">
                {/* Bouton menu mobile */}
                <button
                    onClick={() => setShowMobileNav(!showMobileNav)}
                    className="fixed right-4 top-20 z-50 lg:hidden bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                >
                    {showMobileNav ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Overlay mobile */}
                {showMobileNav && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={() => setShowMobileNav(false)}
                    />
                )}

                <div className="lg:grid lg:grid-cols-4 lg:gap-8">
                    {/* Navigation */}
                    <nav className={`
                        fixed lg:relative inset-y-0 right-0 z-40 w-64 lg:w-auto
                        transform ${showMobileNav ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0
                        transition-transform duration-200 ease-in-out
                        bg-white lg:bg-transparent
                        pt-20 lg:pt-0
                        shadow-lg lg:shadow-none
                        lg:col-span-1
                    `}>
                        <div className="bg-white rounded-xl p-4 shadow-sm sticky top-24">
                            {Object.entries(helpSections).map(([key, section]) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        setActiveSection(key);
                                        setShowMobileNav(false);
                                    }}
                                    className={`
                                        w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2
                                        transition-colors duration-200
                                        ${activeSection === key
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }
                                    `}
                                >
                                    <section.icon className="w-5 h-5" />
                                    <span className="font-medium">{section.title}</span>
                                    <ChevronRight className="w-4 h-4 ml-auto" />
                                </button>
                            ))}
                        </div>
                    </nav>

                    {/* Contenu */}
                    <div className="lg:col-span-3 mt-4 lg:mt-0">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            {Object.entries(filteredContent).map(([key, section]) => (
                                <div
                                    key={key}
                                    className={activeSection === key ? 'block' : 'hidden'}
                                >
                                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                                        <section.icon className="w-6 h-6 mr-3 text-blue-600" />
                                        {section.title}
                                    </h2>

                                    <div className="space-y-8">
                                        {section.content.map((article, index) => (
                                            <article key={index} className="prose prose-blue max-w-none">
                                                <h3 className="text-xl font-semibold mb-4">{article.title}</h3>
                                                <div>{article.content}</div>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpSection;