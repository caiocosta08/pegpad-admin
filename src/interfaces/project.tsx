export interface Project {
    _id?: string;
    titulo: string;
    descricao: string;
    valor: number;
    valorPago: number;
    status: string;
    dataDeInicio: string;
    dataDeEntrega: string;
}