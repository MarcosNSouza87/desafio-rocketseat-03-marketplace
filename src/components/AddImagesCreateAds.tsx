import React, { useState } from 'react';
import * as GS from '@gluestack-ui/themed';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { X, Plus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { useAuth } from '@hooks/useAuth';

export type ImagesCreateAdsProps = {
	id: string;
	img: {
		name: string;
		type: string;
		uri: string;
	};
};

type Props = {
	setImagesList: (imgs: ImagesCreateAdsProps[]) => void;
};

export function AddImagesCreateAds({ setImagesList }: Props) {
	const [itens, setItens] = useState<ImagesCreateAdsProps[]>([]);
	const { user } = useAuth();


	function removeItem(id: string) {
		console.log(itens);
		console.warn(id);
		// Atualiza o estado e retorna a nova lista de imagens
		setItens((prevItens) => {
			const updatedList = prevItens.filter((item) => item.id !== id);
			setImagesList(updatedList); // Retorna a lista de imagens atualizada
			return updatedList; // Atualiza o estado local
		});
	}


	async function addNewItem() {
		try {
			const photoSelected = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ['images'],
				quality: 1,
				aspect: [4, 4],
				allowsEditing: true,
			});
			if (photoSelected.canceled) {
				return;
			}

			const fileExtension = photoSelected.assets[0].uri.split('.').pop();
			const photoFile = {
				name: `${user.name}.${fileExtension}`.toLowerCase(),
				uri: photoSelected.assets[0].uri,
				type: `${photoSelected.assets[0].type}/${fileExtension}`,
			} as any;

			console.log('add New item');
			const newItem: ImagesCreateAdsProps = {
				id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
				img: photoFile,
			};
			// Atualiza o estado e retorna a nova lista de imagens
			setItens((prevItens) => {
				const updatedList = [...prevItens, newItem];
				setImagesList(updatedList); // Retorna a lista de imagens atualizada
				return updatedList; // Atualiza o estado local
			});
		} catch (error) {}
	}

	return (
		<GS.HStack mt="$3" gap="$2">
			{itens.map((item: ImagesCreateAdsProps) => (
				<GS.Box width={100} height={100} borderRadius="$md" key={item.id}>
					<GS.ImageBackground
						source={item.img}
						flex={1}
						w="$full"
						h="$full"
						resizeMode="cover"
						imageStyle={{ borderRadius: 8 }}
					>
						<GS.HStack justifyContent="flex-end">
							<GS.Pressable
								p="$1"
								bg="$gray100"
								borderRadius="$full"
								m="$1"
								onPress={() => removeItem(item.id)}
							>
								<GS.Icon as={X} color="$white" size="sm" />
							</GS.Pressable>
						</GS.HStack>
					</GS.ImageBackground>
				</GS.Box>
			))}
			{itens.length < 3 && (
				<TouchableOpacity onPress={addNewItem}>
					<GS.Box bg="$gray500" width={100} height={100} borderRadius="$md">
						<GS.Center flex={1}>
							<GS.Icon as={Plus} color="$gray400" size="xl" />
						</GS.Center>
					</GS.Box>
				</TouchableOpacity>
			)}
		</GS.HStack>
	);
}
