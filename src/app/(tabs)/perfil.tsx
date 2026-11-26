import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const FOTO_KEY = "@reciclaspot:ultima_foto";
const AVATAR_URI =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80";

export default function PerfilScreen() {
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [abrindoCamera, setAbrindoCamera] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const salva = await AsyncStorage.getItem(FOTO_KEY);
        if (salva) setFotoUri(salva);
      } catch (error) {
        console.error("Erro ao carregar foto salva:", error);
      }
    })();
  }, []);

  const registrarFotoDescarte = async () => {
    setAbrindoCamera(true);
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Autorize o uso da câmera para registrar o descarte.",
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setFotoUri(uri);
        await AsyncStorage.setItem(FOTO_KEY, uri);
        setModalVisivel(true);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível abrir a câmera.");
      console.error(error);
    } finally {
      setAbrindoCamera(false);
    }
  };

  const totalDescartes = fotoUri ? 13 : 12;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.logoRow}>
          <View style={styles.logoBadge}>
            <Ionicons name="sync-outline" size={18} color="#FFF" />
          </View>
          <Text style={styles.logoText}>loop</Text>
        </View>

        <Text style={styles.title}>Seu perfil</Text>

        <View style={styles.userRow}>
          <Image source={{ uri: AVATAR_URI }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Sofia Martins</Text>
            <Text style={styles.userCity}>Osvaldo Cruz, São Paulo</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>🌿 Cidadão</Text>
            </View>
          </View>
        </View>

        <View style={styles.impactCard}>
          <Text style={styles.impactLabel}>SEU IMPACTO LOCAL</Text>
          <Text style={styles.impactValue}>
            Descarte Consciente: {totalDescartes}
          </Text>
          <Text style={styles.impactSub}>
            {totalDescartes} pequenas escolhas. Uma cidade mais limpa.
          </Text>
        </View>

        {/* Preview da foto tirada pela câmera (persiste offline) */}
        {fotoUri && (
          <View style={styles.previewBox}>
            <Text style={styles.previewTitle}>
              Último comprovante registrado:
            </Text>
            <Image source={{ uri: fotoUri }} style={styles.previewImage} />
          </View>
        )}

        <TouchableOpacity
          style={styles.cameraBtn}
          onPress={registrarFotoDescarte}
          disabled={abrindoCamera}
          activeOpacity={0.85}
        >
          {abrindoCamera ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <Ionicons name="camera-outline" size={20} color="#FFF" />
              <Text style={styles.cameraBtnText}>
                Registrar nova foto de descarte
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de Confirmação exigido na Sprint 2 */}
      <Modal
        visible={modalVisivel}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Ionicons name="checkmark-circle" size={48} color="#0D5C36" />
            <Text style={styles.modalTitle}>Descarte Registrado!</Text>
            <Text style={styles.modalDesc}>
              Sua foto foi salva localmente como comprovante ambiental.
            </Text>
            {fotoUri && (
              <Image source={{ uri: fotoUri }} style={styles.modalImage} />
            )}
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => setModalVisivel(false)}
              activeOpacity={0.85}
            >
              <Text style={styles.modalBtnText}>Concluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAF9",
  },
  scroll: {
    padding: 20,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  logoBadge: {
    backgroundColor: "#0D5C36",
    padding: 5,
    borderRadius: 8,
    marginRight: 6,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A241E",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A241E",
    marginBottom: 16,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E8F3EC",
  },
  userInfo: {
    marginLeft: 14,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A241E",
  },
  userCity: {
    fontSize: 13,
    color: "#66706A",
    marginVertical: 2,
  },
  badge: {
    backgroundColor: "#E8F3EC",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeText: {
    color: "#0D5C36",
    fontSize: 11,
    fontWeight: "bold",
  },
  impactCard: {
    backgroundColor: "#0D4731",
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
  },
  impactLabel: {
    color: "#8CE0B0",
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 4,
  },
  impactValue: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  impactSub: {
    color: "#D1F2DF",
    fontSize: 12,
  },
  previewBox: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#DCE3DF",
  },
  previewTitle: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#1A241E",
    marginBottom: 8,
  },
  previewImage: {
    width: "100%",
    height: 160,
    borderRadius: 10,
  },
  cameraBtn: {
    backgroundColor: "#0D5C36",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  cameraBtnText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A241E",
    marginTop: 10,
  },
  modalDesc: {
    textAlign: "center",
    color: "#66706A",
    fontSize: 13,
    marginVertical: 8,
  },
  modalImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    marginVertical: 12,
  },
  modalBtn: {
    backgroundColor: "#0D5C36",
    width: "100%",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  modalBtnText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
