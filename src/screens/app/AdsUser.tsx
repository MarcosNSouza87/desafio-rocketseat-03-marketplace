import React, { useCallback, useState } from 'react';

import * as GS from '@gluestack-ui/themed';
import { Plus } from 'lucide-react-native';
import { FlatList, ScrollView } from 'react-native';
import { CardAds } from '@components/CardAds';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { api } from '@services/api';
import { Loading } from '@components/Loading';
import { useProducts } from '@hooks/useProducts';

type RouteParamsProps = {
	Ads: any;
};

export function AdsUserScreen() {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<ProductDTO[]>([]);
	const { navigate } = useNavigation();

	const {productsUser} = useProducts();

	async function handleGoDetails(info: any) {
		console.log('details');
		navigate('adsDetails', { Ads: info });
	}

	

	async function fetchProducts() {
		try {
			setData(productsUser);
		} catch (error) {

		}finally{
			setIsLoading(false);
		}
	}

	useFocusEffect(
		useCallback(() => {
			fetchProducts();
		}, []),
	);

	return (
		<GS.VStack flex={1} paddingHorizontal="$7" justifyContent="flex-start">
			<GS.HStack gap="$3" pt="$16" pb="$5" alignItems="center">
				<GS.Heading flex={1} textAlign="center">
					Meus anúncios
				</GS.Heading>
				<GS.Pressable onPress={() => navigate('adsCreateEdit', {})}>
					<GS.Icon as={Plus} size="xl" />
				</GS.Pressable>
			</GS.HStack>
			<GS.HStack>
				<GS.Text flex={1} h="$10">
					{data.length} Anuncios
				</GS.Text>
				<GS.Text>Todos</GS.Text>
			</GS.HStack>
			{isLoading ? (
				<Loading />
			) : (
				<FlatList
					data={data}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<CardAds info={item} isOwnUser={false} onPress={() => handleGoDetails(item)} />
					)}
					numColumns={2}
					horizontal={false}
					contentContainerStyle={{ gap: 16 }}
					ListEmptyComponent={() => (
						<GS.Text color="$gray400" textAlign="center" pt='$16'>
							Não há produtos {'\n\n'}cadastrados ainda.
						</GS.Text>
					)}
				/>
			)}
		</GS.VStack>
	);
}
