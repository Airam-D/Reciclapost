import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Icon = Ionicons as any;

interface Props {
    mensagem: string;
    onTentarNovamente: () => void;
}

export function ErroRede({ mensagem, onTentarNovamente }: Props) {
    return (
        <View style={styles.container} >
            <Icon name="cloud-offline-outline" size={48} color="#D93025" />
            <Text style={styles.texto}> {mensagem} </Text>
            < TouchableOpacity style={styles.botao} onPress={onTentarNovamente} >
                <Text style={styles.botaoTexto}> Tentar Novamente </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        marginTop: 30
    },
    texto: {
        textAlign: 'center',
        color: '#444',
        fontSize: 15,
        marginVertical: 12
    },
    botao: {
        backgroundColor: '#0D5C36',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10
    },
    botaoTexto: {
        color: '#FFF',
        fontWeight: 'bold'
    },
});
