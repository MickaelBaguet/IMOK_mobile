/**
 * EXTERNAL URL ARE STORED HERE
 */
export const url = {
    passwordRecovery: 'https://www.google.com'
}

/**
* API ROUTES
*/
// const api_base_url = 'http://0.0.0.0:80/api/'
// const api_base_url = 'http://http://imok-api.local.fr/api/'
const api_base_url = 'http://imok.am.manusien-ecolelamanu.fr/current/public/api/'

export const API =  {
    login : api_base_url + 'auth/login',
    logout : api_base_url + 'auth/logout',
    customers: api_base_url + 'customers',
    customer_id: api_base_url + 'customers/',
    estateSearch : api_base_url + 'estates/search',
    estateList : api_base_url + 'estates'
}

/**
 * STYLING COLORS ARE STORED HERE
 * NO BAD TASTE ALLOWED
 */
export const colors =  {
    primary : '#230d74',
    success: '#5cb85c',
    danger: '#cb2431',
    link: '#0051cc'
}