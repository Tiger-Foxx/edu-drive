import { useEffect, useRef, useState } from 'react';
import { Shield, Gift, CheckCircle, AlertCircle, ChevronRight, UserPlus, CreditCard } from 'lucide-react';
// import { Link } from 'react-router-dom';
import './SignupPage.css';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { SERVER_BASE_URL } from "@/Config.jsx";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { MONEY_FUSION_URL } from '@/Config.jsx';
import { PRICE_FORMAT_PLUS_SUBSCRIPTION } from '@/Config.jsx';
// import { IS_DEMO } from '@/Config.jsx';
import { createSoPayPayment, handleSoPayError } from '@/services/sopayService.js';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        referralCode: "",
        password: "",
        confirmPassword: "",
        paymentMethod: null,
        currency: null,
        userId: null
    });
    const [step, setStep] = useState(1);
    const [active, setActive] = useState(true);
    const [PayActive, setPayActive] = useState(true);
    const [errors, setErrors] = useState({});
    const { referralCode } = useParams();
    const toastId = useRef(null);

    useEffect(() => {
        if (referralCode) {
            setFormData(prev => ({
                ...prev,
                referralCode: referralCode
            }));
        }
    }, [referralCode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActive(true);

        if (name === 'referralCode' && referralCode) {
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handlePaymentMethodSelection = (method, currency) => {
        setFormData(prev => ({
            ...prev,
            paymentMethod: method,
            currency: currency
        }));
    };

    const PRICE = PRICE_FORMAT_PLUS_SUBSCRIPTION;

    const initiatePayment = async () => {
        console.log('Initiating payment...', formData);
        toastId.current = toast.info("Veuillez patienter...", { position: 'top-right', isLoading: true });
        setPayActive(false);

        try {
            // Stockage des informations utilisateur
            localStorage.setItem('userId', formData.userId);
            localStorage.setItem('paymentProvider', formData.currency === 'XAF' ? 'sopay' : 'moneyfusion');

            if (formData.currency === 'XAF') {
                // Nouvelle logique SoPay (remplace Campay)
                const paymentData = {
                    amount: PRICE,
                    currency: "XAF",
                    description: "Paiement pour l'inscription FormatPlus",
                    return_url: `${window.location.origin}/payment/thank-you`,
                    callback_url: `${SERVER_BASE_URL}/payments/sopay-callback/`,
                    customer: {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone
                    },
                    payment_method: "MOBILE_MONEY"
                };

                const response = await createSoPayPayment(paymentData);

                if (response.payment_url) {
                    // Stocker l'ID de transaction SoPay
                    localStorage.setItem('sopayTransactionId', response.transaction_id);

                    toast.update(toastId.current, {
                        render: "Redirection vers SoPay...",
                        type: "success",
                        isLoading: false,
                        autoClose: 2500,
                    });

                    window.location.href = response.payment_url;
                } else {
                    throw new Error('Pas de lien de paiement reçu de SoPay');
                }
            } else {
                // Logique MoneyFusion inchangée
                const paymentData = {
                    totalPrice: PRICE,
                    article: [{ inscription: 50 }],
                    personal_Info: [{
                        userId: formData.userId,
                        orderId: Date.now(),
                    }],
                    numeroSend: formData.phone,
                    nomclient: formData.name,
                    return_url: `${window.location.origin}/payment/thank-you`
                };

                const response = await axios.post(
                    MONEY_FUSION_URL,
                    paymentData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.data.statut) {
                    localStorage.setItem('paymentToken', response.data.token);
                    toast.update(toastId.current, {
                        render: "Redirection vers MoneyFusion...",
                        type: "success",
                        isLoading: false,
                        autoClose: 2500,
                    });
                    window.location.href = response.data.url;
                } else {
                    throw new Error(response.data['message-money-fusion']?.response_text_fr || "Erreur MoneyFusion");
                }
            }
        } catch (error) {
            const errorMessage = formData.currency === 'XAF' ?
                handleSoPayError(error) :
                (error.response?.data?.error || error.message);

            toast.update(toastId.current, {
                render: "Erreur : " + errorMessage,
                type: "error",
                isLoading: false,
                autoClose: 4000,
            });
            console.error("Erreur paiement:", error.response?.data || error);
        }
        setPayActive(true);
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Le nom est requis";
        if (!formData.email.trim()) {
            newErrors.email = "L'email est requis";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email invalide";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Le numéro de téléphone est requis";
        } else if (!/^\+\d{10,}$/.test(formData.phone.replace(/\s/g, ""))) {
            newErrors.phone = "Numéro de téléphone invalide";
        }
        if (!formData.password) {
            newErrors.password = "Le mot de passe est requis";
        } else if (formData.password.length < 6) {
            newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "La confirmation du mot de passe est requise";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setActive(false);
        toastId.current = toast.info("Veuillez patienter...", { position: 'top-right', isLoading: true });

        if (step === 1 && validateStep1()) {
            try {
                console.log('Données à envoyer ', {
                    nom: formData.name,
                    username: formData.email,
                    email: formData.email,
                    phone_number: formData.phone,
                    password: formData.password,
                    sponsor_code_input: formData.referralCode || null,
                });

                const response = await axios.post(SERVER_BASE_URL + "/register/", {
                    nom: formData.name,
                    username: formData.email,
                    email: formData.email,
                    phone_number: formData.phone,
                    password: formData.password,
                    sponsor_code_input: formData.referralCode || null,
                });

                const { user, message } = response.data;
                let is_old_user = message.includes('inscrit');

                if (user.is_paid) {
                    toast.update(toastId.current, {
                        render: "Votre compte est déjà payé, vous pouvez vous connecter",
                        type: "warning",
                        isLoading: false,
                        autoClose: 6000,
                    });

                    toast.info("Si vous avez oublié votre mot de passe, vous pouvez le réinitialiser", {
                        isLoading: false,
                        autoClose: 12000,
                    });
                    return;
                }

                toast.update(toastId.current, {
                    render: message,
                    type: is_old_user ? "warning" : "success",
                    isLoading: false,
                    autoClose: is_old_user ? 6000 : 4000,
                });

                setStep(2);
                console.log("Utilisateur créé : ", user);
                setFormData(prev => ({ ...prev, userId: user.id }));
            } catch (error) {
                if (error.response && error.response.data) {
                    const backendErrors = error.response.data;
                    toast.update(toastId.current, {
                        render: "Erreur : " + (backendErrors.non_field_errors || "Erreur inconnue"),
                        type: "error",
                        isLoading: false,
                        autoClose: 4000,
                    });
                } else {
                    console.log('erreur inconnue', error);
                    toast.update(toastId.current, {
                        render: "Une erreur inattendue s'est produite.",
                        type: "error",
                        isLoading: false,
                        autoClose: 4000,
                    });
                }
            }
        }
        setActive(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 my-10 px-4 sm:px-6 lg:px-8">
            <ToastContainer />
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Left Column - Form */}
                    <div className="relative">
                        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-blue-100">
                            {/* Progress Steps */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-full flex items-center">
                                    <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 
                                        ${step >= 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white'}`}>
                                        <UserPlus className="w-5 h-5" />
                                        <div className="absolute -bottom-6 w-max text-sm font-medium text-gray-600">
                                            Informations
                                        </div>
                                    </div>
                                    <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
                                    <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 
                                        ${step >= 2 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white'}`}>
                                        <Shield className="w-5 h-5" />
                                        <div className="absolute -bottom-6 w-max text-sm font-medium text-gray-600">
                                            Paiement
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12">
                                {step === 1 ? (
                                    <>
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                            Créez votre compte
                                        </h2>
                                        <p className="text-gray-600 mb-8">
                                            Rejoignez notre communauté et accédez à toutes nos formations
                                        </p>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Nom complet
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} 
                                                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                                                    placeholder="Entrez votre nom"
                                                />
                                                {errors.name && (
                                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                                        <AlertCircle className="w-4 h-4 mr-1"/>
                                                        {errors.name}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} 
                                                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                                                    placeholder="votre@email.com"
                                                />
                                                {errors.email && (
                                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                                        <AlertCircle className="w-4 h-4 mr-1"/>
                                                        {errors.email}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Numéro de téléphone (avec le code pays)
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-300'} 
                                                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                                                    placeholder="Ex : +237 6..."
                                                />
                                                {errors.phone && (
                                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                                        <AlertCircle className="w-4 h-4 mr-1"/>
                                                        {errors.phone}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Mot de passe
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-300'} 
                                                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                                                />
                                                {errors.password && (
                                                    <p className="text-red-500 text-sm">{errors.password}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="confirmPassword"
                                                    className="block text-sm font-medium text-gray-700 mb-2"
                                                >
                                                    Confirmer le mot de passe
                                                </label>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    id="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 rounded-xl border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} 
                                                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                                                />
                                                {errors.confirmPassword && (
                                                    <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Code de parrainage
                                                </label>
                                                <input
                                                    type="text"
                                                    name="referralCode"
                                                    value={formData.referralCode}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 rounded-xl border ${errors.referralCode ? 'border-red-500' : 'border-gray-300'} 
                                                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed`}
                                                    placeholder="Code de parrainage requis"
                                                />
                                                {errors.referralCode && (
                                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                                        <AlertCircle className="w-4 h-4 mr-1"/>
                                                        {errors.referralCode}
                                                    </p>
                                                )}
                                            </div>

                                            <button
                                                disabled={!active}
                                                type="submit"
                                                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4
                                                    rounded-xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1
                                                    flex items-center justify-center ${!active && 'opacity-50 cursor-not-allowed'}`}
                                            >
                                                Continuer vers le paiement
                                                <ChevronRight className="w-5 h-5 ml-2"/>
                                            </button>
                                        </form>
                                    </>
                                ) : (
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                            Finaliser votre inscription
                                        </h2>
                                        <p className="text-gray-600 mb-8">
                                            Choisissez votre méthode de paiement
                                        </p>

                                        <div className="space-y-4">
                                            <div
                                                onClick={() => handlePaymentMethodSelection('mobile_money', 'XAF')}
                                                className={`border p-4 rounded-xl cursor-pointer transition-all 
                                            ${formData.paymentMethod === 'mobile_money' && formData.currency === 'XAF' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <CreditCard className="w-6 h-6 mr-4 text-blue-600" />
                                                        <div>
                                                            <h3 className="font-semibold">Mobile Money (XAF ou XOF)</h3>
                                                            <p className="text-gray-600 text-sm">Cameroun et autres - Powered by SoPay</p>
                                                        </div>
                                                    </div>
                                                    {formData.paymentMethod === 'mobile_money' && formData.currency === 'XAF' && (
                                                        <CheckCircle className="w-6 h-6 text-blue-600" />
                                                    )}
                                                </div>
                                            </div>

                                            <div
                                                onClick={() => handlePaymentMethodSelection('mobile_money', 'XOF')}
                                                className={`border p-4 rounded-xl cursor-pointer transition-all 
                                            ${formData.paymentMethod === 'mobile_money' && formData.currency === 'XOF' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <CreditCard className="w-6 h-6 mr-4 text-blue-600" />
                                                        <div>
                                                            <h3 className="font-semibold">Mobile Money (XOF)</h3>
                                                            <p className="text-gray-600 text-sm">Autres ( Mali, Sénégal, Bénin...etc )</p>
                                                        </div>
                                                    </div>
                                                    {formData.paymentMethod === 'mobile_money' && formData.currency === 'XOF' && (
                                                        <CheckCircle className="w-6 h-6 text-blue-600" />
                                                    )}
                                                </div>
                                            </div>

                                            <button
                                                onClick={initiatePayment}
                                                disabled={!formData.paymentMethod || !PayActive}
                                                className={`w-full bg-blue-600 text-white py-4 rounded-xl mt-4
                                            ${formData.paymentMethod ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'}`}
                                            >
                                                Commencer le paiement
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Benefits */}
                    <div className="lg:sticky lg:top-8">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white">
                            <h3 className="text-2xl font-bold mb-6">
                                Ce que vous obtenez
                            </h3>
                            <div className="space-y-6">
                                {[
                                    {
                                        icon: CheckCircle,
                                        title: 'Accès illimité',
                                        description: 'Profitez de toutes nos formations à vie'
                                    },
                                    {
                                        icon: Gift,
                                        title: 'Bonus exclusifs',
                                        description: 'Recevez des ressources supplémentaires'
                                    },
                                    {
                                        icon: Shield,
                                        title: 'Support premium',
                                        description: 'Assistance personnalisée 7j/7'
                                    }
                                ].map((benefit, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <benefit.icon className="w-6 h-6 text-blue-200" />
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="font-semibold">{benefit.title}</h4>
                                            <p className="text-blue-100 mt-1">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-6 bg-white/10 rounded-xl backdrop-blur-lg">
                                <h4 className="font-semibold mb-2">Patientez après inscription</h4>
                                <p className="text-blue-100">
                                    Connectez-vous à votre compte après inscription et patientez quelques temps pour être autorisé à accéder à nos formations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;