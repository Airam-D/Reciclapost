import { useState, useEffect, useCallback } from 'react';
import { Ecoponto } from '../types/models';
import { ecopontoService } from '../services/api';

export function useEcopontos(filtroMaterial?: string) {
    const [ecopontos, setEcopontos] = useState<Ecoponto[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [atualizando, setAtualizando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    const carregarDados = useCallback(async (isRefresh = false) => {
        try {
            if (isRefresh) setAtualizando(true);
            else setCarregando(true);
            setErro(null);

            const dados = await ecopontoService.listar(filtroMaterial);
            setEcopontos(dados);
        } catch (e) {
            setErro('Erro ao carregar dados. Verifique sua conexão.');
        } finally {
            setCarregando(false);
            setAtualizando(false);
        }
    }, [filtroMaterial]);

    useEffect(() => {
        carregarDados();
    }, [carregarDados]);

    return { ecopontos, carregando, atualizando, erro, recarregar: carregarDados };
}