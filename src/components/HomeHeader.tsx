import React, { ComponentProps } from 'react';

import * as GS from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';

import defaultUserPhotoImg from '@assets/userPhotoDefault.png';
import { UserPhoto } from './UserPhoto';
import { Button } from './Button';

import {  Plus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
 
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';

type Props = ComponentProps<typeof GS.HStack> & {};

export function HomeHeaderApp({ ...rest }: Props) {
	const { navigate } = useNavigation();
	const { user } = useAuth();

	return (
		<GS.HStack gap="$3" pt="$16" pb="$5" alignItems="center" {...rest}>
			<UserPhoto
				source={
					user.avatar
						? { uri: `${api.defaults.baseURL}/images/${user.avatar}` }
						: defaultUserPhotoImg
				}
				alt="imagem do usuario"
				resizeMode="cover"
				w="$12"
				h="$12"
			/>
			<GS.VStack flex={1}>
				<GS.Text color="$gray100" fontSize="$md" mb="-$1.5">
					Boas Vindas,
				</GS.Text>
				<GS.Heading color="$gray100" fontSize="$md">
					{user.name.substring(0, 14)}
				</GS.Heading>
			</GS.VStack>
			<GS.Box w="$35">
				<Button
					title="Criar Anuncio"
					icon={Plus}
					onPress={() => navigate('adsCreate')}
				/>
			</GS.Box>
		</GS.HStack>
	);
}
