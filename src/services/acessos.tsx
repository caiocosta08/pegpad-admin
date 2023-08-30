import base from './base';

const acessosServices = {
    getAcessos: async () => {
        return (await base
            .get('/acessos/')).data
    },
    login: async (email: string, password: string) => {
        return (await base
            .get('/acessos/email/' + email)).data
    },
    register: async (data: any) => {
        return (await base
            .post('/acessos/', data)).data
    },
};

export default acessosServices;