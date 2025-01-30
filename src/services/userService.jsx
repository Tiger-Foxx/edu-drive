export function getCurrentUser() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        return user;
    }
    return null;
}

export function logoutUser(){
    localStorage.removeItem('user');
    window.location.href = '/signin'; // Redirection vers la page de connexion
}

export function checkUserPaid(){
    const user = getCurrentUser();
    if(user){
        const userObj = user;
        return userObj.is_paid;
    }
    return false;
}