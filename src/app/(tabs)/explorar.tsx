import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEcopontos } from "../../hooks/useEcopontos";
import { ErroRede } from "../../components/ErroRede";

const Icon = Ionicons as any;
const MATERIAIS_RAPIDOS = ["Eletrônico", "Óleo", "Baterias", "Plástico"];

export default function ExplorarScreen() {
  const router = useRouter();
  const [busca, setBusca] = useState("");
  const { ecopontos, carregando, atualizando, erro, recarregar } =
    useEcopontos();

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return ecopontos;
    return ecopontos.filter(
      (e) =>
        e.nome.toLowerCase().includes(termo) ||
        e.materiais.some((m) => m.toLowerCase().includes(termo)),
    );
  }, [busca, ecopontos]);

  const handleToggleChip = (item: string) => {
    setBusca((prev) => (prev.toLowerCase() === item.toLowerCase() ? "" : item));
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={erro ? [] : filtrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={atualizando}
            onRefresh={() => recarregar(true)}
            colors={["#0D5C36"]}
          />
        }
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View style={styles.logoRow}>
                <View style={styles.logoBadge}>
                  <Icon name="sync-outline" size={18} color="#FFF" />
                </View>
                <Text style={styles.logoText}>loop</Text>
              </View>
              <Icon name="notifications-outline" size={22} color="#1A241E" />
            </View>

            <Text style={styles.cityTag}>📍 São Paulo, Brasil</Text>
            <Text style={styles.title}>Para onde vai?</Text>

            <View style={styles.searchBox}>
              <Icon name="search" size={18} color="#7A857E" />
              <TextInput
                style={styles.searchInput}
                placeholder="Procurar por lugares ou materiais"
                value={busca}
                onChangeText={setBusca}
              />
            </View>

            <View style={styles.chipsRow}>
              {MATERIAIS_RAPIDOS.map((item) => {
                const ativo = busca.toLowerCase() === item.toLowerCase();
                return (
                  <TouchableOpacity
                    key={item}
                    style={[styles.chip, ativo && styles.chipActive]}
                    onPress={() => handleToggleChip(item)}
                  >
                    <Text
                      style={[styles.chipText, ativo && styles.chipTextActive]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Próximos Ecopontos</Text>
              <Text style={styles.sortText}>Puxe para atualizar ↓</Text>
            </View>

            {carregando && (
              <ActivityIndicator
                size="large"
                color="#0D5C36"
                style={{ marginTop: 20 }}
              />
            )}
            {erro && (
              <ErroRede
                mensagem={erro}
                onTentarNovamente={() => recarregar()}
              />
            )}
          </>
        }
        renderItem={({ item: ponto }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/detalhes/${ponto.id}` as any)}
          >
            <Image source={{ uri: ponto.imagem }} style={styles.cardImage} />
            <View style={styles.badgeOpen}>
              <Text style={styles.badgeOpenText}>🕒 Aberto até 18:00</Text>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>{ponto.nome}</Text>
                <Text style={styles.cardDist}>{ponto.distancia}</Text>
              </View>
              <Text style={styles.cardAddr}>{ponto.endereco}, São Paulo</Text>
              <Text style={styles.cardMaterials}>
                {ponto.materiais.join("  •  ")}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F8FAF9" 
  },
  scroll: { 
    padding: 20 
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  logoRow: { 
    flexDirection: "row", 
    alignItems: "center" 
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
    color: "#1A241E" 
  },
  cityTag: {
    fontSize: 12,
    color: "#0D5C36",
    fontWeight: "600",
    marginBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1A241E",
    marginBottom: 14,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E1E7E3",
    marginBottom: 14,
  },
  searchInput: { 
    marginLeft: 8, 
    flex: 1 
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  chip: {
    backgroundColor: "#E8F3EC",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  chipActive: { 
    backgroundColor: "#0D5C36" 
  },
  chipText: { 
    color: "#0D5C36", 
    fontSize: 12, 
    fontWeight: "600" 
  },
  chipTextActive: { 
    color: "#FFF" 
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: { 
    fontSize: 17, 
    fontWeight: "bold", 
    color: "#1A241E" 
  },
  sortText: { 
    fontSize: 12, 
    color: "#66706A" 
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5EBE7",
  },
  cardImage: { 
    width: "100%", 
    height: 140 
  },
  badgeOpen: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeOpenText: { 
    fontSize: 11, 
    fontWeight: "bold", 
    color: "#0D5C36" 
  },
  cardBody: { 
    padding: 14 
  },
  cardTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  cardTitle: { 
    fontSize: 16, 
    fontWeight: "bold", 
    color: "#1A241E" 
  },
  cardDist: { 
    fontSize: 13, 
    fontWeight: "bold", 
    color: "#0D5C36" 
  },
  cardAddr: { 
    fontSize: 13, 
    color: "#66706A", 
    marginBottom: 8 
  },
  cardMaterials: { 
    fontSize: 12, 
    color: "#0D5C36", 
    fontWeight: "500" 
  },
});