import axios from 'axios';
import { Ecoponto, Usuario } from '../types/models';

export const api = axios.create({
    baseURL: 'https://mockapi.io',
    timeout: 8000, // Requisito Sprint 3: limite de espera de 8 segundos
});

export const ecopontoService = {
    listar: async (material?: string): Promise<Ecoponto[]> => {
        const params = material ? { material } : undefined;
        const response = await api.get<Ecoponto[]>('/ecopontos', { params });
        return response.data;
    },

    buscarPorId: async (id: string): Promise<Ecoponto> => {
        const response = await api.get<Ecoponto>(`/ecopontos/${id}`);
        return response.data;
    },
};

export const usuarioService = {
    cadastrar: async (usuario: Usuario): Promise<Usuario> => {
        const response = await api.post<Usuario>('/usuarios', usuario);
        return response.data;
    },
};