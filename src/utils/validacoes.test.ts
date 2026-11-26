// @ts-nocheck
import { validarEmail, formatarDistancia } from './validacoes';

describe('Validações e Formatadores do ReciclaSpot', () => {
    test('deve validar um e-mail correto', () => {
        expect(validarEmail('sofia.martins@email.com')).toBe(true);
    });

    test('deve rejeitar um e-mail inválido sem @', () => {
        expect(validarEmail('://martins.com')).toBe(false);
    });

    test('deve formatar distância menor que 1 km em metros', () => {
        expect(formatarDistancia(0.8)).toBe('800 m');
    });

    test('deve formatar distância maior ou igual a 1 km', () => {
        expect(formatarDistancia(1.6)).toBe('1.6 km');
    });
});
