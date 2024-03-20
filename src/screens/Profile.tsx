import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import auth from '@react-native-firebase/auth';
import PressableButton from '../components/PressableButton';
import Input from '../components/Input';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

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
  const {current: user} = useRef(auth().currentUser);

  const {control, handleSubmit} = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      email: user?.email || '',
      fullName: user?.displayName || '',
      photoURL: user?.photoURL || '',
      phoneNumber: user?.phoneNumber || '',
    },
  });

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
});
