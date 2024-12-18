import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import * as GS from '@gluestack-ui/themed';

import { Tag, ArrowRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useProducts } from '@hooks/useProducts';

export default function CardInfoHome() {
	const { navigate } = useNavigation();
	const { productsUser } = useProducts();

	const qtdActive = productsUser.filter((itm) => itm.is_active).length;

	return (
		<GS.VStack>
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
						{qtdActive}
					</GS.Text>
					<GS.Text color="$gray200" fontSize="$sm">
						anúncios ativos
					</GS.Text>
				</GS.VStack>
				<TouchableOpacity
					onPress={() => {
						navigate('adsUser');
					}}
				>
					<GS.HStack h="$10" alignItems="center">
						<GS.Text color="$blue900" fontSize="$sm">
							Meus anúncios
						</GS.Text>
						<GS.Icon ml="$1" color="$blue900" as={ArrowRight} />
					</GS.HStack>
				</TouchableOpacity>
			</GS.HStack>
		</GS.VStack>
	);
}
