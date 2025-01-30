// src/services/formationService.jsx
import axios from 'axios';
import {SERVER_BASE_URL} from "@/Config.jsx";

export const formationService = {
    // Récupérer les formations populaires (limité à 5 par défaut)
    async getPopularFormations(limit = 5) {
        try {
            const response = await axios.get(`${SERVER_BASE_URL}/formations/?limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des formations:', error);
            return [];
        }
    },

    // Récupérer une formation spécifique
    async getFormationById(id) {
        try {
            const response = await axios.get(`${SERVER_BASE_URL}/formations/${id}/`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération de la formation:', error);
            throw error;
        }
    }
};