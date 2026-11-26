# 🌱 ReciclaSpot (Loop) — Tecnologia Ambiental para Cidades Inteligentes

Aplicativo mobile desenvolvido em **React Native (Expo)** com o objetivo de conectar cidadãos e voluntários a pontos de coleta seletiva (Ecopontos) próximos, permitindo consulta offline de regras de descarte, registro fotográfico de comprovantes e integração com API REST.

---

## 📱 Funcionalidades Implementadas

### Sprint 1 & 2 — Interface, Hardware e Persistência Offline
* **Geolocalização e Mapa Interativo (`expo-location` + `react-native-maps`):** Localização do usuário em tempo real via GPS, exibição de pinos dos ecopontos e navegação para detalhes.
* **Registro Fotográfico (`expo-image-picker`):** Captura de foto pela câmera nativa do dispositivo para comprovação de descarte consciente, com modal de confirmação e persistência local.
* **Modo Offline (`@react-native-async-storage/async-storage`):** Sistema de favoritos salvo localmente (`@reciclaspot:favoritos`), garantindo acesso a endereços, horários e regras de descarte mesmo sem internet (Modo Avião).

### Sprint 3 — Integração Backend, Clean Code, Testes e Build
* **Consumo de API REST (`Axios`):** Integração com backend MockAPI (`GET /ecopontos`, `GET /ecopontos/:id` e `POST /usuarios`) com limite de timeout configurado em **8 segundos**.
* **Resiliência de Rede:** Implementação de *Pull-to-Refresh* (`RefreshControl` na `FlatList`) e componente visual de tratamento de falhas (`<ErroRede />`) com opção de tentar novamente.
* **Arquitetura Modular (Clean Code):** Separação clara entre rotas (`src/app`), componentes reutilizáveis (`src/components`), custom hooks (`src/hooks`), serviços HTTP (`src/services`), tipagens (`src/types`) e funções puras (`src/utils`).
* **Testes Unitários (`Jest`):** Suíte de testes automatizados cobrindo validação de e-mail e formatação de distâncias.

---

## 📂 Estrutura de Pastas

```text
src/
 ├── app/                  # Rotas e telas (Expo Router)
 │    ├── (tabs)/          # Navegação inferior (Explorar, Mapa, Salvos, Perfil)
 │    ├── detalhes/[id].tsx
 │    ├── index.tsx        # Splash Screen
 │    └── login.tsx        # Autenticação e cadastro (POST /usuarios)
 ├── components/           # Componentes visuais reutilizáveis (ErroRede)
 ├── hooks/                # Custom Hooks (useEcopontos)
 ├── services/             # Configuração do Axios e endpoints da API
 ├── types/                # Interfaces TypeScript (Ecoponto, Usuario)
 └── utils/                # Funções puras e testes unitários (validacoes.ts / .test.ts)
```

---

## 🚀 Como Executar o Projeto Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Airam-D/Reciclapost.git
   cd SEU-REPOSITORIO
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor do Expo:**
   ```bash
   npx expo start
   ```
   *(Escaneie o QR Code gerado no terminal utilizando o aplicativo **Expo Go** no seu smartphone).*

4. **Execute os testes unitários:**
   ```bash
   npx jest --preset ts-jest
   ```

---

## 📦 Download do Aplicativo (APK Android)

* **Link do Build (EAS Build):** `COLE_AQUI_O_LINK_GERADO_PELO_EAS_BUILD`

---

## 👨‍💻 Autores

* **Airam D' Avilla**
* **João Marcelo Monteiro de Oliveira**
* **Miguel Dos Santos Munhoz**
* **Pedro Augusto Fernandes Francelino**
* **Pietro Dipiassa Araya Tapia**