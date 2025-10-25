// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CircularGradientListScreen from './screens/CircularGradient/CircularGradientListScreen';
import CircularGradientAnimatedScreen from './screens/CircularGradient/CircularGradientAnimatedScreen';
import CircularGradientStaticScreen from './screens/CircularGradient/CircularGradientStaticScreen';
import CircularGradientInteractiveScreen from './screens/CircularGradient/CircularGradientInteractiveScreen';
import LinearGradientListScreen from './screens/LinearGradient/LinearGradientListScreen';
import LinearGradientAnimatedScreen from './screens/LinearGradient/LinearGradientAnimatedScreen';
import LinearGradientStaticScreen from './screens/LinearGradient/LinearGradientStaticScreen';
import IridescenceStaticScreen from './screens/Iridescence/IridescenceStaticScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#000' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="CircularGradientList"
          component={CircularGradientListScreen}
        />
        <Stack.Screen
          name="CircularGradientAnimated"
          component={CircularGradientAnimatedScreen}
        />
        <Stack.Screen
          name="CircularGradientStatic"
          component={CircularGradientStaticScreen}
        />
        <Stack.Screen
          name="CircularGradientInteractive"
          component={CircularGradientInteractiveScreen}
        />
        <Stack.Screen
          name="LinearGradientList"
          component={LinearGradientListScreen}
        />
        <Stack.Screen
          name="LinearGradientAnimated"
          component={LinearGradientAnimatedScreen}
        />
        <Stack.Screen
          name="LinearGradientStatic"
          component={LinearGradientStaticScreen}
        />
        <Stack.Screen
          name="IridescenceStatic"
          component={IridescenceStaticScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
