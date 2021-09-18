import { CollectionRobin } from '@simplus/robin';
const SERVER_URL = ((window as any).SERVER_URL || { SERVER_URL: '' }).TURING_SERVER_URL || 'http://localhost:3010/';

export const robins = {
    RegisterRobin: new CollectionRobin({
        baseUrl: `${SERVER_URL}api/v1/authentication/register`,
    }),

    LoginRobin: new CollectionRobin({
        baseUrl: `${SERVER_URL}api/v1/authentication/login`,
    }),

}

