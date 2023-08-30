import base from './base';

const usuariosServices = {
    getUsers: async () => {
        return (await base
            .get('/usuarios/')).data
    },
    login: async (email: string, password: string) => {
        return (await base
            .get('/usuarios/email/' + email)).data
    },
    register: async (data: any) => {
        return (await base
            .post('/usuarios/', data)).data
    },
};

export default usuariosServices;