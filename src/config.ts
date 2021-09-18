import Cookies from 'universal-cookie'
const cookies = new Cookies();

export const config = {
    headers: { Authorization: `Bearer` }
};

export const getConfig = () => {

    return {
        headers: { Authorization: `Bearer ${cookies.get('token')}` }
    };

}