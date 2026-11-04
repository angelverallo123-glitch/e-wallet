import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router=useRouter();
  const [form,setForm]=useState({firstname:'',lastname:'',username:'',email:'',contactNumber:'',password:'',confirmPassword:''});
  const fields=[['firstname','First name'],['lastname','Last name'],['username','Username'],['email','Email'],['contactNumber','Contact number'],['password','Password'],['confirmPassword','Confirm password']];
  function submit() {
    if (Object.values(form).some(v=>!v.trim())) return Alert.alert('Missing information','Please complete all fields.');
    if (form.password!==form.confirmPassword) return Alert.alert('Error','Passwords do not match.');
    Alert.alert('Demo registration','Registration form completed. No account was saved.',[{text:'Go to Login',onPress:()=>router.replace('/login')}]);
  }
  return <ScrollView contentContainerStyle={styles.screen}>
    <Text style={styles.title}>Create Account</Text>
    <Text style={styles.subtitle}>Sign up for MY E-WALLET</Text>
    {fields.map(([key,label])=><TextInput key={key} style={styles.input} placeholder={label} value={form[key]}
      secureTextEntry={key.toLowerCase().includes('password')}
      keyboardType={key==='email'?'email-address':key==='contactNumber'?'phone-pad':'default'}
      onChangeText={value=>setForm(old=>({...old,[key]:value}))}/>)}
    <TouchableOpacity style={styles.button} onPress={submit}><Text style={styles.buttonText}>Sign Up</Text></TouchableOpacity>
    <TouchableOpacity onPress={()=>router.replace('/login')}><Text style={styles.link}>Already have an account? Log In</Text></TouchableOpacity>
  </ScrollView>;
}
const styles=StyleSheet.create({screen:{flexGrow:1,backgroundColor:'#F2F8F3',padding:24,paddingTop:65},title:{fontSize:30,fontWeight:'bold',textAlign:'center',color:'#147F4C'},subtitle:{textAlign:'center',color:'#667',marginBottom:26},input:{backgroundColor:'#fff',borderWidth:1,borderColor:'#D5E5DA',borderRadius:12,padding:14,marginBottom:12},button:{backgroundColor:'#15965D',padding:16,borderRadius:12,alignItems:'center',marginTop:10},buttonText:{color:'#fff',fontSize:17,fontWeight:'bold'},link:{textAlign:'center',color:'#148C50',marginTop:24}});
