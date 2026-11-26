import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ECOPONTOS, Ecoponto } from '../../data/ecopontos';

export default function MapaScreen() {
  const router = useRouter();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [selecionado, setSelecionado] = useState<Ecoponto>(ECOPONTOS[0]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'Ative o GPS para localizar ecopontos próximos.'
        );
        setLoading(false);
        return;
      }

      const pos = await Location.getCurrentPositionAsync({});
      setLocation(pos);
      setLoading(false);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoBadge}>
          <Ionicons name="sync-outline" size={18} color="#FFF" />
        </View>
        <Text style={styles.logoText}>loop</Text>
      </View>

      <View style={styles.mapContainer}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#0D5C36" />
            <Text style={styles.loadingText}>Obtendo localização GPS...</Text>
          </View>
        ) : (
          <MapView
            style={styles.map}
            showsUserLocation={true}
            initialRegion={{
              latitude: location ? location.coords.latitude : ECOPONTOS[0].latitude,
              longitude: location ? location.coords.longitude : ECOPONTOS[0].longitude,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04,
            }}
          >
            {ECOPONTOS.map((ponto) => (
              <Marker
                key={ponto.id}
                coordinate={{
                  latitude: ponto.latitude,
                  longitude: ponto.longitude,
                }}
                pinColor="#0D5C36"
                onPress={() => setSelecionado(ponto)}
              >
                <Callout onPress={() => router.push(`/detalhes/${ponto.id}` as any)}>
                  <View style={styles.calloutBox}>
                    <Text style={styles.calloutTitle}>{ponto.nome}</Text>
                    <Text style={styles.calloutMaterials}>
                      {ponto.materiais.join(', ')}
                    </Text>
                    <Text style={styles.calloutAction}>Toque para detalhes →</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        )}
      </View>

      {/* Card Inferior fiel ao Figma */}
      <View style={styles.bottomCard}>
        <View style={styles.cardTop}>
          <Image source={{ uri: selecionado.imagem }} style={styles.thumb} />
          <View style={styles.cardInfo}>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>{selecionado.nome}</Text>
              <Text style={styles.dist}>{selecionado.distancia}</Text>
            </View>
            <Text style={styles.verified}>✔ Verificado</Text>
            <Text style={styles.addr}>{selecionado.endereco}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.btnVer}
          onPress={() => router.push(`/detalhes/${selecionado.id}` as any)}
        >
          <Ionicons name="arrow-forward" size={18} color="#FFF" />
          <Text style={styles.btnVerText}>Ver Ecoponto</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF9',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  mapContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DCE3DF',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#0D5C36',
    fontWeight: '600',
  },
  calloutBox: {
    padding: 6,
    width: 160,
  },
  calloutTitle: {
    fontWeight: 'bold',
  },
  calloutMaterials: {
    fontSize: 11,
  },
  calloutAction: {
    color: '#0D5C36',
    fontWeight: 'bold',
    marginTop: 4,
  },
  bottomCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E1E7E3',
  },
  cardTop: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#1A241E',
  },
  dist: {
    fontWeight: 'bold',
    color: '#0D5C36',
    fontSize: 13,
  },
  verified: {
    color: '#0D5C36',
    fontSize: 12,
    marginVertical: 2,
  },
  addr: {
    color: '#66706A',
    fontSize: 12,
  },
  btnVer: {
    backgroundColor: '#0D5C36',
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  btnVerText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});