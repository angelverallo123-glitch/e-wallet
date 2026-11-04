import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <LinearGradient colors={['#B7D51C', '#52B72B', '#009A68']} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.logo}>◉</Text>
        <Text style={styles.title}>MY E-WALLET</Text>
        <Text style={styles.subtitle}>Your money, made simple.</Text>
        <Text style={styles.person}>●</Text>
        <Text style={styles.greeting}>Welcome!</Text>
        <Text style={styles.description}>Manage your wallet anytime, anywhere.</Text>
        <TouchableOpacity style={styles.primary} onPress={() => router.push('/login')}>
          <Text style={styles.primaryText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondary} onPress={() => router.push('/register')}>
          <Text style={styles.secondaryText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  screen:{flex:1}, content:{flex:1,justifyContent:'center',alignItems:'center',padding:28},
  logo:{fontSize:72,color:'#fff',marginBottom:8},title:{fontSize:35,fontWeight:'900',color:'#fff',textAlign:'center'},
  subtitle:{fontSize:16,color:'#fff',marginTop:8},person:{fontSize:62,color:'#fff',marginTop:52},
  greeting:{fontSize:28,fontWeight:'bold',color:'#fff',marginTop:10},
  description:{fontSize:14,color:'#fff',textAlign:'center',marginTop:10,marginBottom:48},
  primary:{backgroundColor:'#fff',padding:17,borderRadius:12,width:'100%',alignItems:'center',marginBottom:14},
  primaryText:{fontSize:17,fontWeight:'bold',color:'#148C50'},
  secondary:{borderWidth:2,borderColor:'#fff',padding:15,borderRadius:12,width:'100%',alignItems:'center'},
  secondaryText:{fontSize:17,fontWeight:'bold',color:'#fff'}
});
