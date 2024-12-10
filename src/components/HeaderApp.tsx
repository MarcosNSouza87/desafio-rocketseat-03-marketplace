import React from 'react';

import * as GS from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';

import defaultUserPhotoImg from '@assets/userPhotoDefault.png';
import { UserPhoto } from './UserPhoto';
import { Button } from './Button';

import { Plus } from 'lucide-react-native';

type Props = {
	type?: 'Home' | 'Ads';
};

export function HeaderApp({}: Props) {
	return (
		<GS.HStack gap="$3" pt="$16" pb="$5" alignItems="center">
			<UserPhoto
				source={defaultUserPhotoImg}
				alt="imagem do usuario"
				w="$12"
				h="$12"
			/>
			<GS.VStack flex={1}>
				<GS.Text color="$gray100" fontSize="$md" mb="-$1.5">
					Boas Vindas,
				</GS.Text>
				<GS.Heading color="$gray100" fontSize="$md">
					{'user.name !'}
				</GS.Heading>
			</GS.VStack>
			<GS.Box w='$35'>
				<Button title="Criar Anuncio" icon={Plus}/>
			</GS.Box>
		</GS.HStack>
	);
}
