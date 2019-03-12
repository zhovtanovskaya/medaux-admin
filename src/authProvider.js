import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';

const API_ROOT = 'http://localhost:8000/api';
const CLIENT_ID = 'DfGQBxljWI8jrkAtVil5g4w0SYdieh1e1MNmmdvC';
const CLIENT_SECRET = 'tikHWCJfK48Z47nnlE7G3kPdNKxnL86OeP8of38Wj0Z02FMq9HSbXtkg65uNN7EZAvjkM4HqIWngyc0RgFWVy9IlUYhCdcxI14Nd6quHJpYy9IZMfHqqK5f7E7fuYLn5';

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        // Get OAuth 2.0 access token.
        const { username, password } = params;
        var data = new URLSearchParams();
        data.append('username', username);
        data.append('password', password);
        data.append('grant_type', 'password');
        var credentials = window.btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
        var headers  = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + credentials,
        }
        const options = {
            method: 'POST',
            body: data.toString(),
            headers: new Headers(headers),
        }
        const url = `${API_ROOT}/token/`;
        const request = new Request(url, options);
        fetch(request).then(response => {
            console.log(request, response);
        });
        return Promise.resolve();
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('username');
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem('username')
            ? Promise.resolve()
            : Promise.reject();
    }
    return Promise.reject('Unknown method');
};