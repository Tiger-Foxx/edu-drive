import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { toast } from 'react-toastify';
import { SERVER_BASE_URL } from "@/Config.jsx";
import { verifySoPayPayment, mapSoPayStatus, handleSoPayError } from '@/services/sopayService.js';

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
        const sopayTransactionId = localStorage.getItem('sopayTransactionId');

        if (!userId || !provider) {
          throw new Error('Informations de paiement manquantes');
        }

        let verificationData = {
          user_id: userId,
          provider: provider
        };

        if (provider === 'sopay') {
          // Nouvelle logique SoPay (remplace Campay)
          let transactionId = sopayTransactionId;

          // Si pas d'ID stocké, essayer de le récupérer depuis l'URL
          if (!transactionId) {
            transactionId = queryParams.get('transaction_id') || queryParams.get('reference');
          }

          if (!transactionId) {
            throw new Error('ID de transaction SoPay manquant');
          }

          // Ajouter un délai pour laisser le temps à SoPay de traiter
          await new Promise(resolve => setTimeout(resolve, 3000));

          const statusResponse = await verifySoPayPayment(transactionId);

          verificationData.transaction_id = transactionId;
          verificationData.status = mapSoPayStatus(statusResponse.status);
          verificationData.amount = statusResponse.amount;
          verificationData.currency = statusResponse.currency;
          verificationData.paid_at = statusResponse.paid_at;
          verificationData.payment_method = statusResponse.payment_method;

        } else if (provider === 'moneyfusion') {
          // Logique MoneyFusion inchangée
          if (!paymentToken) {
            throw new Error('Token MoneyFusion manquant');
          } else {
            console.log("--------------------------------------------------------------------------------------");
            console.log("Token de paiement : ", paymentToken);
            console.log("--------------------------------------------------------------------------------------");
          }

          const statusResponse = await axios.get(
              `https://www.pay.moneyfusion.net/paiementNotif/${paymentToken}`
          );

          console.log(statusResponse);
          if (!statusResponse.data.data) {
            throw new Error('Réponse MoneyFusion invalide');
          }

          verificationData.transaction_id = statusResponse.data.data._id || statusResponse.data.data.numeroTransaction || statusResponse.data.data.personal_Info.orderId || paymentToken;
          verificationData.status = statusResponse.data.data.statut;
        }

        console.log("--------------------------------------------------------------------------------------");
        console.log("Verification des données : ", verificationData);
        console.log("--------------------------------------------------------------------------------------");

        // Envoi au backend
        const response = await axios.post(
            `${SERVER_BASE_URL}/payments/verify/`,
            verificationData
        );

        if (response.data.success) {
          setStatus('success');
          setMessage(response.data.message || 'Paiement confirmé avec succès !');

          // Afficher un message d'information
          setTimeout(() => {
            alert("Veuillez vérifier vos mails dans les 4 heures (Max) pour accepter l'invitation à la formation.");
            window.location.href = '/login';
          }, 2000);

          // Nettoyage
          localStorage.removeItem('userId');
          localStorage.removeItem('paymentProvider');
          localStorage.removeItem('paymentToken');
          localStorage.removeItem('sopayTransactionId');
        } else {
          console.log("--------------------------------------------------------------------------------------");
          console.log("Erreur de paiement : ", response.data);
          console.log("--------------------------------------------------------------------------------------");
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.log("--------------------------------------------------------------------------------------");
        console.log("Erreur de paiement : ", error.response?.data || error.message);
        console.log("--------------------------------------------------------------------------------------");

        // Gestion spéciale pour les erreurs "déjà payé"
        if (error.response?.data?.message?.includes('déjà')) {
          setStatus('success');
          setMessage('Paiement confirmé avec succès !');
        } else {
          setStatus('error');

          // Gestion d'erreur améliorée selon le provider
          const provider = localStorage.getItem('paymentProvider');
          const errorMessage = provider === 'sopay' ?
              handleSoPayError(error) :
              (error.response?.data?.error || error.message);

          setMessage(errorMessage);
        }
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
          message: message || "Patientez un peu après inscription et vos formations seront disponibles. Contactez le service client en cas de problème.",
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