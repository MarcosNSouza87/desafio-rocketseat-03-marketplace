import React, { useState } from 'react';

import * as GS from '@gluestack-ui/themed';
import { Plus } from 'lucide-react-native';
import { FlatList, ScrollView } from 'react-native';
import { CardAds } from '@components/CardAds';
import { useNavigation } from '@react-navigation/native';

export function AdsUserScreen() {
	const [data, setData] = useState<string[]>(['bicicleat', 'biciclos', 'bki']);
	const { navigate } = useNavigation();

	async function handleGoDetails() {
		console.log('details');
		navigate('adsDetails', { AdsId: '1' });
	}

	return (
		<GS.VStack flex={1} paddingHorizontal="$7" justifyContent='flex-start'>
			<GS.HStack gap="$3" pt="$16" pb="$5" alignItems="center">
				<GS.Heading flex={1} textAlign="center">
					Meus anúncios
				</GS.Heading>
				<GS.Pressable onPress={() => navigate('adsCreateEdit',{})}>
					<GS.Icon as={Plus} size="xl" />
				</GS.Pressable>
			</GS.HStack>
			<GS.HStack >
				<GS.Text flex={1} h='$10'>9 Anuncios</GS.Text>
				<GS.Text>Todos</GS.Text>
			</GS.HStack>
			<FlatList
				data={data}
				keyExtractor={(item) => item}
				renderItem={({ item }) => (
					<CardAds isOwnUser={false} onPress={handleGoDetails} />
				)}
				numColumns={2}
				horizontal={false}
				contentContainerStyle={{ gap: 16 }}
			/>
		</GS.VStack>
	);
}
