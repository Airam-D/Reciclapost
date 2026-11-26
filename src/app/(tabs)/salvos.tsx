import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Ecoponto } from '../../data/ecopontos';

const STORAGE_KEY = '@reciclaspot:favoritos';

export default function SalvosScreen() {
  const router = useRouter();
  const [salvos, setSalvos] = useState<Ecoponto[]>([]);

  const carregarSalvos = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (!json) {
        setSalvos([]);
        return;
      }
      const parsed = JSON.parse(json);
      setSalvos(Array.isArray(parsed) ? parsed : []);
    } catch (error) {
      console.error('Erro ao carregar ecopontos salvos:', error);
      setSalvos([]);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarSalvos();
    }, [carregarSalvos])
  );

  const quantidadeLabel =
    salvos.length === 1 ? '1 Ecoponto' : `${salvos.length} Ecopontos`;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.logoRow}>
          <View style={styles.logoBadge}>
            <Ionicons name="sync-outline" size={18} color="#FFF" />
          </View>
          <Text style={styles.logoText}>loop</Text>
        </View>

        <Text style={styles.title}>Seus lugares Salvos</Text>
        <Text style={styles.subtitle}>
          {quantidadeLabel}, prontos para quando você precisar.
        </Text>

        <View style={styles.offlineBanner}>
          <Ionicons name="cloud-offline-outline" size={22} color="#0D5C36" />
          <View style={styles.offlineContent}>
            <Text style={styles.offlineTitle}>Sem sinal? Sem problemas</Text>
            <Text style={styles.offlineDesc}>
              Endereços salvos, horários e regras de descarte estão disponíveis
              para consulta offline.
            </Text>
          </View>
        </View>

        {salvos.length === 0 ? (
          <Text style={styles.emptyText}>
            Nenhum ecoponto favoritado ainda. Abra um ecoponto e toque no
            coração!
          </Text>
        ) : (
          salvos.map((ponto) => (
            <TouchableOpacity
              key={ponto.id}
              style={styles.card}
              onPress={() => router.push(`/detalhes/${ponto.id}` as any)}
              activeOpacity={0.85}
            >
              <View style={styles.cardTop}>
                <Image source={{ uri: ponto.imagem }} style={styles.thumb} />
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{ponto.nome}</Text>
                  <Text style={styles.cardAddr}>{ponto.endereco}</Text>
                  <Text style={styles.verified}>
                    ✔ Verified · {ponto.distancia}
                  </Text>
                </View>
              </View>
              <Text style={styles.materials}>
                {ponto.materiais.join('  •  ')}
              </Text>
              <View style={styles.cardFooter}>
                <Text style={styles.offlineTag}>⬇ Disponível offline</Text>
                <Ionicons name="chevron-forward" size={16} color="#66706A" />
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF9',
  },
  scroll: {
    padding: 20,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  logoBadge: {
    backgroundColor: '#0D5C36',
    padding: 5,
    borderRadius: 8,
    marginRight: 6,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A241E',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A241E',
  },
  subtitle: {
    fontSize: 13,
    color: '#66706A',
    marginBottom: 16,
  },
  offlineBanner: {
    flexDirection: 'row',
    backgroundColor: '#E8F3EC',
    padding: 14,
    borderRadius: 14,
    marginBottom: 20,
    alignItems: 'center',
  },
  offlineContent: {
    flex: 1,
    marginLeft: 12,
  },
  offlineTitle: {
    fontWeight: 'bold',
    color: '#0D5C36',
    fontSize: 14,
    marginBottom: 2,
  },
  offlineDesc: {
    fontSize: 12,
    color: '#2F523E',
    lineHeight: 17,
  },
  emptyText: {
    textAlign: 'center',
    color: '#66706A',
    marginTop: 30,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E1E7E3',
  },
  cardTop: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#1A241E',
  },
  cardAddr: {
    fontSize: 12,
    color: '#66706A',
    marginVertical: 2,
  },
  verified: {
    fontSize: 12,
    color: '#0D5C36',
    fontWeight: '600',
  },
  materials: {
    fontSize: 12,
    color: '#444',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F0F4F1',
    paddingTop: 8,
  },
  offlineTag: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0D5C36',
  },
});