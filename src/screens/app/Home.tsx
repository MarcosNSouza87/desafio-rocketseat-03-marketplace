import React, { useState } from 'react';

import * as GS from '@gluestack-ui/themed';
import { HeaderApp } from '@components/HeaderApp';

import { Tag, ArrowRight } from 'lucide-react-native';
import { FlatList, TouchableOpacity } from 'react-native';
import { CardAds } from '@components/CardAds';
import { Search, SlidersVertical } from 'lucide-react-native';

export function HomeScreen() {
	const [data, setData] = useState<string[]>(['bicicleat', 'biciclos', 'bki']);

	async function handleSearch() {
		console.log('search');
	}
	async function handleFilter() {
		console.log('search');
	}

	return (
		<GS.VStack flex={1} paddingHorizontal="$7">
			<HeaderApp />

			<GS.Text>Seus produtos anunciados para venda</GS.Text>
			<GS.HStack
				bg="$blue200"
				alignItems="center"
				borderRadius={10}
				p="$5"
				marginVertical="$5"
			>
				<GS.Icon as={Tag} color="$blue900" size="xl" />
				<GS.VStack flex={1} pl="$2">
					<GS.Text color="$gray200" fontFamily="$heading">
						4
					</GS.Text>
					<GS.Text color="$gray200" fontSize="$sm">
						anúncios ativos
					</GS.Text>
				</GS.VStack>
				<TouchableOpacity>
					<GS.HStack h="$10" alignItems="center">
						<GS.Text color="$blue900" fontSize="$sm">
							Meus anúncios
						</GS.Text>
						<GS.Icon ml="$1" color="$blue900" as={ArrowRight} />
					</GS.HStack>
				</TouchableOpacity>
			</GS.HStack>
			<GS.Text fontSize='$md' pt='$2' >Compre produtos variados</GS.Text>

			<GS.Input mt='$4' mb='$6'>
				<GS.InputField />
				<GS.InputSlot
					onPress={handleSearch}
					paddingHorizontal="$2.5"
					borderColor="$gray100"
				>
					<GS.InputIcon as={Search} />
				</GS.InputSlot>
				<GS.InputSlot
					onPress={handleFilter}
					paddingHorizontal="$2.5"
					borderColor="$gray100"
				>
					<GS.InputIcon as={SlidersVertical} />
				</GS.InputSlot>
			</GS.Input>

			<FlatList
				data={data}
				keyExtractor={(item) => item}
				renderItem={({ item }) => <CardAds isOwnUser={false} />}
				numColumns={2}
				horizontal={false}
				contentContainerStyle={{ gap: 16 }}
			/>
		</GS.VStack>
	);
}
