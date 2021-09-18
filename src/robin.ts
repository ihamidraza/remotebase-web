import { CollectionRobin, RobinProvider } from '@simplus/robin';
import RobinReact from '@simplus/robin-react';

const SERVER_URL = ((window as any).SERVER_URL || { SERVER_URL: '' }).SERVER_URL || 'http://localhost:3010/';

export const robins = {
    RegisterRobin: new CollectionRobin({
        baseUrl: `${SERVER_URL}api/v1/authentication/register`,
    }),

    LoginRobin: new CollectionRobin({
        baseUrl: `${SERVER_URL}api/v1/authentication/login`,
    }),
    ActivitiesRobin: new CollectionRobin({
        baseUrl: `${SERVER_URL}api/v1/activities`,
    }),
    JoinActivityRobin: new CollectionRobin({
        baseUrl: `${SERVER_URL}api/v1/activities/join`,
    }),

}

const provider = new RobinProvider(robins);

export default () => RobinReact.setProvider(provider);

