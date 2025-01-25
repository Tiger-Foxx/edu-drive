import { useEffect } from "react";
import axios from "axios";

const PaymentThankYouPage = () => {
    useEffect(() => {
        // Récupérer les paramètres de l'URL
        const queryParams = new URLSearchParams(window.location.search);
        const transaction_id = queryParams.get("paymentId");
        const paymentStatus = queryParams.get("paymentStatus");
        const userId = localStorage.getItem("userId"); // Supposez que l'ID utilisateur est stocké dans le localStorage

        if (paymentStatus === "completed") {
            // Envoyer les données au backend pour créer un objet Payment
            axios
                .post("/api/payments/verify-and-create/", {
                    transaction_id,
                    user_id: userId,
                })
                .then((response) => {
                    console.log("Paiement enregistré :", response.data);
                    alert("Paiement réussi !");
                })
                .catch((error) => {
                    console.error("Erreur lors de l'enregistrement du paiement :", error.message);
                });
        } else {
            alert("Le paiement a échoué. Veuillez réessayer.");
        }
    }, []);

    return <div>Merci pour votre paiement. Nous traitons votre demande...</div>;
};

export default PaymentThankYouPage;
