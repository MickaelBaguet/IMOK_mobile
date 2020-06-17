/**
 * EXTERNAL URL ARE STORED HERE
 */
export const url = {
    passwordRecovery: 'https://www.google.com'
}

/**
* API ROUTES
*/
//const api_base_url = 'http://172.17.0.6:8000/api/'
const api_base_url = 'http://imok.am.manusien-ecolelamanu.fr/imok_api/current/public/api/'
export const API =  {
    login : api_base_url + 'auth/login',
    logout : api_base_url + 'auth/logout',
    customer_id: api_base_url + 'customers/',
    citiesSearch: api_base_url + 'cities/search/',
    customers: api_base_url + 'customers/',
    customersFind: api_base_url + 'customers/find/',
    estateSearch : api_base_url + 'estates/attr/arg',
    estateList : api_base_url + 'estates',
    appointments : api_base_url + 'appointments',
    appointmentsCustomer : api_base_url + 'appointments/customer/',
    appointmentsEmployee : api_base_url + 'appointments/employee/',
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