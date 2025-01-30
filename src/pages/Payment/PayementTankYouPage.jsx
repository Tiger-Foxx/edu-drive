import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SERVER_BASE_URL } from "@/Config.jsx";

const PaymentThankYou = () => {
    const [status, setStatus] = useState('loading');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const queryParams = new URLSearchParams(window.location.search);
                const userId = localStorage.getItem('userId');
                const provider = localStorage.getItem('paymentProvider');
                const paymentToken = localStorage.getItem('paymentToken');

                if (!userId || !provider) {
                    throw new Error('Informations de paiement manquantes');
                }

                let verificationData = {
                    user_id: userId,
                    provider: provider
                };

                // Gestion spécifique selon le provider
                if (provider === 'moneroo') {
                    // Pour Moneroo, on récupère directement depuis l'URL
                    verificationData.transaction_id = queryParams.get('paymentId');
                    verificationData.status = queryParams.get('paymentStatus');

                    if (!verificationData.transaction_id || !verificationData.status) {
                        throw new Error('Paramètres de paiement Moneroo manquants');
                    }
                } else if (provider === 'moneyfusion') {
                    // Pour MoneyFusion, on fait une requête de vérification avec le token
                    if (!paymentToken) {
                        throw new Error('Token MoneyFusion manquant');
                    }

                    const statusResponse = await axios.get(
                        `https://www.pay.moneyfusion.net/paiementNotif/${paymentToken}`
                    );

                    if (!statusResponse.data.data) {
                        throw new Error('Réponse MoneyFusion invalide');
                    }

                    verificationData.transaction_id = statusResponse.data.data.numeroTransaction;
                    verificationData.status = statusResponse.data.data.statut;
                }

                // Vérification du paiement avec le backend
                const response = await axios.post(
                    `${SERVER_BASE_URL}/payments/verify/`,
                    verificationData
                );

                if (response.data.success) {
                    setStatus('success');
                    setMessage(response.data.message || 'Paiement confirmé avec succès !');

                    // Nettoyage du localStorage
                    localStorage.removeItem('userId');
                    localStorage.removeItem('paymentProvider');
                    localStorage.removeItem('paymentToken');
                } else {
                    throw new Error(response.data.message || 'Échec de la vérification du paiement');
                }
            } catch (error) {
                console.error('Erreur de vérification:', error);
                setStatus('error');
                setMessage(error.message || 'Une erreur est survenue lors de la vérification du paiement');
            }
        };

        verifyPayment();
    }, [navigate]);

    const getStatusContent = () => {
        switch (status) {
            case 'loading':
                return {
                    icon: '⌛',
                    title: 'Vérification en cours',
                    message: 'Veuillez patienter pendant que nous confirmons votre paiement...',
                    buttonText: null
                };
            case 'success':
                return {
                    icon: '✅',
                    title: 'Paiement Confirmé',
                    message: message,
                    buttonText: 'Aller à la connexion'
                };
            case 'error':
                return {
                    icon: '❌',
                    title: 'Erreur de Paiement',
                    message: message,
                    buttonText: 'Réessayer le paiement'
                };
            default:
                return {
                    icon: '❓',
                    title: 'État Inconnu',
                    message: 'Une erreur inattendue est survenue',
                    buttonText: 'Retour à l\'accueil'
                };
        }
    };

    const content = getStatusContent();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="text-center">
                        <div className="text-6xl mb-4" role="img" aria-label="status icon">
                            {content.icon}
                        </div>

                        <h2 className="text-2xl font-bold text-blue-600 mb-4">
                            {content.title}
                        </h2>

                        <p className="text-gray-600 mb-8">
                            {content.message}
                        </p>

                        {status === 'loading' && (
                            <div className="flex justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                        )}

                        {content.buttonText && (
                            <button
                                onClick={() => {
                                    if (status === 'success') {
                                        navigate('/login');
                                    } else if (status === 'error') {
                                        navigate('/signup');
                                    } else {
                                        navigate('/');
                                    }
                                }}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {content.buttonText}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentThankYou;