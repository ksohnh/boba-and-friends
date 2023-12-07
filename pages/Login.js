import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { loginStyles } from '../styles/LoginScreen';
import { auth, signInWithEmailAndPassword } from '../src/firebase/config';

// login page
export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const onLoginPress = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) =>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        })
    }

    return (
        <View style={loginStyles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={loginStyles.logo}
                    source={require("../assets/filledStar.png")}
                />
                <TextInput
                    style={loginStyles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    autoCapitalize="none"
                />
                <TextInput
                    style={loginStyles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={loginStyles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={loginStyles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={loginStyles.footerView}>
                    <Text style={loginStyles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={loginStyles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}