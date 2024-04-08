import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Input from '../components/Input';
import PressableButton from '../components/PressableButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {RootStackParamList} from '../../App';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import LogoContainer from '../components/LogoContainer';

interface LoginForm {
  email: string;
  password: string;
}

const loginSchema: yup.ObjectSchema<LoginForm> = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export default function Login({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SignUp'>) {
  const [message, setMessage] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const {
    control,
    handleSubmit,
    formState: {dirtyFields},
    reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async ({email, password}: LoginForm) => {
    setMessage('');
    let keepDirtyValues = false;
    try {
      const data = await auth().signInWithEmailAndPassword(email, password);
      console.log('data', data);
    } catch (err) {
      keepDirtyValues = true;
      if (err.code && err.message) {
        setMessage(err.message);
        // switch (err.code) {
        //   case 'auth/invalid-credential':
        //     return setMessage('Invalid credentials');
        //   case 'auth/too-many-requests':
        //     return setMessage('Too many requests');
        // }
      }
      setMessage('An error occurred');
    } finally {
      keepDirtyValues ? reset(undefined, {keepDirtyValues}) : reset();
    }
  };

  // useEffect(() => {
  //   if (message && (dirtyFields.email || dirtyFields.password)) {
  //     setMessage('');
  //   }
  // }, [dirtyFields, message]);

  return (
    <View>
      <LogoContainer />
      <View style={styles.container}>
        <Controller
          control={control}
          name="email"
          render={({field, fieldState}) => (
            <Input
              value={field.value}
              placeholder="Email"
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({field, fieldState}) => (
            <Input
              value={field.value}
              placeholder="Password"
              onBlur={field.onBlur}
              secureTextEntry
              onChangeText={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
        {message ? (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        ) : null}
        <View style={styles.buttonContainer}>
          <PressableButton title="Login" onPress={handleSubmit(onSubmit)} />
          <PressableButton
            title="Sign up"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 20,
    borderCurve: 'circular',
    backgroundColor: '#fff',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  messageContainer: {
    paddingVertical: 10,
    paddingLeft: 5,
  },
  messageText: {
    color: 'red',
  },
});
