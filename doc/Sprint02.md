## ⚡ **SPRINT 2: Recursos Nativos e Persistência (O "Músculo")**

### **Contexto Narrativo da Sprint 2:**
> *O projeto piloto do ReciclaSpot foi para as ruas com os primeiros agentes ambientais. Dois problemas reais emergiram: em primeiro lugar, o cidadão com um televisor quebrado no porta-malas precisa abrir o app e ver instantaneamente no mapa qual ecoponto está mais próximo de onde ele está parado no trânsito; em segundo lugar, muitos ecopontos municipais ficam em fundos de vale ou galpões sem sinal de telefonia, e o cidadão perde o acesso aos dados se o app depender 100% de internet. Por fim, para evitar descarte clandestino, o cidadão precisa registrar uma foto do material entregue. O ReciclaSpot precisa ganhar músculos nativos: GPS, Câmera e persistência offline.*

### **Objetivo da Sprint 2:**
Integrar o aplicativo aos sensores de hardware do smartphone (GPS e Câmera) e criar o sistema de persistência local para armazenar os ecopontos favoritos e consultá-los sem conexão com a internet.

### **Tarefas Técnicas a Cumprir:**
1. **Módulo de Geolocalização e Mapa Interativo (`expo-location` + `react-native-maps`):**
   * Instalação dos módulos de hardware:
     ```bash
     npx expo install expo-location react-native-maps
     ```
   * Solicitação de permissão de GPS em runtime (`requestForegroundPermissionsAsync`).
   * Captura das coordenadas exatas do cidadão (`getCurrentPositionAsync`).
   * Renderização do mapa na aba `Mapa` centralizando na localização do usuário com marcador azul e inserção de pinos personalizados para cada ecoponto.
   * Ao tocar no pino do ecoponto no mapa, exibir um *Callout* interativo com nome, materiais e botão que navega diretamente para a Tela de Detalhes.
2. **Módulo de Câmera e Comprovante de Descarte (`expo-image-picker`):**
   * Instalação do módulo de mídia:
     ```bash
     npx expo install expo-image-picker
     ```
   * Na tela de `Perfil` ou no botão de `Registrar Descarte Consciente`, permitir acionar a câmera nativa do celular (`launchCameraAsync`).
   * Exibir o preview da foto tirada (foto do material descartado ou foto de perfil) e salvar o caminho local (`uri`) no estado da aplicação.
3. **Persistência Local Offline (Favoritar Ecoponto via `AsyncStorage`):**
   * Instalação do storage:
     ```bash
     npx expo install @react-native-async-storage/async-storage
     ```
   * **Ação de Favoritar na Tela de Detalhes:**
     * Botão com ícone interativo de estrela/coração (`Favoritar Ponto` / `Remover dos Favoritos`).
     * Gravação e leitura do array de IDs/objetos favoritados sob a chave `@reciclaspot:favoritos`.
   * **Visualização Offline na Aba Favoritos:**
     * A aba `Favoritos` deve ler os dados do `AsyncStorage` e exibir os ecopontos salvos mesmo se o smartphone estiver em **Modo Avião** ou o aplicativo for completamente fechado e reaberto.
4. **Feedback de Interface:**
   * Adição de indicadores visuais de progresso (`ActivityIndicator`) e modais de confirmação durante a leitura do GPS e disparo da câmera.

### **Entregável do MVP 2:**
* Aplicativo consumindo GPS em tempo real, renderizando mapa interativo com pinos dos ecopontos, tirando fotos via câmera nativa e mantendo a lista de favoritos disponível em modo offline.

### **Critério de Sucesso do MVP 2:**
* O usuário ativa o Modo Avião no celular e consegue abrir a aba de favoritos e visualizar os dados dos ecopontos salvos sem nenhum travamento; a foto tirada persiste na interface.