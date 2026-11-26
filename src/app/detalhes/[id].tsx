import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { ECOPONTOS } from '../../data/ecopontos';

const STORAGE_KEY = '@reciclaspot:favoritos';

export default function DetalhesScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const ponto = ECOPONTOS.find((item) => item.id === id) || ECOPONTOS[0];
    const [favorito, setFavorito] = useState(false);

    useEffect(() => {
        verificarFavorito();
    }, []);

    const verificarFavorito = async () => {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        const lista = json ? JSON.parse(json) : [];
        setFavorito(lista.some((item: any) => item.id === ponto.id));
    };

    const toggleFavorito = async () => {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        let lista = json ? JSON.parse(json) : [];

        if (favorito) {
            lista = lista.filter((item: any) => item.id !== ponto.id);
        } else {
            lista.push(ponto);
        }

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
        setFavorito(!favorito);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <Image source={{ uri: ponto.imagem }} style={styles.banner} />
                    <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={22} color="#1A241E" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.favBtn} onPress={toggleFavorito}>
                        <Ionicons
                            name={favorito ? 'heart' : 'heart-outline'}
                            size={22}
                            color={favorito ? '#D93025' : '#1A241E'}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.body}>
                    <Text style={styles.title}>{ponto.nome}</Text>
                    <Text style={styles.subInfo}>
                        ✔ Verificado · A {ponto.distancia} de distância · Coleta municipal
                    </Text>

                    <Text style={styles.sectionTitle}>O que você pode levar</Text>
                    <View style={styles.chipsRow}>
                        {ponto.materiais.map((mat) => (
                            <View key={mat} style={styles.chip}>
                                <Text style={styles.chipText}>{mat}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons name="time-outline" size={20} color="#0D5C36" />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.infoTitle}>{ponto.horario}</Text>
                            <Text style={styles.infoSub}>{ponto.dias}</Text>
                        </View>
                    </View>

                    <View style={styles.warningBox}>
                        <Text style={styles.warningTitle}>⚠️ Antes de deixar</Text>
                        <Text style={styles.warningText}>{ponto.aviso}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons name="location-outline" size={20} color="#0D5C36" />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.infoTitle}>{ponto.endereco}</Text>
                            <Text style={styles.infoSub}>{ponto.cepCidade}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.routeBtn} onPress={() => router.push('/(tabs)/mapa' as any)}>
                        <Ionicons name="navigate-outline" size={18} color="#FFF" />
                        <Text style={styles.routeBtnText}>Obter rotas</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    banner: {
        width: '100%',
        height: 220
    },
    backBtn: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 20,
    },
    favBtn: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 20,
    },
    body: {
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A241E',
        marginBottom: 4
    },
    subInfo: {
        fontSize: 13,
        color: '#0D5C36',
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1A241E',
        marginBottom: 10
    },
    chipsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 20
    },
    chip: {
        backgroundColor: '#EDF7F1', 
        paddingHorizontal: 12, 
        paddingVertical: 6, 
        borderRadius: 10
    },
    chipText: { 
        color: '#0D5C36', 
        fontWeight: '600', 
        fontSize: 13 
    },
    infoRow: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 18 
    },
    infoTitle: { 
        fontWeight: 'bold', 
        fontSize: 14, 
        color: '#1A241E' 
    },
    infoSub: { 
        fontSize: 12, 
        color: '#66706A' 
    },
    warningBox: {
        backgroundColor: '#FEF6E7',
        padding: 14,
        borderRadius: 12,
        marginBottom: 20,
    },
    warningTitle: { 
        fontWeight: 'bold', 
        color: '#8A5A00', 
        marginBottom: 4 
    },
    warningText: { 
        fontSize: 13, 
        color: '#6E4800', 
        lineHeight: 19 
    },
    routeBtn: {
        backgroundColor: '#0D5C36',
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginTop: 10,
    },
    routeBtnText: { 
        color: '#FFF', 
        fontWeight: 'bold', 
        fontSize: 16 
    },
});