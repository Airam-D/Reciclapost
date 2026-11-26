import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { usuarioService } from '../services/api';
import { validarEmail } from '../utils/validacoes';

const Icon = Ionicons as any;

export default function LoginScreen() {
  const router = useRouter();
  const [perfil, setPerfil] = useState<'cidadao' | 'voluntario'>('cidadao');
  const [nome, setNome] = useState('Sofia Martins');
  const [email, setEmail] = useState('sofia.martins@email.com');
  const [senha, setSenha] = useState('1234567890');
  const [enviando, setEnviando] = useState(false);

  const handleEntrar = async () => {
    if (!validarEmail(email)) {
      Alert.alert(
        'E-mail inválido',
        'Por favor, digite um endereço de e-mail válido.'
      );
      return;
    }

    try {
      setEnviando(true);
      await usuarioService.cadastrar({ nome, email, perfil });
      router.replace('/(tabs)/explorar' as any);
    } catch (error) {
      Alert.alert(
        'Erro de conexão',
        'Não foi possível salvar seu cadastro na API agora. Tente novamente.'
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.logoRow}>
          <View style={styles.logoBadge}>
            <Icon name="sync-outline" size={20} color="#FFF" />
          </View>
          <Text style={styles.logoText}>loop</Text>
        </View>

        <Text style={styles.title}>É bom ter você aqui.</Text>
        <Text style={styles.subtitle}>Escolha como você fará a diferença.</Text>

        <View style={styles.roleRow}>
          <TouchableOpacity
            style={[styles.roleCard, perfil === 'cidadao' && styles.roleCardActive]}
            onPress={() => setPerfil('cidadao')}
          >
            <View style={styles.roleHeader}>
              <Icon name="person-outline" size={20} color="#0D5C36" />
              <Icon
                name={perfil === 'cidadao' ? 'checkmark-circle' : 'ellipse-outline'}
                size={18}
                color="#0D5C36"
              />
            </View>
            <Text style={styles.roleTitle}>Cidadão</Text>
            <Text style={styles.roleDesc}>
              Encontre e descarte de forma responsável
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleCard, perfil === 'voluntario' && styles.roleCardActive]}
            onPress={() => setPerfil('voluntario')}
          >
            <View style={styles.roleHeader}>
              <Icon name="heart-outline" size={20} color="#555" />
              <Icon
                name={perfil === 'voluntario' ? 'checkmark-circle' : 'ellipse-outline'}
                size={18}
                color="#555"
              />
            </View>
            <Text style={styles.roleTitle}>Voluntário</Text>
            <Text style={styles.roleDesc}>Ajude sua comunidade Local</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Sua Senha</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleEntrar}
          disabled={enviando}
        >
          {enviando ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <Icon name="arrow-forward" size={18} color="#FFF" />
              <Text style={styles.submitBtnText}>
                {perfil === 'cidadao'
                  ? 'Entrar como cidadão'
                  : 'Entrar como voluntário'}
              </Text>
            </>
          )}
        </TouchableOpacity>
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
    padding: 24,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoBadge: {
    backgroundColor: '#0D5C36',
    padding: 6,
    borderRadius: 10,
    marginRight: 8,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A241E',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A241E',
  },
  subtitle: {
    fontSize: 14,
    color: '#66706A',
    marginBottom: 20,
  },
  roleRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  roleCard: {
    flex: 1,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DCE3DF',
    backgroundColor: '#FFF',
  },
  roleCardActive: {
    borderColor: '#0D5C36',
    backgroundColor: '#EDF7F1',
  },
  roleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  roleTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#1A241E',
    marginBottom: 4,
  },
  roleDesc: {
    fontSize: 12,
    color: '#66706A',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A241E',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DCE3DF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  submitBtn: {
    backgroundColor: '#0D5C36',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  submitBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});