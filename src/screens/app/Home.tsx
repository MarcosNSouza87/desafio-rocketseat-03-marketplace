import React, { useCallback, useState } from 'react';

import * as GS from '@gluestack-ui/themed';
import { HeaderApp } from '@components/HeaderApp';

import { Tag, ArrowRight } from 'lucide-react-native';
import { FlatList, TouchableOpacity } from 'react-native';
import { CardAds } from '@components/CardAds';
import { Search, SlidersVertical, X, Check } from 'lucide-react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button } from '@components/Button';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';

export function HomeScreen() {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<string[]>(['bicicleat', 'biciclos', 'bki']);
	const { navigate } = useNavigation();
	const [showActionsheet, setShowActionsheet] = React.useState(false);
	const [aceptReplace, setAceptReplace] = React.useState(false);
	const [payments, setPayments] = React.useState(['']);

	const { user } = useAuth();

	async function handleSearch() {
		console.log('search');
	}
	async function handleFilter() {
		console.log('filter');
		setShowActionsheet(!showActionsheet);
	}
	async function handleMoreFilter() {
		console.log('filter');
		setShowActionsheet(!showActionsheet);
	}


	
	async function handleGoDetails() {
		console.log('details');
		navigate('adsDetails', { AdsId: '1' });
	}


	async function fetchProducts() {
		try {
			setIsLoading(true);
			const resp = await api.get('/products');
			console.log(resp.data)
			setData(resp.data);
			
		} catch (error) {
			
		}
	}

	useFocusEffect(
		useCallback(() => {
			fetchProducts();
		}, []),
	);

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
			<GS.Text fontSize="$md" pt="$2">
				Compre produtos variados
			</GS.Text>

			<GS.Input mt="$4" mb="$6">
				<GS.InputField placeholder="Buscar anúncio" />
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
				renderItem={({ item }) => (
					<CardAds isOwnUser={false} onPress={handleGoDetails} />
				)}
				numColumns={2}
				horizontal={false}
				contentContainerStyle={{ gap: 16 }}
			/>
			{showActionsheet && (
				<GS.Actionsheet
					style={{backgroundColor:'#00000088'}}
					isOpen={showActionsheet}
					onClose={() => setShowActionsheet(false)}
				>
					<GS.ActionsheetContent bg='$gray600'>
						<GS.ActionsheetDragIndicatorWrapper>
							<GS.ActionsheetDragIndicator />
						</GS.ActionsheetDragIndicatorWrapper>
						<GS.ActionsheetItem bg='$gray600'>
							<GS.VStack w="$full">
								<GS.HStack alignItems="center" pb="$7">
									<GS.Heading flex={1}>Filtrar anúncios</GS.Heading>
									<GS.Pressable onPress={() => setShowActionsheet(false)}>
										<GS.Icon as={X} />
									</GS.Pressable>
								</GS.HStack>

								<GS.VStack marginVertical="$4">
									<GS.Heading fontSize="$sm">Condição</GS.Heading>
									<GS.Text>Novo</GS.Text>
								</GS.VStack>

								<GS.Heading fontSize="$sm">Aceita troca?</GS.Heading>
								<GS.HStack space="md" alignItems="center">
									<GS.Switch
										size="sm"
										trackColor={{ false: '$gray700', true: '$blue500' }}
										thumbColor={'$gray700'}
										ios_backgroundColor={'$gray600'}
										onChange={() => setAceptReplace(!aceptReplace)}
									/>
									<GS.Text size="sm">{aceptReplace ? 'Sim' : 'Não'}</GS.Text>
								</GS.HStack>

								<GS.Heading mt="$2" mb="$3" fontSize="$sm">
									Meios de pagamento aceitos
								</GS.Heading>

								<GS.CheckboxGroup
									value={payments}
									onChange={(keys) => {
										setPayments(keys);
									}}
								>
									<GS.VStack space="md" mb="$16">
										<GS.Checkbox value="boleto" alignItems="center">
											<GS.CheckboxIndicator>
												<GS.CheckboxIcon as={Check} color="$gray600" />
											</GS.CheckboxIndicator>
											<GS.CheckboxLabel ml="$2" color="$gray200">
												Boleto
											</GS.CheckboxLabel>
										</GS.Checkbox>
										<GS.Checkbox value="pix" alignItems="center">
											<GS.CheckboxIndicator>
												<GS.CheckboxIcon as={Check} color="$gray600" />
											</GS.CheckboxIndicator>
											<GS.CheckboxLabel ml="$2" color="$gray200">
												Pix
											</GS.CheckboxLabel>
										</GS.Checkbox>
										<GS.Checkbox value="dinheiro" alignItems="center">
											<GS.CheckboxIndicator>
												<GS.CheckboxIcon as={Check} color="$gray600" />
											</GS.CheckboxIndicator>
											<GS.CheckboxLabel ml="$2" color="$gray200">
												Dinheiro
											</GS.CheckboxLabel>
										</GS.Checkbox>
										<GS.Checkbox value="creditcard" alignItems="center">
											<GS.CheckboxIndicator>
												<GS.CheckboxIcon as={Check} color="$gray600" />
											</GS.CheckboxIndicator>
											<GS.CheckboxLabel ml="$2" color="$gray200">
												Cartão de Crédito
											</GS.CheckboxLabel>
										</GS.Checkbox>
										<GS.Checkbox value="deposit" alignItems="center">
											<GS.CheckboxIndicator>
												<GS.CheckboxIcon as={Check} color="$gray600" />
											</GS.CheckboxIndicator>
											<GS.CheckboxLabel ml="$2" color="$gray200">
												Depósito Bancário
											</GS.CheckboxLabel>
										</GS.Checkbox>
									</GS.VStack>
								</GS.CheckboxGroup>
								<GS.VStack mb='$10'>
									<Button title='Aplicar filtros' mb='$3' onPress={handleMoreFilter} />
									<Button type='outline' title='Resetar filtros' 
									onPress={handleMoreFilter}
									/>
								</GS.VStack>
							</GS.VStack>
						</GS.ActionsheetItem>
					</GS.ActionsheetContent>
				</GS.Actionsheet>
			)}
		</GS.VStack>
	);
}
