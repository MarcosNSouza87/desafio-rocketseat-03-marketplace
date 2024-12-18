import React, { ComponentProps } from 'react';

import * as GS from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';

import defaultUserPhotoImg from '@assets/userPhotoDefault.png';
import { UserPhoto } from './UserPhoto';
import { Button } from './Button';

import { Pencil, Plus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import { ArrowLeft, PencilLine } from 'lucide-react-native';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';

type Props = ComponentProps<typeof GS.HStack> & {
	type?: 'Home' | 'AdsCreate' | 'AdsEdit' | 'AdsShow';
	user_id?: string;
	productId?: string;
};

export function HeaderApp({ user_id = '', productId, type = 'Home', ...rest }: Props) {
	const { navigate, goBack } = useNavigation();
	const { user } = useAuth();

	return (
		<GS.HStack gap="$3" pt="$16" pb="$5" alignItems="center" {...rest}>
			{type === 'Home' && (
				<>
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
							onPress={() => navigate('adsCreateEdit',{})}
						/>
					</GS.Box>
				</>
			)}
			{type === 'AdsCreate' && (
				<>
					<TouchableOpacity onPress={goBack}>
						<GS.Icon as={ArrowLeft} size="xl" />
					</TouchableOpacity>
					<GS.Heading color="$gray100" fontSize="$2xl" flex={1} textAlign="center">
						{'Criar anúncio'}
					</GS.Heading>
				</>
			)}
			{type === 'AdsShow' && (
				<GS.HStack w="$full" justifyContent="space-between">
					<TouchableOpacity onPress={goBack}>
						<GS.Icon as={ArrowLeft} size="xl" />
					</TouchableOpacity>
					{user.id === user_id && productId && (
						<TouchableOpacity onPress={() => navigate('adsCreateEdit',{productId: productId})}>
							<GS.Icon as={PencilLine} size="xl" />
						</TouchableOpacity>
					)}
				</GS.HStack>
			)}
		</GS.HStack>
	);
}
