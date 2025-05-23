import axios from 'axios';
import { SOPAY_API_BASE_URL, SOPAY_API_TOKEN, SOPAY_API_KEY } from '@/Config.jsx';

// Service pour la conversion de devises
export const convertCurrency = async (amount, fromCurrency, toCurrency) => {
    try {
        const response = await axios.get(`${SOPAY_API_BASE_URL}/convert`, {
            params: {
                amount: amount,
                devise: fromCurrency,
                out: toCurrency
            },
            headers: {
                'apikey': SOPAY_API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur conversion SoPay:', error);
        throw new Error(error.response?.data?.message || 'Erreur de conversion de devise');
    }
};

// Service pour créer un paiement SoPay
export const createSoPayPayment = async (paymentData) => {
    try {
        const response = await axios.post(`${SOPAY_API_BASE_URL}/payment`, paymentData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SOPAY_API_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur création paiement SoPay:', error);
        const errorMessage = error.response?.data?.message || 'Erreur lors de la création du paiement';
        throw new Error(errorMessage);
    }
};

// Service pour vérifier le statut d'un paiement
export const verifySoPayPayment = async (transactionId) => {
    try {
        const response = await axios.get(`${SOPAY_API_BASE_URL}/payment/${transactionId}`, {
            headers: {
                'Authorization': `Bearer ${SOPAY_API_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur vérification SoPay:', error);
        throw new Error(error.response?.data?.message || 'Erreur de vérification du paiement');
    }
};

// Utilitaire pour mapper les statuts SoPay vers nos statuts internes
export const mapSoPayStatus = (sopayStatus) => {
    switch (sopayStatus) {
        case 'SUCCESS':
            return 'success';
        case 'PENDING':
        case 'INITIATED':
            return 'pending';
        case 'FAILED':
        case 'EXPIRED':
            return 'failed';
        default:
            return 'unknown';
    }
};

// Utilitaire pour gérer les erreurs SoPay
export const handleSoPayError = (error) => {
    if (error.response?.data?.code) {
        switch (error.response.data.code) {
            case 'INVALID_PARAMS':
                return 'Paramètres de paiement invalides';
            case 'UNSUPPORTED_CURRENCY':
                return 'Devise non supportée';
            case 'UNAUTHORIZED':
                return 'Erreur d\'authentification';
            case 'FORBIDDEN':
                return 'Accès non autorisé';
            case 'RATE_LIMIT_EXCEEDED':
                return 'Trop de requêtes, veuillez réessayer plus tard';
            case 'SERVER_ERROR':
                return 'Erreur serveur temporaire, veuillez réessayer';
            default:
                return error.response.data.message || 'Erreur de paiement';
        }
    }
    return error.message || 'Erreur inconnue';
};