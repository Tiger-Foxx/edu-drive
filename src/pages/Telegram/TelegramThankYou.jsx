import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Loader, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import { SERVER_BASE_URL } from "@/config.js";
// import { MONEY_FUSION_URL } from '@/Config.jsx';
import { YOUR_CAMPAY_API_TOKEN } from '@/Config.jsx';
import { IS_DEMO } from '@/Config.jsx';

const TelegramThankYou = () => {
    const [status, setStatus] = useState('loading');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    let response;

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const queryParams = new URLSearchParams(window.location.search);
                const userId = localStorage.getItem('userId');
                const provider = localStorage.getItem('paymentProvider');
                const paymentToken = localStorage.getItem('paymentToken');
                const telegramData = JSON.parse(localStorage.getItem('telegramData') || '{}');

                if (!userId || !provider || !telegramData) {
                    throw new Error('Informations de paiement ou Telegram manquantes');
                }

                let verificationData = {
                    user_id: userId,
                    provider: provider,
                    telegram_phone: telegramData.phone,
                    telegram_username: telegramData.username || null
                };

                // Gestion spécifique selon le provider
                if (provider === 'campay') {
                    const reference = queryParams.get('reference');
                    if (!reference) {
                        throw new Error('Référence Campay manquante');
                    }

                    const statusResponse = await axios.get(
                        (IS_DEMO) ? `https://demo.campay.net/api/transaction/${reference}/` : `https://campay.net/api/transaction/${reference}/`,
                        {
                            headers: {
                                Authorization: `Token ${YOUR_CAMPAY_API_TOKEN}`,
                            },
                        }
                    );


                    verificationData.transaction_id = reference;
                    verificationData.status = (statusResponse.data.status === 'SUCCESSFUL' || statusResponse.data.status === 'PENDING') ? 'success' : 'failed';
                } else if (provider === 'moneyfusion') {
                    if (!paymentToken) {
                        throw new Error('Token MoneyFusion manquant');
                    }

                    const statusResponse = await axios.get(
                        `https://www.pay.moneyfusion.net/paiementNotif/${paymentToken}`
                    );

                    if (!statusResponse.data.data) {
                        throw new Error('Réponse MoneyFusion invalide');
                    }
                    console.log(statusResponse);

                    verificationData.transaction_id = statusResponse.data.data.numeroTransaction;
                    verificationData.status = statusResponse.data.data.statut;
                }

                // Vérification du paiement avec le backend
                const response = await axios.post(
                    `${SERVER_BASE_URL}/payments/verify-telegram/`,
                    verificationData
                );

                if (response.data.success) {
                    setStatus('success');
                    setMessage(response.data.message || 'Souscription Telegram confirmée avec succès ! vous recevrez bientôt un message pour rejoindre notre canal Telegram, et vous serez ajouté sous peu. Merci !');

                    // Nettoyage du localStorage
                    localStorage.removeItem('userId');
                    localStorage.removeItem('paymentProvider');
                    localStorage.removeItem('paymentToken');
                    localStorage.removeItem('telegramData');
                } else {
                    throw new Error(response.data.message || 'Échec de la vérification du paiement');
                }
            } catch (error) {
                if (error.response.data.message.includes('déjà')) {
                    setStatus('success');
                    setMessage( 'Souscription Telegram confirmée avec succès ! vous recevrez bientôt un message pour rejoindre notre canal Telegram, et vous serez ajouté sous peu. Merci !');
                } else {
                    console.error('Erreur de vérification:', error);
                    setStatus('error');
                    setMessage(error.message || 'Une erreur est survenue lors de la vérification du paiement');
                }
            }

        };

        verifyPayment();
    }, [navigate]);

    // Le reste du composant reste inchangé...
    const getStatusContent = () => {
        switch (status) {
            case 'loading':
                return {
                    icon: <Loader className="w-16 h-16 text-blue-600 animate-spin" />,
                    title: 'Vérification en cours',
                    message: 'Veuillez patienter pendant que nous confirmons votre souscription...',
                    buttonText: null
                };
            case 'success':
                return {
                    icon: <CheckCircle className="w-16 h-16 text-green-500" />,
                    title: 'Souscription Confirmée',
                    message: message,
                    buttonText: 'Retour à l\'accueil'
                };
            case 'error':
                return {
                    icon: <XCircle className="w-16 h-16 text-red-500" />,
                    title: 'Erreur de Paiement',
                    message: message,
                    buttonText: 'Réessayer la souscription'
                };
            default:
                return {
                    icon: <Send className="w-16 h-16 text-blue-500" />,
                    title: 'État Inconnu',
                    message: 'Une erreur inattendue est survenue',
                    buttonText: 'Retour à l\'accueil'
                };
        }
    };

    const content = getStatusContent();

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-blue-100">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            {content.icon}
                        </div>

                        <h2 className="text-2xl font-bold text-blue-600 mb-4">
                            {content.title}
                        </h2>

                        <p className="text-gray-600 mb-8">
                            {content.message}
                        </p>

                        {content.buttonText && (
                            <button
                                onClick={() => {
                                    if (status === 'success') {
                                        navigate('/');
                                    } else if (status === 'error') {
                                        navigate('/telegram-subscription');
                                    } else {
                                        navigate('/');
                                    }
                                }}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                {content.buttonText}
                            </button>
                        )}

                        {status === 'success' && (
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-800">
                                    Vous recevrez bientôt un message pour rejoindre notre canal Telegram, et vous serez ajouté sous peu. Merci !
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TelegramThankYou;