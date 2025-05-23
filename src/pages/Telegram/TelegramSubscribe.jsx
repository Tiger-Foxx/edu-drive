import { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Send, CreditCard } from 'lucide-react';
import axios from 'axios';
import { getCurrentUser } from "@/services/userService.jsx";
// import { MONEY_FUSION_URL } from '@/Config.jsx';
import { PRICE_TELEGRAM_SUBSCRIPTION } from '@/Config.jsx';
// import { IS_DEMO } from '@/Config.jsx';
import { createSoPayPayment, handleSoPayError } from '@/services/sopayService.js';
import { SERVER_BASE_URL } from '@/Config.jsx';

const TelegramSubscription = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        telegramPhone: '',
        telegramUsername: '',
        currency: 'XAF'  // Default to XAF
    });
    const toastId = useRef();
    const currentUser = getCurrentUser();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const PRICE = PRICE_TELEGRAM_SUBSCRIPTION;

    const initiatePayment = async () => {
        if (!formData.telegramPhone) {
            toast.error("Le numéro de téléphone Telegram est requis");
            return;
        }

        toastId.current = toast.loading("Initialisation du paiement...");
        setIsSubmitting(true);

        try {
            // Store necessary information in localStorage
            localStorage.setItem('userId', currentUser.id);
            localStorage.setItem('paymentProvider', formData.currency === 'XAF' ? 'sopay' : 'moneyfusion');
            localStorage.setItem('telegramData', JSON.stringify({
                phone: formData.telegramPhone,
                username: formData.telegramUsername
            }));

            if (formData.currency === 'XAF') {
                // Nouvelle logique SoPay (remplace Campay)
                const paymentData = {
                    amount: PRICE,
                    currency: "XAF",
                    description: "Souscription au canal Telegram FormatPlus",
                    return_url: `${window.location.origin}/payment/telegram-thank-you`,
                    callback_url: `${SERVER_BASE_URL}/payments/sopay-telegram-callback/`,
                    customer: {
                        name: currentUser.nom || currentUser.name,
                        email: currentUser.email,
                        phone: currentUser.phone_number || formData.telegramPhone
                    },
                    payment_method: "MOBILE_MONEY"
                };

                console.log("Données de paiement SoPay : ", paymentData);
                const response = await createSoPayPayment(paymentData);

                if (response.payment_url) {
                    // Stocker l'ID de transaction SoPay
                    localStorage.setItem('sopayTransactionId', response.transaction_id);

                    toast.dismiss(toastId.current);
                    toast.success("Redirection vers SoPay...");
                    window.location.href = response.payment_url;
                } else {
                    throw new Error('Pas de lien de paiement reçu de SoPay');
                }
            } else {
                // Logique MoneyFusion inchangée
                const MONEY_FUSION_URL_TELEGRAM = 'https://www.pay.moneyfusion.net/Formatplus/telegram/pay/'; // À adapter selon votre config

                const paymentData = {
                    totalPrice: PRICE,
                    article: [{
                        telegram_subscription: PRICE,
                    }],
                    personal_Info: [{
                        userId: currentUser.id,
                        orderId: Date.now(),
                    }],
                    numeroSend: currentUser.phone_number || '658866639',
                    nomclient: currentUser.nom,
                    return_url: `${window.location.origin}/payment/telegram-thank-you`
                };

                console.log("Données de paiement MoneyFusion : ", paymentData);
                const response = await axios.post(
                    MONEY_FUSION_URL_TELEGRAM,
                    paymentData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.data.statut) {
                    localStorage.setItem('paymentToken', response.data.token);
                    toast.dismiss(toastId.current);
                    toast.success("Redirection vers MoneyFusion...");
                    window.location.href = response.data.url;
                } else {
                    throw new Error(response.data['message-money-fusion']?.response_text_fr || 'Erreur MoneyFusion');
                }
            }
        } catch (error) {
            toast.dismiss(toastId.current);

            const errorMessage = formData.currency === 'XAF' ?
                handleSoPayError(error) :
                (error.response?.data?.['message-money-fusion']?.response_text_fr || error.message);

            toast.error(`Erreur lors de l'initialisation du paiement: ${errorMessage}`);
            console.error("Payment error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-blue-100">
                    {/* Header Banner */}
                    <div className="bg-blue-600 px-6 py-8 text-center">
                        <Send className="h-12 w-12 text-white mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-white">
                            Rejoignez notre canal Telegram
                        </h2>
                        <p className="mt-2 text-blue-100">
                            Accédez à du contenu exclusif et restez connecté
                        </p>
                    </div>

                    <div className="px-6 py-8">
                        <div className="space-y-6">
                            {/* Currency Selection */}
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Devise de paiement
                                    </label>
                                    <div className="flex space-x-4">
                                        <label className="flex-1 relative">
                                            <input
                                                type="radio"
                                                name="currency"
                                                value="XAF"
                                                checked={formData.currency === 'XAF'}
                                                onChange={handleInputChange}
                                                className="hidden"
                                            />
                                            <div className={`
                                                p-3 text-center border rounded-lg cursor-pointer
                                                ${formData.currency === 'XAF'
                                                ? 'bg-blue-50 border-blue-500 text-blue-600'
                                                : 'border-gray-200 hover:border-blue-200'}
                                            `}>
                                                XAF (SoPay)
                                            </div>
                                        </label>
                                        <label className="flex-1 relative">
                                            <input
                                                type="radio"
                                                name="currency"
                                                value="XOF"
                                                checked={formData.currency === 'XOF'}
                                                onChange={handleInputChange}
                                                className="hidden"
                                            />
                                            <div className={`
                                                p-3 text-center border rounded-lg cursor-pointer
                                                ${formData.currency === 'XOF'
                                                ? 'bg-blue-50 border-blue-500 text-blue-600'
                                                : 'border-gray-200 hover:border-blue-200'}
                                            `}>
                                                XOF
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Telegram Phone */}
                            <div>
                                <label
                                    htmlFor="telegramPhone"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Numéro de téléphone Telegram*
                                </label>
                                <input
                                    type="tel"
                                    name="telegramPhone"
                                    id="telegramPhone"
                                    required
                                    value={formData.telegramPhone}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="+237 6XX XXX XXX"
                                />
                            </div>

                            {/* Telegram Username */}
                            <div>
                                <label
                                    htmlFor="telegramUsername"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Nom d&#39;utilisateur Telegram (optionnel)
                                </label>
                                <input
                                    type="text"
                                    name="telegramUsername"
                                    id="telegramUsername"
                                    value={formData.telegramUsername}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="@username"
                                />
                            </div>

                            {/* Payment Summary */}
                            <div className="bg-blue-50 -mx-6 px-6 py-4 mt-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm text-gray-600">Montant à payer</span>
                                    <span className="text-lg font-semibold text-gray-900">
                                        {PRICE} {formData.currency}
                                    </span>
                                </div>

                                <button
                                    onClick={initiatePayment}
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Traitement...
                                        </div>
                                    ) : (
                                        <>
                                            <CreditCard className="w-5 h-5 mr-2" />
                                            Procéder au paiement
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TelegramSubscription;