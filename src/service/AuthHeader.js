import AuthenticationService from "./AuthenticationService"

export function AuthHeader() {
    // return authorization header with jwt token
    const currentUser = AuthenticationService.getCurrentUser()
    console.log(JSON.parse(currentUser))
    // if (currentUser && currentUser.access_token) {
    //     return { Authorization: `Bearer ${currentUser.access_token}` };
    // } else {
    //     return {};
    // }
}