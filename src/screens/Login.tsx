import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import Input from '../components/Input';
import PressableButton from '../components/PressableButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {RootStackParamList} from '../../App';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

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
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async ({email, password}: LoginForm) => {
    await auth().signInWithEmailAndPassword(email, password);
  };

  return (
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
      <PressableButton title="Login" onPress={handleSubmit(onSubmit)} />
      <PressableButton
        title="Sign up"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 450,
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 20,
    borderCurve: 'circular',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
