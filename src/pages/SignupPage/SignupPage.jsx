import React, { useState } from 'react';
import { Shield, Gift, CheckCircle, AlertCircle, ChevronRight, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import './SignupPage.css';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        referralCode: '',
    });
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
        if (!formData.email.trim()) {
            newErrors.email = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email invalide';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Le numéro de téléphone est requis';
        } else if (!/^\d{9,}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Numéro de téléphone invalide';
        }
        if (!formData.referralCode.trim()) newErrors.referralCode = 'Le code de parrainage est requis';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (step === 1 && validateStep1()) {
            setStep(2);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 my-10 px-4 sm:px-6 lg:px-8">
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
                                                        <AlertCircle className="w-4 h-4 mr-1" />
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
                                                        <AlertCircle className="w-4 h-4 mr-1" />
                                                        {errors.email}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Numéro de téléphone
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-300'} 
                                                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                                                    placeholder="Entrez votre numéro"
                                                />
                                                {errors.phone && (
                                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                                        <AlertCircle className="w-4 h-4 mr-1" />
                                                        {errors.phone}
                                                    </p>
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
                                                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                                                    placeholder="Code de parrainage requis"
                                                />
                                                {errors.referralCode && (
                                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                                        <AlertCircle className="w-4 h-4 mr-1" />
                                                        {errors.referralCode}
                                                    </p>
                                                )}
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4
                                                rounded-xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1
                                                flex items-center justify-center"
                                            >
                                                Continuer vers le paiement
                                                <ChevronRight className="w-5 h-5 ml-2" />
                                            </button>
                                        </form>
                                    </>
                                ) : (
                                    <div className="text-center">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                            Finaliser votre inscription
                                        </h2>
                                        <p className="text-gray-600 mb-8">
                                            Choisissez votre méthode de paiement préférée
                                        </p>
                                        {/* Placeholder pour l'intégration du système de paiement */}
                                        <div className="space-y-4">
                                            {/* Boutons de paiement à intégrer ici */}
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
                                <h4 className="font-semibold mb-2">Garantie satisfait ou remboursé</h4>
                                <p className="text-blue-100">
                                    Nous sommes tellement confiants que vous aimerez nos formations que nous
                                    offrons une garantie de remboursement de 30 jours.
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