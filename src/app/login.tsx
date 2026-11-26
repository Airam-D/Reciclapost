import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Perfil = 'cidadao' | 'voluntario';

export default function LoginScreen() {
  const router = useRouter();
  const [perfil, setPerfil] = useState<Perfil>('cidadao');
  const [email, setEmail] = useState('sofia.martins@email.com');
  const [senha, setSenha] = useState('1234567890');

  const handleLogin = () => {
    router.replace('/(tabs)/explorar' as any);
  };

  const isCidadao = perfil === 'cidadao';
  const isVoluntario = perfil === 'voluntario';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoRow}>
          <View style={styles.logoBadge}>
            <Ionicons name="sync-outline" size={20} color="#FFF" />
          </View>
          <Text style={styles.logoText}>loop</Text>
        </View>

        <Text style={styles.title}>É bom ter você aqui.</Text>
        <Text style={styles.subtitle}>Escolha como você fará a diferença.</Text>

        <View style={styles.roleRow}>
          <TouchableOpacity
            style={[styles.roleCard, isCidadao && styles.roleCardActive]}
            onPress={() => setPerfil('cidadao')}
            activeOpacity={0.8}
          >
            <View style={styles.roleHeader}>
              <Ionicons name="person-outline" size={20} color="#0D5C36" />
              <Ionicons
                name={isCidadao ? 'checkmark-circle' : 'ellipse-outline'}
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
            style={[styles.roleCard, isVoluntario && styles.roleCardActive]}
            onPress={() => setPerfil('voluntario')}
            activeOpacity={0.8}
          >
            <View style={styles.roleHeader}>
              <Ionicons name="heart-outline" size={20} color="#555" />
              <Ionicons
                name={isVoluntario ? 'checkmark-circle' : 'ellipse-outline'}
                size={18}
                color="#555"
              />
            </View>
            <Text style={styles.roleTitle}>Voluntário</Text>
            <Text style={styles.roleDesc}>Ajude sua comunidade Local</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="seu@email.com"
        />

        <Text style={styles.label}>Sua Senha</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          placeholder="Digite sua senha"
        />

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleLogin}
          activeOpacity={0.85}
        >
          <Ionicons name="arrow-forward" size={18} color="#FFF" />
          <Text style={styles.submitBtnText}>
            {isCidadao ? 'Entrar como cidadão' : 'Entrar como voluntário'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.orText}>ou</Text>

        <TouchableOpacity
          style={styles.socialBtn}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Ionicons name="logo-apple" size={20} color="#000" />
          <Text style={styles.socialText}>Continuar com Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialBtn}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Ionicons name="mail-outline" size={20} color="#0D5C36" />
          <Text style={styles.socialText}>Continuar com Email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialBtn}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Ionicons name="logo-windows" size={20} color="#0078D4" />
          <Text style={styles.socialText}>Continuar com Microsoft</Text>
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
  orText: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 16,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DCE3DF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  socialText: {
    fontWeight: '600',
    color: '#1A241E',
  },
});
    
        
        
        
    
        
        