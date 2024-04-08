import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import Input from '../components/Input';
import PressableButton from '../components/PressableButton';
import {Link} from '@react-navigation/native';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import LogoContainer from '../components/LogoContainer';

interface SignUpForm {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}

const signUpSchema: yup.ObjectSchema<SignUpForm> = yup.object({
  email: yup.string().email().required(),
  fullName: yup.string().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required(),
});

export default function SignUp() {
  const [message, setMessage] = useState('');

  const {handleSubmit, control, reset} = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async ({fullName, email, password}: SignUpForm) => {
    let keepDirtyValues = false;
    try {
      await auth().createUserWithEmailAndPassword(email, password);

      await auth().currentUser?.updateProfile({
        displayName: fullName,
      });
    } catch (err) {
      keepDirtyValues = true;
      if (err.code && err.message) {
        setMessage(err.message);
      } else {
        setMessage('An error occurred');
      }
    } finally {
      keepDirtyValues ? reset(undefined, {keepDirtyValues}) : reset();
    }
  };

  return (
    <View>
      <LogoContainer />
      <View style={styles.container}>
        <Controller
          control={control}
          name="email"
          render={({field, fieldState: {error}}) => (
            <Input
              value={field.value}
              onBlur={field.onBlur}
              placeholder="Email"
              onChangeText={field.onChange}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="fullName"
          render={({field, fieldState: {error}}) => (
            <Input
              value={field.value}
              onBlur={field.onBlur}
              placeholder="Full name"
              onChangeText={field.onChange}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({field, fieldState: {error}}) => (
            <Input
              value={field.value}
              onBlur={field.onBlur}
              placeholder="Password"
              secureTextEntry
              textContentType="oneTimeCode"
              onChangeText={field.onChange}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({field, fieldState: {error}}) => (
            <Input
              value={field.value}
              onBlur={field.onBlur}
              placeholder="Confirm password"
              secureTextEntry
              onChangeText={field.onChange}
              error={error?.message}
            />
          )}
        />
        {message ? (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        ) : null}

        <View style={styles.buttonContainer}>
          <PressableButton title="Sign Up" onPress={handleSubmit(onSubmit)} />
          <View>
            <Link screen="Login" style={{color: '#0ea5e9'}}>
              Already have an account?
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 375,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
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
