import React, { useState, useEffect } from 'react';
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
  TextInput,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { descarteDbService, RegistroDescarte } from '../../services/database';

const Icon = Ionicons as any;
const FOTO_KEY = '@reciclaspot:ultima_foto';

export default function PerfilScreen() {
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [abrindoCamera, setAbrindoCamera] = useState(false);

  // Estados do CRUD SQLite (Módulo 4)
  const [descartes, setDescartes] = useState<RegistroDescarte[]>([]);
  const [material, setMaterial] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [ecoponto, setEcoponto] = useState('Ecoponto • Alcântara');
  const [idEditando, setIdEditando] = useState<number | null>(null);
  const [carregandoDb, setCarregandoDb] = useState(true);

  useEffect(() => {
    (async () => {
      const salva = await AsyncStorage.getItem(FOTO_KEY);
      if (salva) setFotoUri(salva);
      await carregarDescartes();
    })();
  }, []);

  const carregarDescartes = async () => {
    try {
      const lista = await descarteDbService.listar();
      setDescartes(lista);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar registros do SQLite.');
    } finally {
      setCarregandoDb(false);
    }
  };

  // CREATE / UPDATE no SQLite
  const handleSalvarDescarte = async () => {
    if (!material.trim() || !quantidade.trim() || !ecoponto.trim()) {
      Alert.alert('Aviso', 'Preencha material, quantidade e ecoponto!');
      return;
    }

    try {
      if (idEditando !== null) {
        await descarteDbService.atualizar(
          idEditando,
          material,
          quantidade,
          ecoponto
        );
        Alert.alert('Sucesso', 'Registro atualizado no SQLite!');
      } else {
        await descarteDbService.adicionar(material, quantidade, ecoponto);
        Alert.alert('Sucesso', 'Descarte salvo no banco local!');
      }
      limparFormulario();
      await carregarDescartes();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar no SQLite.');
    }
  };

  // DELETE no SQLite
  const handleDeletarDescarte = (id: number) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Deseja remover este registro do SQLite?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await descarteDbService.excluir(id);
            await carregarDescartes();
          },
        },
      ]
    );
  };

  const prepararEdicao = (item: RegistroDescarte) => {
    setIdEditando(item.id);
    setMaterial(item.material);
    setQuantidade(item.quantidade);
    setEcoponto(item.ecoponto);
  };

  const limparFormulario = () => {
    setIdEditando(null);
    setMaterial('');
    setQuantidade('');
    setEcoponto('Ecoponto • Alcântara');
  };

  const registrarFotoDescarte = async () => {
    setAbrindoCamera(true);
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      setAbrindoCamera(false);
      Alert.alert(
        'Permissão necessária',
        'Autorize o uso da câmera para registrar o descarte.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    setAbrindoCamera(false);

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setFotoUri(uri);
      await AsyncStorage.setItem(FOTO_KEY, uri);
      setModalVisivel(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoRow}>
          <View style={styles.logoBadge}>
            <Icon name="sync-outline" size={18} color="#FFF" />
          </View>
          <Text style={styles.logoText}>loop</Text>
        </View>

        <Text style={styles.title}>Seu perfil</Text>

        <View style={styles.userRow}>
          <Image
            source={{ uri: 'https://unsplash.com' }}
            style={styles.avatar}
          />
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
            Descarte Consciente: {12 + descartes.length}
          </Text>
          <Text style={styles.impactSub}>
            Registros salvos localmente no banco SQLite do dispositivo.
          </Text>
        </View>

        {/* FORMULÁRIO CRUD SQLITE */}
        <View style={styles.sqlBox}>
          <Text style={styles.sqlTitle}>
            {idEditando !== null
              ? '✏️ Editar Registro (SQLite)'
              : '➕ Registrar Material (SQLite)'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Material (ex: Pilhas, Óleo, Plástico)"
            value={material}
            onChangeText={setMaterial}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantidade (ex: 2 litros, 5 unidades)"
            value={quantidade}
            onChangeText={setQuantidade}
          />
          <TextInput
            style={styles.input}
            placeholder="Ecoponto (ex: Ecoponto • Alcântara)"
            value={ecoponto}
            onChangeText={setEcoponto}
          />

          <TouchableOpacity
            style={[styles.sqlBtn, idEditando !== null && styles.sqlBtnUpdate]}
            onPress={handleSalvarDescarte}
          >
            <Text style={styles.sqlBtnText}>
              {idEditando !== null ? 'Atualizar Registro' : 'Salvar no Banco Local'}
            </Text>
          </TouchableOpacity>

          {idEditando !== null && (
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={limparFormulario}
            >
              <Text style={styles.cancelText}>Cancelar Edição</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* LISTAGEM DO SQLITE */}
        <Text style={styles.sectionTitle}>
          Histórico Armazenado ({descartes.length})
        </Text>

        {carregandoDb ? (
          <ActivityIndicator color="#0D5C36" />
        ) : descartes.length === 0 ? (
          <Text style={styles.emptyText}>
            Nenhum descarte registrado no SQLite ainda.
          </Text>
        ) : (
          descartes.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemMat}>
                  {item.material} ({item.quantidade})
                </Text>
                <Text style={styles.itemEco}>{item.ecoponto}</Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => prepararEdicao(item)}>
                  <Text style={styles.btnEdit}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeletarDescarte(item.id)}>
                  <Text style={styles.btnDelete}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        {/* CÂMERA */}
        {fotoUri && (
          <View style={styles.previewBox}>
            <Text style={styles.previewTitle}>
              Último comprovante fotográfico:
            </Text>
            <Image source={{ uri: fotoUri }} style={styles.previewImage} />
          </View>
        )}

        <TouchableOpacity
          style={styles.cameraBtn}
          onPress={registrarFotoDescarte}
          disabled={abrindoCamera}
        >
          {abrindoCamera ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <Icon name="camera-outline" size={20} color="#FFF" />
              <Text style={styles.cameraBtnText}>
                Registrar nova foto de descarte
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalVisivel} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Icon name="checkmark-circle" size={48} color="#0D5C36" />
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
    marginBottom: 16,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfo: {
    marginLeft: 14,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A241E',
  },
  userCity: {
    fontSize: 13,
    color: '#66706A',
    marginVertical: 2,
  },
  badge: {
    backgroundColor: '#E8F3EC',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeText: {
    color: '#0D5C36',
    fontSize: 11,
    fontWeight: 'bold',
  },
  impactCard: {
    backgroundColor: '#0D4731',
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
  },
  impactLabel: {
    color: '#8CE0B0',
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  impactValue: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  impactSub: {
    color: '#D1F2DF',
    fontSize: 12,
  },
  sqlBox: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DCE3DF',
    marginBottom: 20,
  },
  sqlTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A241E',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DCE3DF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#F8FAF9',
  },
  sqlBtn: {
    backgroundColor: '#16A34A',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  sqlBtnUpdate: {
    backgroundColor: '#2563EB',
  },
  sqlBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  cancelBtn: {
    marginTop: 8,
    alignItems: 'center',
  },
  cancelText: {
    color: '#66706A',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A241E',
    marginBottom: 10,
  },
  emptyText: {
    color: '#66706A',
    fontSize: 13,
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1E7E3',
    marginBottom: 8,
  },
  itemInfo: {
    flex: 1,
  },
  itemMat: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A241E',
  },
  itemEco: {
    fontSize: 12,
    color: '#0D5C36',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  btnEdit: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  btnDelete: {
    color: '#DC2626',
    fontWeight: 'bold',
  },
  previewBox: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 14,
    marginTop: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DCE3DF',
  },
  previewTitle: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#1A241E',
    marginBottom: 8,
  },
  previewImage: {
    width: '100%',
    height: 160,
    borderRadius: 10,
  },
  cameraBtn: {
    backgroundColor: '#0D5C36',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  cameraBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A241E',
    marginTop: 10,
  },
  modalDesc: {
    textAlign: 'center',
    color: '#66706A',
    fontSize: 13,
    marginVertical: 8,
  },
  modalImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginVertical: 12,
  },
  modalBtn: {
    backgroundColor: '#0D5C36',
    width: '100%',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});