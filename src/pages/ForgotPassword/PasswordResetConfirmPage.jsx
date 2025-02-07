import { useState } from 'react';
import { Lock, AlertCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { SERVER_BASE_URL } from '@/Config';

const PasswordResetConfirmPage = () => {
    const { uid, token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword) {
            setError('Veuillez entrer un nouveau mot de passe.');
            return;
        }

        try {
            console.log(JSON.stringify({ uid, token, new_password: newPassword }))
            const response = await fetch(`${SERVER_BASE_URL}/password-reset/confirm/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid, token, new_password: newPassword }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erreur lors de la réinitialisation du mot de passe');
            }

            setMessage('Mot de passe réinitialisé avec succès.');
            setError('');
            setTimeout(() => navigate('/login'), 3000); // Rediriger vers la page de connexion après 3 secondes
        } catch (error) {
            setError(error.message);
            setMessage('');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Réinitialiser votre mot de passe
                    </h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                            Nouveau mot de passe
                        </label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                required
                                className={`appearance-none block w-full pl-10 pr-3 py-3 border ${
                                    error ? 'border-red-500' : 'border-gray-300'
                                } rounded-xl shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                transition-all duration-200 input-field`}
                                placeholder=""
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
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
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl
                            shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none
                            focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200
                            hover:-translate-y-1 hover:shadow-lg"
                        >
                            Réinitialiser
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
            </div>
        </div>
    );
};

export default PasswordResetConfirmPage;