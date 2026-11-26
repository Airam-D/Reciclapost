export interface Ecoponto {
    id: string;
    nome: string;
    endereco: string;
    cepCidade: string;
    distancia: string;
    horario: string;
    dias: string;
    materiais: string[];
    aviso: string;
    imagem: string;
    latitude: number;
    longitude: number;
}

export const ECOPONTOS: Ecoponto[] = [
    {
        id: '1',
        nome: 'Ecoponto • Alcântara',
        endereco: 'Rua da Junqueira 94',
        cepCidade: '1300-343 Junqueira, São Paulo',
        distancia: '0.8 km',
        horario: 'Aberto agora · Fecha às 18:00',
        dias: 'Seg–sáb 09:00–18:00 · Domingo fechado',
        materiais: ['Eletrônico', 'Óleo', 'Baterias', 'Plástico'],
        aviso:
            'Vede o óleo usado. Isole os terminais das baterias com fita. Mantenha os materiais separados. Não descarte resíduos industriais.',
        imagem: 'https://unsplash.com',
        latitude: -23.5505,
        longitude: -46.6333,
    },
    {
        id: '2',
        nome: 'Ecoponto • Belém',
        endereco: 'Praça do Império 12',
        cepCidade: '03056-000 Belém, São Paulo',
        distancia: '1.6 km',
        horario: 'Aberto agora · Fecha às 18:00',
        dias: 'Seg–sáb 09:00–18:00 · Domingo fechado',
        materiais: ['Eletrônico', 'Óleo', 'Baterias', 'Plástico'],
        aviso:
            'Entregue eletrônicos inteiros sem desmontar. Óleo de cozinha deve estar frio e em garrafa PET fechada.',
        imagem: 'https://unsplash.com',
        latitude: -23.5435,
        longitude: -46.5905,
    },
];