import React, { useEffect, useState } from 'react';

import * as GS from '@gluestack-ui/themed';
import { FlatList, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import P1 from '@assets/Prd1.png';
import P2 from '@assets/Prd2.png';
import P3 from '@assets/Prd3.png';
import { UserPhoto } from '@components/UserPhoto';
import * as LRN from 'lucide-react-native';
import { Button } from '@components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';

type RouteParamsProps = {
	productDetails: ProductDTO;
};

type IpayMethod = {
	key: string;
	name: string;
	icon: any;
};

export function AdsShowDetailsScreen() {
	const [data, setData] = useState([P1, P2, P3]);

	const { navigate, goBack } = useNavigation();
	const { width } = Dimensions.get('window');

	const basePaymentMethods: IpayMethod[] = [
		{ key: 'boleto', name: 'Boleto', icon: LRN.ScanBarcode },
		{ key: 'pix', name: 'Pix', icon: LRN.QrCode },
		{ key: 'cash', name: 'Dinheiro', icon: LRN.Banknote },
		{ key: 'card', name: 'Cartão de Crédito', icon: LRN.Landmark },
		{ key: 'deposit', name: 'Depósito Bancário', icon: LRN.CreditCard },
	];

	const [payMethod, setPayMethod] = useState<IpayMethod[]>([]);

	const route = useRoute();
	const { productDetails } = route.params as RouteParamsProps;
	const { user } = useAuth();
	const [scrollIndex, setScrollIndex] = useState(0); // Índice da imagem visível

	useEffect(() => {
		console.log('product show  ->> ',productDetails)
		// carrega os payments na tela
		if (productDetails && productDetails.payment_methods) {
			//console.log(Ads.payment_methods)
			const filteredMethods = basePaymentMethods.filter((baseMethod) =>
				productDetails.payment_methods.some(
					(adMethod: any) => adMethod.key === baseMethod.key,
				),
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

	const userUri =
		productDetails.user !== undefined ? productDetails.user.avatar : user.avatar;

	return (
		<GS.VStack flex={1}>
			<GS.HStack gap="$3" pt="$16" pb="$5" paddingHorizontal="$7" alignItems="center">
				<GS.HStack w="$full" justifyContent="space-between">
					<TouchableOpacity onPress={goBack}>
						<GS.Icon as={LRN.ArrowLeft} size="xl" />
					</TouchableOpacity>
					{user.id === productDetails.user_id && (
						<TouchableOpacity
							onPress={() => navigate('adsEdit', { productEdit: productDetails })}
						>
							<GS.Icon as={LRN.PencilLine} size="xl" />
						</TouchableOpacity>
					)}
				</GS.HStack>
			</GS.HStack>

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
							{user.id === productDetails.user_id
								? user.name
								: productDetails.user?.name}
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
							{productDetails.is_new ? 'Novo' : 'Usado'}
						</GS.Text>
					</GS.Box>
					<GS.HStack justifyContent="space-between">
						<GS.Heading>{productDetails.name}</GS.Heading>
						<GS.Heading color="$blue500">
							R$ {productDetails.price.toFixed(2).replace('.', ',')}
						</GS.Heading>
					</GS.HStack>
					<GS.Text fontSize="$sm">{productDetails.description}</GS.Text>
					<GS.HStack marginVertical="$3">
						<GS.Text fontSize="$sm" fontFamily="$heading">
							Aceita troca?
						</GS.Text>
						<GS.Text ml="$3" fontSize="$sm" fontFamily="$body">
							{productDetails.accept_trade ? 'Sim' : 'Não'}
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
						R$ {productDetails.price.toFixed(2).replace('.', ',')}
					</GS.Heading>
					<Button
						title="Entrar em contato"
						type="secondary"
						icon={LRN.MessageCircleReply}
						style={{ width: '55%' }}
					/>
				</GS.HStack>
			</ScrollView>
		</GS.VStack>
	);
}
