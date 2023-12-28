import { StyleSheet,Image,View,Text } from 'react-native';
import Home from './Home';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import {NavigationContainer} from '@react-navigation/native'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator>
    <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Posts',
            tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={require('./pic.png')}
                />
              );
            },
          }}
        />
    <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarInactiveTintColor:'black',
            title: 'Users',
            tabBarActiveTintColor:'blue',
            tabBarIcon: ({size,focused,color}) => {
              return (
                <View>
                  <Image
                    style={{ width: size, height: size }}
                    source={require('./pic1.png')}
                  />
                </View>
              );
            },
          }}
        />
      {/* <Tab.Screen name="Home" component={Home} /> */}
      {/* <Tab.Screen name="Profile" component={Profile} /> */}
    </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});