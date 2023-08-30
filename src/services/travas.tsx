import base from './base';

const travasServices = {
    getTravas: async () => {
        return (await base
            .get('/travas/')).data
    },
    login: async (email: string, password: string) => {
        return (await base
            .get('/travas/email/' + email)).data
    },
    register: async (data: any) => {
        return (await base
            .post('/travas/', data)).data
    },
};

export default travasServices;