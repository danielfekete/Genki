import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import PressableButton from '../components/PressableButton';
import Input from '../components/Input';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import useAppStore from '../stores/app';

interface ProfileForm {
  email: string;
  fullName: string;
  photoURL?: string;
  phoneNumber?: string;
}

const profileSchema = yup.object({
  email: yup.string().email().required(),
  fullName: yup.string().required(),
  photoURL: yup.string().url().optional(),
  phoneNumber: yup.string().optional(),
});

export default function Profile() {
  const {user, setUser} = useAppStore(({user, setUser}) => ({user, setUser}));

  const {control, handleSubmit} = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      email: user?.email || '',
      fullName: user?.displayName || '',
      photoURL: user?.photoURL || '',
      phoneNumber: user?.phoneNumber || '',
    },
  });

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const onSubmit = async (data: ProfileForm) => {
    // TODO: error handling

    if (user?.email !== data.email) {
      try {
        await user?.updateEmail(data.email);
      } catch (e) {
        console.log(e);
      }
    }

    // Display name and photoURL
    try {
      await user?.updateProfile({
        displayName: data.fullName,
        ...(data.photoURL && {photoURL: data.photoURL}),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onUserChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
  };

  useEffect(() => {
    const subscriber = auth().onUserChanged(onUserChanged);

    return subscriber;
  }, []);

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{
          uri: user.photoURL || 'https://www.gravatar.com/avatar/0?d=mp',
        }}
      />
      <Controller
        control={control}
        name="fullName"
        render={({field, fieldState: {error}}) => (
          <Input
            placeholder="Full name"
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({field, fieldState: {error}}) => (
          <Input
            placeholder="Email"
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={error?.message}
          />
        )}
      />

      <PressableButton title="Save" onPress={handleSubmit(onSubmit)} />
      <Pressable onPress={handleSignOut} style={styles.signOutPressable}>
        <Text style={styles.signOutText}>Sign out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  signOutPressable: {
    width: '80%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#0ea5e9',
    borderWidth: 1,
  },
  signOutText: {
    color: '#0ea5e9',
  },
});
