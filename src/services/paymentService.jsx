// src/services/paymentService.js
import axios from 'axios';

const MONEROO_API_URL = 'https://api.moneroo.io/v1/payments/initialize';
const MONEYFUSION_API_URL = 'YOUR_MONEYFUSION_API_URL';
const MONEROO_SECRET_KEY = 'YOUR_MONEROO_SECRET_KEY';

export const initializePayment = async (formData) => {
    const { currency, email, name, userId } = formData;

    if (currency === 'XAF') {
        return initializeMonerooPayment(formData);
    } else if (currency === 'XOF') {
        return initializeMoneyFusionPayment(formData);
    }

    throw new Error('Currency not supported');
};

const initializeMonerooPayment = async (formData) => {
    const paymentData = {
        amount: 1000,
        currency: 'XAF',
        description: "Paiement pour l'inscription",
        customer: {
            email: formData.email,
            first_name: formData.name,
            last_name: formData.name,
        },
        return_url: `${window.location.origin}/payment/thank-you`,
        metadata: {
            user_id: formData.userId,
            payment_type: "inscription",
            provider: "moneroo"
        },
    };

    try {
        const response = await axios.post(
            MONEROO_API_URL,
            paymentData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${MONEROO_SECRET_KEY}`,
                    Accept: "application/json",
                },
            }
        );

        if (response.status === 201) {
            localStorage.setItem('paymentProvider', 'moneroo');
            localStorage.setItem('userId', formData.userId);
            return response.data.data.checkout_url;
        }
        throw new Error('Payment initialization failed');
    } catch (error) {
        throw new Error(`Moneroo payment error: ${error.message}`);
    }
};

const initializeMoneyFusionPayment = async (formData) => {
    const paymentData = {
        totalPrice: 1000,
        article: [
            {
                inscription: 1000,
            },
        ],
        personal_Info: [
            {
                userId: formData.userId,
                orderId: Date.now(),
            },
        ],
        numeroSend: formData.phone,
        nomclient: formData.name,
        return_url: `${window.location.origin}/payment/thank-you`,
    };

    try {
        const response = await axios.post(
            MONEYFUSION_API_URL,
            paymentData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.data.statut) {
            localStorage.setItem('paymentProvider', 'moneyfusion');
            localStorage.setItem('userId', formData.userId);
            localStorage.setItem('paymentToken', response.data.token);
            return response.data.url;
        }
        throw new Error('Payment initialization failed');
    } catch (error) {
        throw new Error(`MoneyFusion payment error: ${error.message}`);
    }
};

export const verifyPayment = async (queryParams) => {
    const provider = localStorage.getItem('paymentProvider');
    const userId = localStorage.getItem('userId');

    let verificationData = {
        user_id: userId,
        provider: provider,
    };

    if (provider === 'moneroo') {
        verificationData.transaction_id = queryParams.get('paymentId');
        verificationData.status = queryParams.get('paymentStatus');
    } else if (provider === 'moneyfusion') {
        const token = localStorage.getItem('paymentToken');
        const statusResponse = await axios.get(
            `https://www.pay.moneyfusion.net/paiementNotif/${token}`
        );
        verificationData.transaction_id = statusResponse.data.data.numeroTransaction;
        verificationData.status = statusResponse.data.data.statut;
    }

    return verificationData;
};