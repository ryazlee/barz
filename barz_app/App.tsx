import BarzCamera from './components/camera/BarzCamera';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './components/Main';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Main}
          options={{headerShown:false}}
        />
        <Stack.Screen name="Camera" component={BarzCamera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
