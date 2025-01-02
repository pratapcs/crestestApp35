export const isAuthenticated = (state) => {
    if (state.auth.token) {
        return true;
    } else {
        return false;
    }
};
