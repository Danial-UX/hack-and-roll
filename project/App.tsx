import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth/Auth'
import Account from './components/Account/Account'
import Menu from './components/Order/Menu'
import { Session } from '@supabase/supabase-js'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from './components/Home/Home'
import Order from './components/Order/Order'
import Payment from './components/Payment/Payment'

const Tab = createBottomTabNavigator();

function HomeScreen({ session }: { session: Session }) {
  return (
    <Home session={session} />
  );
}

function AccountScreen({ session }: { session: Session }) {
  return <Account session={session} />;
}

function MenuScreen({ session }: { session: Session }) {
  return <Menu session={session} />;
}

function OrderScreen({ session }: { session: Session }) {
  return <Order session={session} />;
}

function PaymentScreen({ session }: { session: Session }) {
  return <Payment session={session} />;
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  if (!session) {
    return <Auth />;
  }
  return (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: keyof typeof Ionicons.glyphMap | undefined;
                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Account') {
                  iconName = focused ? 'person' : 'person-outline';
                } else if (route.name === 'Menu') {
                  iconName = focused ? 'fast-food' : 'fast-food-outline';
                } else if (route.name === 'Order') {
                  iconName = focused ? 'cart' : 'cart-outline';
                } else if (route.name === 'Payment') {
                  iconName = focused ? 'card' : 'card-outline';
                } 
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#ff9e4d',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Home" children={() => <HomeScreen session={session} />} />
            <Tab.Screen name="Menu" children={() => <MenuScreen session={session} />} />
            <Tab.Screen name="Order" children={() => <OrderScreen session={session} />} />
            <Tab.Screen name="Payment" children={() => <PaymentScreen session={session} />} />
            <Tab.Screen name="Account" children={() => <AccountScreen session={session} />} />
          </Tab.Navigator>
        </NavigationContainer>
  )
}