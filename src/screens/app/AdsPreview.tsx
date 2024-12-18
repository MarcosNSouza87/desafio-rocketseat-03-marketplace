import React, { useEffect, useState } from 'react';

import * as GS from '@gluestack-ui/themed'; 
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
import { useRoute } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';

type RouteParamsProps = {
	Ads: ProductDTO;
};

type IpayMethod = {
	key: string;
	name: string;
	icon: any;
};

export function AdsPreviewScreen() {
	const [data, setData] = useState([P1, P2, P3]);

	const { width } = Dimensions.get('window');

	const basePaymentMethods: IpayMethod[] = [
		{ key: 'boleto', name: 'Boleto', icon: ScanBarcode },
		{ key: 'pix', name: 'Pix', icon: QrCode },
		{ key: 'cash', name: 'Dinheiro', icon: Banknote },
		{ key: 'card', name: 'Cartão de Crédito', icon: Landmark },
		{ key: 'deposit', name: 'Depósito Bancário', icon: CreditCard },
	];

	const [payMethod, setPayMethod] = useState<IpayMethod[]>([]);

	const route = useRoute();
	const { Ads } = route.params as RouteParamsProps;
	const { user } = useAuth();
	const [scrollIndex, setScrollIndex] = useState(0); // Índice da imagem visível

	useEffect(() => {
		// Filtra os métodos de pagamento com base em Ads.payment_methods
		if (Ads && Ads.payment_methods) {
			//console.log(Ads.payment_methods)
			const filteredMethods = basePaymentMethods.filter((baseMethod) =>
				Ads.payment_methods.some((adMethod: any) => adMethod.key === baseMethod.key),
			);
			setPayMethod(filteredMethods);
		}
	}, []); // Executa quando Ads for alterado

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

	const userUri = Ads.user !== undefined ? Ads.user.avatar : user.avatar;

	return (
		<GS.VStack flex={1}>
			
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
				<GS.VStack marginHorizontal="$7">
					<GS.HStack alignItems="center" mt="$4">
						<UserPhoto
							source={{ uri: `${api.defaults.baseURL}/images/${userUri}` }}
							width={28}
							height={28}
							alt="Logo"
						/>
						<GS.Heading ml="$2" fontSize="$sm">
							{user.id === Ads.user_id ? user.name : Ads.user?.name}
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
							{Ads.is_new ? 'Novo' : 'Usado'}
						</GS.Text>
					</GS.Box>
					<GS.HStack justifyContent="space-between">
						<GS.Heading>{Ads.name}</GS.Heading>
						<GS.Heading color="$blue500">
							R$ {Ads.price.toFixed(2).replace('.', ',')}
						</GS.Heading>
					</GS.HStack>
					<GS.Text fontSize="$sm">{Ads.description}</GS.Text>
					<GS.HStack marginVertical="$3">
						<GS.Text fontSize="$sm" fontFamily="$heading">
							Aceita troca?
						</GS.Text>
						<GS.Text ml="$3" fontSize="$sm" fontFamily="$body">
							{Ads.accept_trade ? 'Sim' : 'Não'}
						</GS.Text>
					</GS.HStack>
					<GS.Heading fontSize="$sm">Meios de pagamento:</GS.Heading>

					{payMethod.map((item: IpayMethod) => (
						<GS.HStack mt="$2" key={item.key}>
							<GS.Icon as={item.icon} mr="$2" />
							<GS.Text fontSize="$sm">{item.name}</GS.Text>
						</GS.HStack>
					))}
				</GS.VStack>

				<GS.HStack
					mt="$4"
					paddingVertical="$5"
					paddingHorizontal="$7"
					justifyContent="space-between"
					alignItems="center"
					bg="$white"
				>
					<GS.Heading color="$blue500">
						R$ {Ads.price.toFixed(2).replace('.', ',')}
					</GS.Heading>
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
