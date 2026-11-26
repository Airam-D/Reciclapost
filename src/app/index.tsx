import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SplashScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoRow}>
          <View style={styles.logoBadge}>
            <Ionicons name="sync-outline" size={24} color="#0D5C36" />
          </View>
          <Text style={styles.logoText}>loop</Text>
        </View>

        <Text style={styles.title}>
          TECNOLOGIA{"\n"}AMBIENTAL{"\n"}PARA CIDADES{"\n"}INTELIGENTES
        </Text>

        <Text style={styles.subtitle}>
          Dê o destino correto aos seus resíduos. Faça a diferença, perto de
          casa.
        </Text>

        <View style={styles.locationTag}>
          <Ionicons name="location-outline" size={16} color="#A7E3C0" />
          <Text style={styles.locationText}>
            Feito para um Brasil mais verde
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/login" as any)}
        >
          <Ionicons name="arrow-forward" size={18} color="#0D5C36" />
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/login" as any)}>
          <Text style={styles.loginLink}>
            Já faz parte do Green Code? Faça login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D5C36",
    justifyContent: "space-between",
    padding: 24,
  },
  content: {
    marginTop: 40
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32
  },
  logoBadge: {
    backgroundColor: "#8CE0B0",
    padding: 8,
    borderRadius: 12,
    marginRight: 10,
  },
  logoText: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold"
  },
  title: {
    color: "#FFF",
    fontSize: 34,
    fontWeight: "900",
    lineHeight: 40,
    marginBottom: 20,
  },
  subtitle: {
    color: "#D1F2DF",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  locationTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  locationText: {
    color: "#A7E3C0",
    fontSize: 13
  },
  footer: {
    marginBottom: 20,
    alignItems: "center",
    gap: 16
  },
  button: {
    backgroundColor: "#8CE0B0",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    color: "#0D5C36",
    fontWeight: "bold",
    fontSize: 16
  },
  loginLink: {
    color: "#D1F2DF",
    fontSize: 13
  },
});
    
  
    
    
    
  
    
    
    
  
    
    
    
  
    
    
  
    
    
    
  
    
    
    
  
    
    
  