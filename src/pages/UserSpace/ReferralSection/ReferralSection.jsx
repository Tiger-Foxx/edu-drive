import  { useState} from 'react';
import {
    Copy,
    CheckCircle,
    Users,
    Wallet,
    ArrowDownCircle,
    TrendingUp,
    X
} from 'lucide-react';
import './ReferralSection.css';
import {Alert, AlertDescription} from "../../../components/ui/alert";

const ReferralSection = () => {
    const [showWithdrawal, setShowWithdrawal] = useState(false);
    const [copied, setCopied] = useState(false);
    const [withdrawalAmount, setWithdrawalAmount] = useState('');
    const [beneficiaryName, setBeneficiaryName] = useState('');
    const [beneficiaryNumber, setBeneficiaryNumber] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const referralCode = "REF123456";
    const balance = 250000;
    const maxWithdrawal = balance * 0.98;

    const stats = [
        { label: 'Filleuls Directs', value: 12, icon: Users, color: 'text-blue-600' },
        { label: 'Filleuls Indirects', value: 35, icon: TrendingUp, color: 'text-green-600' },
        { label: 'Gains du Mois', value: '150,000 XAF', icon: Wallet, color: 'text-purple-600' }
    ];

    const referrals = [
        { name: 'Jean Dupont', date: '2024-01-15', amount: 40000, level: 'direct' },
        { name: 'Marie Claire', date: '2024-01-14', amount: 10000, level: 'indirect' },
        // ... autres filleuls
    ];

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleWithdrawalSubmit = (e) => {
        e.preventDefault();
        const amount = parseFloat(withdrawalAmount);
        if (amount > maxWithdrawal) {
            setShowAlert(true);
            return;
        }
        // Traitement du retrait...
        setShowWithdrawal(false);
        // Réinitialiser le formulaire
    };

    return (
        <div className="space-y-6">
            {/* En-tête avec Solde */}
            <div className="balance-card rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Mon Espace Parrainage</h2>
                    <button
                        onClick={() => setShowWithdrawal(!showWithdrawal)}
                        className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
                    >
                        <ArrowDownCircle className="w-5 h-5" />
                        Demander un retrait
                    </button>
                </div>
                <div className="mt-4">
                    <div className="text-sm opacity-90">Solde disponible</div>
                    <div className="text-4xl font-bold mt-1">{balance.toLocaleString()} XAF</div>
                </div>
            </div>

            {/* Formulaire de Retrait */}
            <div className={`withdrawal-form ${showWithdrawal ? 'open' : ''}`}>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Demande de Retrait</h3>
                        <button
                            onClick={() => setShowWithdrawal(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <form onSubmit={handleWithdrawalSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Montant à retirer (Max: {maxWithdrawal.toLocaleString()} XAF)
                            </label>
                            <input
                                type="number"
                                value={withdrawalAmount}
                                onChange={(e) => setWithdrawalAmount(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                max={maxWithdrawal}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nom du Bénéficiaire
                            </label>
                            <input
                                type="text"
                                value={beneficiaryName}
                                onChange={(e) => setBeneficiaryName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Numéro du Bénéficiaire
                            </label>
                            <input
                                type="tel"
                                value={beneficiaryNumber}
                                onChange={(e) => setBeneficiaryNumber(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Confirmer le retrait
                        </button>
                    </form>
                </div>
            </div>

            {/* Alerte de Montant Maximum */}
            {showAlert && (
                <Alert variant="destructive" className="mt-4">
                    <AlertDescription>
                        Le montant demandé dépasse le maximum autorisé (98% du solde).
                    </AlertDescription>
                    <button
                        onClick={() => setShowAlert(false)}
                        className="absolute right-2 top-2"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </Alert>
            )}

            {/* Code de Parrainage */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Code de Parrainage</h3>
                <div className="flex gap-2">
                    <div className="flex-1 referral-code-input rounded-lg px-4 py-3 font-mono text-lg font-medium text-blue-600">
                        {referralCode}
                    </div>
                    <button
                        onClick={handleCopy}
                        className={`px-4 rounded-lg ${
                            copied
                                ? 'bg-green-50 text-green-600'
                                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        } transition-colors`}
                    >
                        {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Statistiques */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="stat-card bg-white rounded-xl p-6 shadow-sm"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full bg-opacity-10 ${stat.color.replace('text', 'bg')}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                                <div className="text-xl font-semibold mt-1">{stat.value}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Liste des Filleuls */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold">Historique des Parrainages</h3>
                </div>
                <div className="referral-list">
                    {referrals.map((referral, index) => (
                        <div
                            key={index}
                            className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-medium">{referral.name}</div>
                                    <div className="text-sm text-gray-500">
                                        Inscrit le {new Date(referral.date).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium text-blue-600">
                                        +{referral.amount.toLocaleString()} XAF
                                    </div>
                                    <div className="text-sm">
                                        {referral.level === 'direct' ? 'Filleul direct' : 'Filleul indirect'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReferralSection;