import { useState } from 'react';
import { Mail, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVER_BASE_URL } from '@/Config';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Veuillez entrer votre adresse email.');
            return;
        }

        setIsLoading(true);
        setIsButtonDisabled(true);

        try {
            const response = await fetch(`${SERVER_BASE_URL}/password-reset/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erreur lors de la demande de réinitialisation');
            }

            setMessage('Un email de réinitialisation a été envoyé. Vérifiez vos spams si vous ne le trouvez pas.');
            setError('');
        } catch (error) {
            setError(error.message);
            setMessage('');
        } finally {
            setIsLoading(false);
            setTimeout(() => setIsButtonDisabled(false), 5000); // Désactiver le bouton pendant 5 secondes
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Mot de passe oublié ?
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Entrez votre email pour réinitialiser votre mot de passe.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                                    error ? 'border-red-500' : 'border-gray-300'
                                } rounded-xl shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                transition-all duration-200 input-field`}
                                placeholder=""
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {error && (
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <AlertCircle className="h-5 w-5 text-red-500" />
                                </div>
                            )}
                        </div>
                        {error && (
                            <p className="mt-2 text-sm text-red-600 error-message">{error}</p>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading || isButtonDisabled}
                            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl
                            shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none
                            focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200
                            ${isLoading || isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-lg'}`}
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                'Envoyer'
                            )}
                        </button>
                    </div>

                    {message && (
                        <div className="rounded-lg bg-green-50 p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-green-800">{message}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Retour à la <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">connexion</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;