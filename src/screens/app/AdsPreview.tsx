import React, { useEffect, useState } from 'react';

import * as GS from '@gluestack-ui/themed';
import { FlatList, ScrollView, Dimensions } from 'react-native';
import P1 from '@assets/Prd1.png';
import P2 from '@assets/Prd2.png';
import P3 from '@assets/Prd3.png';
import { UserPhoto } from '@components/UserPhoto';
import UserPhotoDefault from '@assets/userPhotoDefault.png';

import * as LRN from 'lucide-react-native';
import { Button } from '@components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';
import { ToastMessage } from '@components/ToastMessage';
import { useProducts } from '@hooks/useProducts';
import { ProductCreateDTO } from '@dtos/ProductCreateDTO';
import { ImageDTO } from '@dtos/ImageDTO';

type RouteParamsProps = {
	idEdit: string;
	productPreview: ProductCreateDTO;
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
		{ key: 'boleto', name: 'Boleto', icon: LRN.ScanBarcode },
		{ key: 'pix', name: 'Pix', icon: LRN.QrCode },
		{ key: 'cash', name: 'Dinheiro', icon: LRN.Banknote },
		{ key: 'card', name: 'Cartão de Crédito', icon: LRN.Landmark },
		{ key: 'deposit', name: 'Depósito Bancário', icon: LRN.CreditCard },
	];

	const [payMethod, setPayMethod] = useState<IpayMethod[]>([]);

	const route = useRoute();
	const { productPreview, idEdit } = route.params as RouteParamsProps;
	const { user } = useAuth();
	const [scrollIndex, setScrollIndex] = useState(0); // Índice da imagem visível
	const { loadProductsList } = useProducts();
	const { navigate, goBack, reset} = useNavigation();
	const toast = GS.useToast();

	async function handlePublishProduct() {
		try {
			//para editar
			if (idEdit !== undefined) {
				await api.put(`/products/${idEdit}`, productPreview);
				await loadProductsList();
				reset({
					index: 0,  // A primeira tela da nova stack (índice 0)
					routes: [
						{ name: 'adsUser' },  // Aqui você define a tela para onde quer ir após resetar
					],
				});
				toast.show({
					placement: 'top',
					render: ({ id }) => (
						<ToastMessage
							id={id}
							action="success"
							title="produto atualizado com sucesso!"
							onClose={() => toast.close(id)}
						/>
					),
				});
			} else {
				//para criar um novo
				const respProduct = await api.post('/products', productPreview);

				if(respProduct.data){
					const productImageData: any = new FormData();
					productImageData.append('product_id', respProduct.data.id);
					
					productPreview.product_images.forEach((item) => {
						const justImage = item.img;
						const imageFile = {
							...justImage,
							name: user.id + '_' + item.id,
						} as any;

						productImageData.append('images', imageFile);
					})

					console.log('product image data =< ', productImageData);
				
					await api.post('/products/images', productImageData , {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					});
				}
				
				toast.show({
					placement: 'top',
					render: ({ id }) => (
						<ToastMessage
							id={id}
							action="success"
							title="produto cadastrado com sucesso!"
							onClose={() => toast.close(id)}
						/>
					),
				});
				await loadProductsList();
				reset({
					index: 0,  // A primeira tela da nova stack (índice 0)
					routes: [
						{ name: 'adsUser' },  // Aqui você define a tela para onde quer ir após resetar
					],
				});
			}
		} catch (error) {
			console.log(error);
			toast.show({
				placement: 'top',
				render: ({ id }) => (
					<ToastMessage
						id={id}
						action="error"
						title="Não foi possivel cadastrar o produto tente mais tarde!"
						onClose={() => toast.close(id)}
					/>
				),
			});
		}
	}

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

	useEffect(() => {
		const filteredMethods = basePaymentMethods.filter((baseMethod) =>
			productPreview.payment_methods.some(
				(adMethod: any) => adMethod === baseMethod.key,
			),
		);
		setPayMethod(filteredMethods);
		if(productPreview.product_images.length > 0){
			setData(productPreview.product_images.map((item:ImageDTO) => item.img.uri))
		}
	}, []);

	return (
		<GS.VStack flex={1}>
			<GS.VStack gap="$3" pt="$16" pb="$5" bg="$blue500">
				<GS.Text
					color="$gray700"
					fontSize="$lg"
					fontFamily="$heading"
					textAlign="center"
				>
					Pré visualização do anúncio
				</GS.Text>
				<GS.Text color="$gray500" fontSize="$sm" textAlign="center">
					É assim que seu produto vai aparecer!
				</GS.Text>
			</GS.VStack>
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
							source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
							width={28}
							height={28}
							alt="Logo"
						/>
						<GS.Heading ml="$2" fontSize="$sm">
							{user.name}
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
							{productPreview.is_new ? 'Novo' : 'Usado'}
						</GS.Text>
					</GS.Box>
					<GS.HStack justifyContent="space-between">
						<GS.Heading>{productPreview.name}</GS.Heading>
						<GS.Heading color="$blue500">
							R$ {productPreview.price.toFixed(2).replace('.', ',')}
						</GS.Heading>
					</GS.HStack>
					<GS.Text fontSize="$sm">{productPreview.description}</GS.Text>
					<GS.HStack marginVertical="$3">
						<GS.Text fontSize="$sm" fontFamily="$heading">
							Aceita troca?
						</GS.Text>
						<GS.Text ml="$3" fontSize="$sm" fontFamily="$body">
							{productPreview.accept_trade ? 'Sim' : 'Não'}
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
					<Button
						title="Voltar"
						type="outline"
						icon={LRN.ArrowLeft}
						style={{ width: '45%' }}
						onPress={goBack}
					/>
					<Button
						title="Publicar"
						type="secondary"
						icon={LRN.Tag}
						style={{ width: '45%' }}
						onPress={handlePublishProduct}
					/>
				</GS.HStack>
			</ScrollView>
		</GS.VStack>
	);
}
