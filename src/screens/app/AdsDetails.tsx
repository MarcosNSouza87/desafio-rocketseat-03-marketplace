import React, { useState } from 'react';

import * as GS from '@gluestack-ui/themed';
import { HeaderApp } from '@components/HeaderApp';
import { FlatList, ScrollView, Dimensions } from 'react-native';
import P1 from '@assets/Prd1.png';
import P2 from '@assets/Prd2.png';
import P3 from '@assets/Prd3.png';
import { UserPhoto } from '@components/UserPhoto';
import UserPhotoDefault from '@assets/userPhotoDefault.png';

import {
	ScanBarcode,
	QrCode,
	Banknote,
	Landmark,
	CreditCard,
	MessageCircleReply,
} from 'lucide-react-native';
import { Button } from '@components/Button';

export function AdsDetailsScreen() {
	const [data, setData] = useState([P1, P2, P3]);

	const { width } = Dimensions.get('window');

	const [scrollIndex, setScrollIndex] = useState(0); // Índice da imagem visível

	const onScroll = (event: any) => {
		const contentOffsetX = event.nativeEvent.contentOffset.x;
		const index = Math.floor(contentOffsetX / width); // Calcula o índice do item
		setScrollIndex(index);
	};

	const onMomentumScrollEnd = (e: any) => {
		const contentOffsetX = e.nativeEvent.contentOffset.x;
		const index = Math.floor(contentOffsetX / width);
		setScrollIndex(index);
	};

	return (
		<GS.VStack flex={1}>
			<HeaderApp type="AdsShow" paddingHorizontal='$7'/>
			<ScrollView showsVerticalScrollIndicator={false}>
				<FlatList
					data={data}
					keyExtractor={(item) => item}
					renderItem={({ item }) => (
						<GS.Image
							source={item}
							alt="1"
							width={width}
							resizeMode="cover"
							height={300}
						/>
					)}
					horizontal
					showsHorizontalScrollIndicator={false}
					onScroll={onScroll}
					onMomentumScrollEnd={onMomentumScrollEnd} // Garante que a rolagem "trave"
					snapToInterval={width} // Faz a rolagem "parar" nas imagens
					decelerationRate="fast"
					snapToAlignment="start"
				/>
				<GS.VStack marginHorizontal='$7'>
					<GS.HStack alignItems="center" mt="$4">
						<UserPhoto source={UserPhotoDefault} width={28} height={28} alt="Logo" />
						<GS.Heading ml="$2" fontSize="$sm">
							Makenna Baptista
						</GS.Heading>
					</GS.HStack>
					<GS.Box w="$12" marginVertical="$4">
						<GS.Text
							fontSize="$xs"
							textAlign="center"
							p="$1"
							fontFamily="$heading"
							bg="$gray500"
							rounded="$full"
							textTransform="uppercase"
						>
							Novo
						</GS.Text>
					</GS.Box>
					<GS.HStack justifyContent="space-between">
						<GS.Heading>Bicicleta</GS.Heading>
						<GS.Heading color="$blue500">R$ 120,00</GS.Heading>
					</GS.HStack>
					<GS.Text fontSize="$sm">
						Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae
						ante leo eget maecenas urna mattis cursus. Mauris metus amet nibh mauris
						mauris accumsan, euismod. Aenean leo nunc, purus iaculis in aliquam.
					</GS.Text>
					<GS.HStack marginVertical="$3">
						<GS.Text fontSize="$sm" fontFamily="$heading">
							Aceita troca?
						</GS.Text>
						<GS.Text ml="$3" fontSize="$sm" fontFamily="$body">
							Sim
						</GS.Text>
					</GS.HStack>
					<GS.Heading fontSize="$sm">Meios de pagamento:</GS.Heading>

					<GS.HStack>
						<GS.Icon as={ScanBarcode} mr="$2" />
						<GS.Text fontSize="$sm">Boleto</GS.Text>
					</GS.HStack>

					<GS.HStack mt="$2">
						<GS.Icon as={QrCode} mr="$2" />
						<GS.Text fontSize="$sm">Pix</GS.Text>
					</GS.HStack>

					<GS.HStack>
						<GS.Icon as={Banknote} mr="$2" />
						<GS.Text fontSize="$sm">Dinheiro</GS.Text>
					</GS.HStack>

					<GS.HStack mt="$2">
						<GS.Icon as={Landmark} mr="$2" />
						<GS.Text fontSize="$sm">Cartão de Crédito</GS.Text>
					</GS.HStack>

					<GS.HStack mt="$2" mb="$5">
						<GS.Icon as={CreditCard} mr="$2" />
						<GS.Text fontSize="$sm">Deposito Bancário</GS.Text>
					</GS.HStack>
				</GS.VStack>

				<GS.HStack
					paddingVertical="$5"
					paddingHorizontal='$7'
					justifyContent="space-between"
					alignItems="center"
					bg='$white'
				>
					<GS.Heading color="$blue500">R$ 120,00</GS.Heading>
					<Button
						title="Entrar em contato"
						type="secondary"
						icon={MessageCircleReply}
						style={{ width: '55%' }}
					/>
				</GS.HStack>
			</ScrollView>
		</GS.VStack>
	);
}
