import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {
    Copy,
    CheckCircle,
    Users,
    Wallet,
    ArrowDownCircle,
    TrendingUp,
    X,
    Clock,
    AlertCircle
} from 'lucide-react';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import {SERVER_BASE_URL} from "@/Config.jsx";
import {getCurrentUser} from "@/services/userService.jsx";

const countries = [
    { name: "Cameroun", operators: ["MTN Mobile Money", "Orange Money"] },
    { name: "Sénégal", operators: ["Vague", "Orange Money Sénégal"] },
    { name: "Côte d'Ivoire", operators: ["Orange Money Côte d'Ivoire", "MTN MoMo Côte d'Ivoire"] },
    { name: "Burkina Faso", operators: ["Orange Money Burkina Faso", "Moov Money Burkina Faso"] },
    { name: "Mali", operators: ["Orange Money Mali", "Moov Money Mali"] },
    { name: "Bénin", operators: ["MTN MoMo Bénin", "Moov Money Bénin"] },
    { name: "Togo", operators: ["Moov Money Togo", "TMoney"] }
];

// Statuts de retrait pour affichage
const withdrawalStatusMap = {
    'PENDING': { text: 'En attente', color: 'text-amber-600', bgColor: 'bg-amber-50' },
    'PROCESSING': { text: 'En cours', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    'COMPLETED': { text: 'Complété', color: 'text-green-600', bgColor: 'bg-green-50' },
    'REJECTED': { text: 'Rejeté', color: 'text-red-600', bgColor: 'bg-red-50' }
};

const ReferralSection = () => {
    const [showWithdrawal, setShowWithdrawal] = useState(false);
    const [copied, setCopied] = useState(false);
    const [withdrawalAmount, setWithdrawalAmount] = useState('');
    const [beneficiaryName, setBeneficiaryName] = useState('');
    const [beneficiaryNumber, setBeneficiaryNumber] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState('Cameroun');
    const [selectedOperator, setSelectedOperator] = useState('MTN Mobile Money');
    const [userData, setUserData] = useState(null);
    const [filteredCountries, setFilteredCountries] = useState(countries);
    const [activeTab, setActiveTab] = useState('parrainages'); // 'parrainages' ou 'retraits'
    const [withdrawals, setWithdrawals] = useState([]);
    const [withdrawalsLoading, setWithdrawalsLoading] = useState(false);

    useEffect(() => {
        fetchUserData();
        fetchWithdrawals();
    }, []);

    async function fetchUserDataWithToken() {
        let accessToken = localStorage.getItem('access_token');
        let refreshToken = localStorage.getItem('refresh_token');

        try {
            // Première tentative avec l'accessToken actuel
            const response = await axios.get(`${SERVER_BASE_URL}/users/me/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                data:{
                    user:getCurrentUser().id,
                }
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log("Access token expiré, tentative de rafraîchissement...");
                try {
                    // Tentative de rafraîchir le token
                    const refreshResponse = await axios.post(`${SERVER_BASE_URL}/token/refresh/`,
                        { refresh: refreshToken },
                        { headers: { "Content-Type": "application/json" } }
                    );

                    const newAccessToken = refreshResponse.data.access;
                    localStorage.setItem('access_token', newAccessToken);

                    // Retenter la requête initiale avec le nouveau token
                    const retryResponse = await axios.get(`${SERVER_BASE_URL}/users/me/`, {
                        headers: {
                            Authorization: `Bearer ${newAccessToken}`
                        }
                    });
                    return retryResponse.data;
                } catch (refreshError) {
                    console.error("Échec du rafraîchissement du token. Déconnexion nécessaire.");
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    // Rediriger l'utilisateur vers la page de connexion si nécessaire
                }
            } else {
                console.error("Erreur lors de la récupération des données utilisateur:", error);
            }
        }
    }

    // Nouvelle fonction pour récupérer l'historique des retraits
    const fetchWithdrawals = async () => {
        setWithdrawalsLoading(true);
        try {
            let accessToken = localStorage.getItem('access_token');
            let refreshToken = localStorage.getItem('refresh_token');

            try {
                // Première tentative avec l'accessToken actuel
                const response = await axios.get(`${SERVER_BASE_URL}/withdrawals/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setWithdrawals(response.data);
                setWithdrawalsLoading(false);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // Tentative de rafraîchir le token
                    const refreshResponse = await axios.post(`${SERVER_BASE_URL}/token/refresh/`,
                        { refresh: refreshToken },
                        { headers: { "Content-Type": "application/json" } }
                    );

                    const newAccessToken = refreshResponse.data.access;
                    localStorage.setItem('access_token', newAccessToken);

                    // Retenter la requête initiale avec le nouveau token
                    const retryResponse = await axios.get(`${SERVER_BASE_URL}/withdrawals/`, {
                        headers: {
                            Authorization: `Bearer ${newAccessToken}`
                        }
                    });
                    setWithdrawals(retryResponse.data);
                    setWithdrawalsLoading(false);
                } else {
                    console.error("Erreur lors de la récupération des retraits:", error);
                    setWithdrawalsLoading(false);
                    toast.error("Impossible de charger l'historique des retraits.");
                }
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des retraits:", error);
            setWithdrawalsLoading(false);
            toast.error("Impossible de charger l'historique des retraits.");
        }
    };

    const fetchUserData = async () => {
        try {
            let accessToken = localStorage.getItem('access_token');
            let refreshToken = localStorage.getItem('refresh_token');

            const data = await fetchUserDataWithToken();
            setUserData(data);
            // Mise à jour du localStorage
            const currentUser = JSON.parse(localStorage.getItem('user'));
            localStorage.setItem('user', JSON.stringify({
                ...currentUser,
                ...data
            }));
            setLoading(false);
        } catch (error) {
            toast.info("Impossible de charger vos informations de parrainage.",
                { position: 'top-right' , isLoading:true,type:'error',autoClose:4000}
            );

            setLoading(false);
        }
    };

    const handleCountrySearch = (searchTerm) => {
        const filtered = countries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredCountries(filtered);
    };

    const stats = userData ? [
        {
            label: 'Filleuls Directs',
            value: userData.direct_referrals_count,
            icon: Users,
            color: 'text-blue-600'
        },
        {
            label: 'Filleuls Indirects',
            value: userData.indirect_referrals_count,
            icon: TrendingUp,
            color: 'text-green-600'
        },
        {
            label: 'Solde Disponible',
            value: `${userData.wallet_balance.toLocaleString()} XAF`,
            icon: Wallet,
            color: 'text-purple-600'
        }
    ] : [];

    const handleCopy = () => {
        if (userData?.referral_link) {
            navigator.clipboard.writeText(userData.referral_link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const toastId = useRef(null);

    const handleWithdrawalSubmit = async (e) => {
        e.preventDefault();
        toastId.current = toast.info("Veuillez patienter...", { isLoading:true});

        const amount = parseFloat(withdrawalAmount);
        const maxWithdrawal = userData.wallet_balance * 0.98;

        if (amount < 2500) {
            toast.update(toastId.current, {
                render: "Le seuil minimum de retrait est de 2500 XAF",
                type: "error",
                isLoading: false,
                autoClose: 4500,
            });
            return;
        }

        try {
            let refreshToken = localStorage.getItem('refresh_token');
            // Tentative de rafraîchir le token
            const refreshResponse = await axios.post(`${SERVER_BASE_URL}/token/refresh/`,
                { refresh: refreshToken },
                { headers: { "Content-Type": "application/json" } }
            );

            const newAccessToken = refreshResponse.data.access;
            localStorage.setItem('access_token', newAccessToken);

            const response = await axios.post(`${SERVER_BASE_URL}/withdrawals/`, {
                amount: withdrawalAmount,
                beneficiary_name: beneficiaryName,
                beneficiary_number: beneficiaryNumber,
                country: selectedCountry,
                operator: selectedOperator
            }, {
                headers: { Authorization: `Bearer ${newAccessToken}` }
            });

            toast.update(toastId.current, {
                render: "Votre demande de retrait sera traitée dans les prochaines heures. Le paiement sera effectué sur le numéro Mobile Money fourni.",
                type:'success',
                isLoading: false,
                autoClose: 5000,
            });

            setShowWithdrawal(false);
            setWithdrawalAmount('');
            setBeneficiaryName('');
            setBeneficiaryNumber('');

            // Rafraîchir les données utilisateur et l'historique des retraits
            fetchUserData();
            fetchWithdrawals();

        } catch (error) {
            toast.update(toastId.current, {
                render: "Une erreur est survenue lors de la demande de retrait.",
                type:'error',
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    // Fonction pour formater la date
    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* En-tête avec Solde */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
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
                    <div className="text-4xl font-bold mt-1">
                        {userData?.wallet_balance?.toLocaleString()} XAF
                    </div>
                </div>
            </div>

            {/* Code de Parrainage */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Lien de Parrainage</h3>
                <div className="flex gap-2">
                    <div className="flex-1 bg-gray-50 rounded-lg px-4 py-3 font-mono text-sm text-blue-600 overflow-x-auto">
                        {userData?.referral_link}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl p-6 shadow-sm"
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

            {/* Navigation par onglets */}
            <div className="bg-white rounded-t-xl shadow-sm overflow-hidden">
                <div className="border-b border-gray-100">
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab('parrainages')}
                            className={`px-6 py-4 text-sm font-medium ${
                                activeTab === 'parrainages'
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Historique des Parrainages
                        </button>
                        <button
                            onClick={() => setActiveTab('retraits')}
                            className={`px-6 py-4 text-sm font-medium ${
                                activeTab === 'retraits'
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Historique des Retraits
                        </button>
                    </div>
                </div>

                {/* Contenu des onglets */}
                {activeTab === 'parrainages' && (
                    <div className="divide-y divide-gray-100">
                        {userData?.recent_referrals?.map((referral, index) => (
                            <div
                                key={index}
                                className="p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-medium">{referral.name}</div>
                                        <div className="text-sm text-gray-500">
                                            Inscrit le {new Date(referral.date).toLocaleDateString('fr-FR')}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium text-blue-600">
                                            +{referral.amount.toLocaleString()} XAF
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {referral.level === 'direct' ? 'Filleul direct' : 'Filleul indirect'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {(!userData?.recent_referrals || userData.recent_referrals.length === 0) && (
                            <div className="p-6 text-center text-gray-500">
                                <Users className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                                <p>Aucun parrainage pour le moment</p>
                                <p className="text-sm mt-1">Partagez votre lien pour gagner des commissions</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'retraits' && (
                    <div className="divide-y divide-gray-100">
                        {withdrawalsLoading ? (
                            <div className="p-6 text-center">
                                <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                                <p className="text-gray-500">Chargement des retraits...</p>
                            </div>
                        ) : (
                            withdrawals.length > 0 ? (
                                withdrawals.map((withdrawal, index) => (
                                    <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex flex-wrap justify-between items-center">
                                            <div className="mb-2 md:mb-0">
                                                <div className="font-medium">{withdrawal.beneficiary_name}</div>
                                                <div className="text-sm text-gray-500 flex flex-wrap items-center gap-2">
                                                    <span className="inline-flex items-center">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {formatDate(withdrawal.created_at)}
                                                    </span>
                                                    <span className="inline-flex items-center">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-1"></span>
                                                        {withdrawal.operator}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium text-gray-900">
                                                    {withdrawal.amount.toLocaleString()} XAF
                                                </div>
                                                <div
                                                    className={`text-xs px-2 py-1 rounded-full inline-flex items-center mt-1 ${
                                                        withdrawalStatusMap[withdrawal.status]?.bgColor || 'bg-gray-100'
                                                    } ${
                                                        withdrawalStatusMap[withdrawal.status]?.color || 'text-gray-700'
                                                    }`}
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-current mr-1"></span>
                                                    {withdrawalStatusMap[withdrawal.status]?.text || withdrawal.status}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-6 text-center text-gray-500">
                                    <Wallet className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                                    <p>Aucun retrait pour le moment</p>
                                    <p className="text-sm mt-1">Effectuez un retrait quand votre solde est suffisant</p>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>

            {/* Modal de Retrait */}
            {showWithdrawal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full relative">
                        <button
                            onClick={() => setShowWithdrawal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h3 className="text-lg font-semibold mb-4">Demande de retrait</h3>
                        <form onSubmit={handleWithdrawalSubmit} className="space-y-4">
                            {/* Sélection du pays */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Pays</label>
                                <select
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-2"
                                >
                                    {filteredCountries.map((country, index) => (
                                        <option key={index} value={country.name}>{country.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Sélection de l'opérateur */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Opérateur</label>
                                <select
                                    value={selectedOperator}
                                    onChange={(e) => setSelectedOperator(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                >
                                    {selectedCountry && countries.find(c => c.name === selectedCountry).operators.map((operator, index) => (
                                        <option key={index} value={operator}>{operator}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Montant à retirer */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Montant à retirer (Min : 2500 XAF/XOF)
                                </label>
                                <input
                                    type="number"
                                    value={withdrawalAmount}
                                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    max={userData?.wallet_balance * 0.98}
                                    required
                                />
                                <div className="text-xs text-gray-500 mt-1">
                                    Maximum disponible: {(userData?.wallet_balance * 0.98).toLocaleString()} XAF
                                </div>
                            </div>

                            {/* Nom du bénéficiaire */}
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

                            {/* Numéro Mobile Money */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Numéro Mobile Money
                                    <p className='text-xs text-gray-500'>(marquez l&#39;indicatif du pays [Ex: +237...])</p>
                                </label>
                                <input
                                    type="tel"
                                    value={beneficiaryNumber}
                                    onChange={(e) => setBeneficiaryNumber(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Bouton de confirmation */}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                Confirmer le retrait
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default ReferralSection;