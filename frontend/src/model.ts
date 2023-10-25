export interface UserInterface {
    username: string;
    password: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export class User {
    // use a local storage token but shouldnt be implemented, this is a backend thingy
    static login(token: string) {
        localStorage.setItem('authToken', token);
    }

    static logout() {
        localStorage.removeItem('authToken');
    }

    static isLoggedIn(): boolean {
        return !!localStorage.getItem('authToken');
    }
}
