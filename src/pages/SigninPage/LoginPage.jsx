import { useState } from 'react';
import { Lock, Mail, AlertCircle, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.email) newErrors.email = "L'email est requis.";
        if (!formData.password) newErrors.password = "Le mot de passe est requis.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.email, // Assure-toi que l'email correspond à `username` dans ton backend
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Identifiants invalides');
            }

            const data = await response.json();

            // Sauvegarder les tokens dans localStorage
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

            // Optionnel : Sauvegarder les informations utilisateur (facultatif)
            localStorage.setItem('user', JSON.stringify(data.user));

            // Rediriger vers une page protégée
            window.location.href = '/dashboard/profile';
        } catch (error) {
            setErrors({ submit: error.message });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 relative">
                {/* Welcome Card */}
                <div className="text-center">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Bon retour parmi nous
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Accédez à toutes vos formations
                    </p>
                </div>

                {/* Login Form */}
                <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-blue-100 form-container">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className={`appearance-none block w-full pl-10 pr-3 py-3 border ${
                                        errors.email ? 'border-red-500' : 'border-gray-300'
                                    } rounded-xl shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    transition-all duration-200 input-field`}
                                    placeholder=""
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <AlertCircle className="h-5 w-5 text-red-500" />
                                    </div>
                                )}
                            </div>
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600 error-message">{errors.email}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Mot de passe
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className={`appearance-none block w-full pl-10 pr-3 py-3 border ${
                                        errors.password ? 'border-red-500' : 'border-gray-300'
                                    } rounded-xl shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    transition-all duration-200 input-field`}
                                    placeholder=""
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {errors.password && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <AlertCircle className="h-5 w-5 text-red-500" />
                                    </div>
                                )}
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600 error-message">{errors.password}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                                    Se souvenir de moi
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                                    Mot de passe oublié ?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl
                                shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none
                                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200
                                ${isLoading ? 'opacity-75 cursor-wait' : 'hover:-translate-y-1 hover:shadow-lg'}`}
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <LogIn className="w-5 h-5 mr-2" />
                                        Se connecter
                                    </>
                                )}
                            </button>
                        </div>

                        {errors.submit && (
                            <div className="rounded-lg bg-red-50 p-4 error-message">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <AlertCircle className="h-5 w-5 text-red-400" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-red-800">{errors.submit}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                {/* Sign up link */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Pas encore de compte ?{' '}
                        <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                            Inscrivez-vous
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;