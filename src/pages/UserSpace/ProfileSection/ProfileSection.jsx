import  { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    Lock,
    Edit2,
    Save,
    X,
    CheckCircle
} from 'lucide-react';
import {Alert, AlertDescription} from "../../../components/ui/alert";

const ProfileSection = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: 'Jean Dupont',
        email: 'jean.dupont@example.com',
        phone: '+237 612345678',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [originalData] = useState({ ...formData });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulation de la mise à jour
        setTimeout(() => {
            setIsEditing(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 500);
    };

    const handleCancel = () => {
        setFormData(originalData);
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
                            <p className="text-gray-600">Gérez vos informations personnelles</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`flex items-center px-4 py-2 rounded-lg transition-colors
              ${isEditing
                            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        }`}
                    >
                        {isEditing ? (
                            <>
                                <X className="w-4 h-4 mr-2" />
                                Annuler
                            </>
                        ) : (
                            <>
                                <Edit2 className="w-4 h-4 mr-2" />
                                Modifier
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Success Message */}
            {showSuccess && (
                <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                        Vos informations ont été mises à jour avec succès !
                    </AlertDescription>
                </Alert>
            )}

            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
                {/* Personal Information */}
                <div className="p-6 space-y-6">
                    <h2 className="text-xl font-semibold">Informations Personnelles</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Nom complet</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Téléphone</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Password Change */}
                {isEditing && (
                    <div className="p-6 space-y-6">
                        <h2 className="text-xl font-semibold">Changer le mot de passe</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Mot de passe actuel</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={formData.currentPassword}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Nouveau mot de passe</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form Actions */}
                {isEditing && (
                    <div className="p-6 bg-gray-50 flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Enregistrer
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ProfileSection;