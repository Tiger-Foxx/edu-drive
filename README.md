# **Edu-Drive - Plateforme de Vente de Formations**

## **Description**
Edu-Drive est un site web dédié à la vente de formations en ligne, stockées sur Google Drive. Les utilisateurs peuvent s'inscrire grâce à un système de parrainage, accéder à des formations après paiement, et bénéficier de commissions sur les inscriptions effectuées via leur lien de parrainage.

## **Fonctionnalités Principales**
### **1. Page d'accueil**
- Présentation des objectifs du site.
- Bouton d'action : **S'inscrire**, redirigeant vers le formulaire d'inscription.

### **2. Inscription avec code de parrainage obligatoire**
- Les utilisateurs ne peuvent pas s'inscrire sans un **code de parrainage**.
- Formulaire d'inscription collectant :
    - Nom
    - Email
    - Numéro de téléphone

### **3. Système de paiement intégré**
- Lors de l'inscription, l'utilisateur doit :
    - Remplir le formulaire.
    - Effectuer le paiement via un lien ou une API de paiement (prévoir le support d’un code PIN pour valider les transactions).
- Une fois le paiement validé, l'utilisateur :
    - Accède immédiatement aux formations disponibles.
    - Reçoit un message Gmail pour que l’administrateur puisse lui accorder un accès Google Drive.

### **4. Accès aux formations**
- Une page dédiée affiche :
    - Les liens des formations (hébergées sur Google Drive).
    - Une présentation sous forme de texte ou vidéo au-dessus de chaque lien.

### **5. Système de parrainage**
- Chaque utilisateur reçoit :
    - Un **lien de parrainage unique**.
    - Un **porte-monnaie virtuel** pour suivre ses commissions.
- Répartition des commissions :
    - **40 %** des frais d'inscription d'un filleul versés au parrain direct.
    - **10 %** supplémentaires versés au parrain indirect (niveau supérieur).
- Les gains sont automatiquement ajoutés au porte-monnaie des parrains.

### **6. Canal Telegram**
- Une image avec une proposition d’intégrer un **canal Telegram premium (10 000 XAF)** sera affichée sur la page principale après inscription (en haut et en bas de la page).

---

## **Technologies Utilisées**
- **Front-end** : React + Vite
- **Style** : Tailwind CSS et Bootstrap
- **Backend** : API de paiement (fourni par le revendeur)
- **Hébergement** : Cloud (à définir)
- **Gestion de stockage des formations** : Google Drive

---

## **Prérequis**
- **Node.js** (dernière version recommandée).
- Un compte Google Drive pour l’administrateur.
- Une API ou un lien de paiement pour gérer les transactions.

---

## **Installation et Configuration**

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/username/edu-drive.git
   cd edu-drive
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Configurer Tailwind CSS** :  
   Vérifiez que `tailwind.config.js` est correctement configuré pour détecter les fichiers du projet.  
   Exemple :
   ```javascript
   module.exports = {
     content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

4. **Configurer les paiements** :
    - Intégrez les API ou liens fournis par le revendeur pour les transactions.
    - Ajoutez un système de gestion des codes PIN, si nécessaire.

5. **Lancer le projet** :
   ```bash
   npm run dev
   ```

6. **Accéder au projet** :  
   Ouvrez le navigateur à l’adresse [http://localhost:3000](http://localhost:3000).

---

## **Fonctionnement**

### **Étapes pour les utilisateurs**
1. L’utilisateur arrive sur la page d’accueil et clique sur **S’inscrire**.
2. Il remplit le formulaire d'inscription avec :
    - Nom
    - Email
    - Numéro de téléphone
    - Code de parrainage
3. Il effectue le paiement en ligne.
4. Une fois le paiement validé, il accède :
    - Aux formations (avec lien et présentation).
    - À son lien de parrainage unique.
    - À son solde de parrainage.
5. S’il le souhaite, il peut rejoindre le canal Telegram premium (10 000 XAF).

---

## **Planification des Fonctionnalités Futures**
- Notifications en temps réel pour les administrateurs et utilisateurs.
- Automatisation de l’attribution des permissions Google Drive.
- Gestion des retraits des commissions des parrains directement via le site.
- Tableau de bord détaillé pour suivre les performances des parrainages.

---

## **Contributeurs**
- **Donfack Pascal Arthur** - Développeur principal

Pour toute question ou suggestion, merci de me contacter. 😊


