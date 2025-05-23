import {checkUserPaid } from '@/services/userService.jsx';
import { 
    Users,
    DollarSign,
    TrendingUp,
    Gift,
    Clock,
    ChevronRight,
    Share2,
    Wallet
} from 'lucide-react';

const ReferralProgram = () => {
    const features = [
        {
            icon: DollarSign,
            title: "Gains Directs 40%",
            description: "Recevez instantanément 40% du montant de chaque inscription effectuée avec votre code parrain"
        },
        {
            icon: TrendingUp,
            title: "Gains Indirects 15% et 20%",
            description: "Gagnez 15% sur les parrainages effectués par vos filleuls directs et 20 % sur ceux effectués par leurs filleuls à eux"
        },
        {
            icon: Clock,
            title: "Paiements Rapides",
            description: "Retraits traités sous 24-48h ouvrées directement sur votre compte mobile money"
        },
        {
            icon: Gift,
            title: "Bonus Spéciaux",
            description: "Débloquez des bonus supplémentaires en atteignant certains paliers de parrainage"
        }
    ];

    const steps = [
        {
            number: "01",
            title: "Inscription",
            description: "Créez votre compte sur FormatPlus et accédez à votre tableau de bord"
        },
        {
            number: "02",
            title: "Obtention du Code",
            description: "Récupérez votre code de parrainage unique dans votre espace personnel"
        },
        {
            number: "03",
            title: "Partage",
            description: "Partagez votre code avec votre réseau via les réseaux sociaux, WhatsApp, etc."
        },
        {
            number: "04",
            title: "Gains",
            description: "Commencez à gagner dès que vos filleuls s'inscrivent avec votre code"
        }
    ];

    const examples = [
        {
            scenario: "Parrainage Direct",
            details: [
                { label: "Inscription filleul", value: "50 000 XAF" },
                { label: "Votre commission (40%)", value: "20 000 XAF" },
                { label: "Délai de paiement", value: "Instantané" }
            ]
        },
        {
            scenario: "Parrainage Indirect",
            details: [
                { label: "Inscription sous-filleul", value: "50 000 XAF" },
                { label: "Votre commission (15%)", value: "7 500 XAF" },
                { label: "Délai de paiement", value: "Instantané" }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                            Programme de Parrainage FormatPlus
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                            Gagnez de l'argent en partageant votre passion pour l'apprentissage
                        </p>
                        <div className="mt-10">
                            <button onClick={() => window.location.href = checkUserPaid()?'/dashboard/referral' : '/singup'} className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center">
                                Commencer maintenant
                                <ChevronRight className="ml-2 w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                            <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Comment ça marche */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Comment ça marche ?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Suivez ces étapes simples pour commencer à gagner de l'argent avec notre programme de parrainage
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                                <span className="text-2xl font-bold text-blue-600">{step.number}</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                            {index < steps.length - 1 && (
                                <ChevronRight className="hidden lg:block absolute top-8 -right-4 w-8 h-8 text-blue-300" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Exemples de gains */}
            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Exemples de Gains</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Découvrez combien vous pouvez gagner avec notre programme de parrainage
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {examples.map((example, index) => (
                            <div key={index} className="bg-blue-50 rounded-xl p-6">
                                <h3 className="text-xl font-semibold mb-6">{example.scenario}</h3>
                                <div className="space-y-4">
                                    {example.details.map((detail, idx) => (
                                        <div key={idx} className="flex justify-between items-center">
                                            <span className="text-gray-600">{detail.label}</span>
                                            <span className="font-semibold text-lg">{detail.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-white">
                        <h2 className="text-3xl font-bold mb-6">Prêt à commencer ?</h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Rejoignez notre programme de parrainage dès maintenant et commencez à gagner de l'argent en partageant FormatPlus
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={() => window.location.href = checkUserPaid()?'/dashboard/referral' : '/singup'} className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center">
                                <Share2 className="mr-2 w-5 h-5" />
                                Obtenir mon code parrain
                            </button>
                            <button onClick={() => window.location.href = checkUserPaid()?'/dashboard/referral' : '/singup'} className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center">
                                <Wallet className="mr-2 w-5 h-5" />
                                Voir mes gains
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralProgram;