import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Icon = Ionicons as any;

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#0D5C36',
                tabBarInactiveTintColor: '#7A857E',
                tabBarStyle: {
                    height: 65,
                    paddingBottom: 10,
                    paddingTop: 8,
                    backgroundColor: '#FFF',
                    borderTopColor: '#E5EBE7',
                },
            }}
        >
            <Tabs.Screen
                name="explorar"
                options={{
                    title: 'Explorar',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="compass-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="mapa"
                options={{
                    title: 'Mapa',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="map-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="salvos"
                options={{
                    title: 'Salvos',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="heart-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="perfil"
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="person-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}