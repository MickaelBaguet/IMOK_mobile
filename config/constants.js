/**
 * EXTERNAL URL ARE STORED HERE
 */
export const url = {
    passwordRecovery: 'https://www.google.com'
}

/**
* API ROUTES
*/
const api_base_url = 'http://172.17.0.6:8000/api/'
export const API =  {
    login : api_base_url + 'auth/login',
    logout : api_base_url + 'auth/logout',
    customers: api_base_url + 'customers',
    customer_id: api_base_url + 'customers/',
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


/**
 * TEST DATA
 */


export const fakeCustomers = [
    {
        "id": 1,
        "firstname": "JeanPierre",
        "lastname": "Martin",
        "street": "27 rue de la bas",
        "complement": "",
        "phone": "0784565443",
        "mail": "jeanmimi@gmail.com",
        "id_marital_status": 1,
        "id_cities": 30,
        "civility": 0,
        "birthdate": null,
        "date_register": null
    },
    {
        "id": 2,
        "firstname": "Sébastien",
        "lastname": "Hinard",
        "street": "27 rue Albert Gaudry",
        "complement": "",
        "phone": "0676791616",
        "mail": "se.hinard@gmail.com",
        "id_marital_status": 5,
        "id_cities": 1,
        "civility": 0,
        "birthdate": "1982-11-16",
        "date_register": "2020-01-16"
    },
    {
        "id": 3,
        "firstname": "Nicolas",
        "lastname": "Personne",
        "street": "quelquepart",
        "complement": "sur amiens",
        "phone": "0789877665",
        "mail": "nicolaspersonne@personne.fr",
        "id_marital_status": 6,
        "id_cities": 31724,
        "civility": 1,
        "birthdate": "1993-07-28",
        "date_register": "2020-01-10"
    },
    {
        "id": 4,
        "firstname": "Michel",
        "lastname": "Martin",
        "street": "Chez wam",
        "complement": null,
        "phone": "0678899012",
        "mail": "MichMich@gmail.com",
        "id_marital_status": 1,
        "id_cities": 31724,
        "civility": 0,
        "birthdate": "1982-11-16",
        "date_register": "2020-03-09"
    },
    {
        "id": 5,
        "firstname": "Micheline",
        "lastname": "Martin",
        "street": "Chez wam",
        "complement": null,
        "phone": "0678899012",
        "mail": "Micheline@gmail.com",
        "id_marital_status": 1,
        "id_cities": 31724,
        "civility": 0,
        "birthdate": "1982-11-16",
        "date_register": "2020-03-10"
    },
    {
        "id": 6,
        "firstname": "bob",
        "lastname": "michel",
        "street": "chez moi",
        "complement": null,
        "phone": "0878787878",
        "mail": "toto@tata.fr",
        "id_marital_status": 1,
        "id_cities": 24,
        "civility": 1,
        "birthdate": "1982-11-17",
        "date_register": null
    },
    {
        "id": 7,
        "firstname": "Leponge",
        "lastname": "Bob",
        "street": "27 rue Albert Gaudry",
        "complement": "",
        "phone": "0676791616",
        "mail": "bobbobbob@bobbobob.bob",
        "id_marital_status": 1,
        "id_cities": 31724,
        "civility": 0,
        "birthdate": "2020-05-20",
        "date_register": "2020-05-12"
    }
]