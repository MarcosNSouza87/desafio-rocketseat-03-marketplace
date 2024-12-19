import React, { useCallback, useEffect, useState } from 'react';

import * as GS from '@gluestack-ui/themed';
import { HomeHeaderApp } from '@components/HomeHeader';

import { FlatList } from 'react-native';
import { CardAds } from '@components/CardAds';
import { Search, SlidersVertical } from 'lucide-react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';
import CardInfoHome from '@components/CardInfoHome';
import { SheetFilterHome } from '@components/SheetFilterHome';
import { useProducts } from '@hooks/useProducts';
import { ToastMessage } from '@components/ToastMessage';

export function HomeScreen() {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<ProductDTO[]>([]);
	const { navigate } = useNavigation();
	const [showActionsheet, setShowActionsheet] = React.useState(false);
	const [filters, setFilters] = useState({
		is_new: true, // 'novo' ou 'usado'
		accept_trade: false,
		payment_methods: [] as string[],
	});

	const [search, setSearch] = useState<string>('');

	const toast = GS.useToast();

	const { user } = useAuth();
	const { productsGeneral, loadProductsList } = useProducts();

	async function handleSearch() {
		// console.log('search');
	}
	async function handleFilter() {
		// console.log('filter');
		setShowActionsheet(!showActionsheet);
	}


	async function handleGoDetails(info: any) {
		// console.log('details');
		navigate('adsShowDetails', { productDetails: info });
	}

	async function loadHomeInitial() {
		try {
			const { data } = await api.get('/products/');
			setData(data);
		} catch (error) {
			toast.show({
				placement: 'top',
				render: ({ id }) => (
					<ToastMessage
						id={id}
						action="error"
						title="erro ao conectar ao servidor"
						onClose={() => toast.close(id)}
					/>
				),
			});
		}
	}

	function handleResetFiltered () {
		setFilters({
			is_new: true, // 'novo' ou 'usado'
			accept_trade: false,
			payment_methods: [] as string[],
		});
		setData(productsGeneral);
		setShowActionsheet(false)
	}

	useEffect(() => {
		loadHomeInitial();
	}, []);

	useEffect(() => {
		if (search !== '') {
			const filterInput = data.filter((item) => item.name.includes(search));
			setData(filterInput);
		}else{
			setData(productsGeneral)
		}
	}, [search]);

	useEffect(() => {
		console.log(filters)
		const filterBy = data.filter((item) => 
			item.is_new === filters.is_new || 
			item.accept_trade === filters.accept_trade ||
			filters.payment_methods.every(fitm => item.payment_methods.includes(fitm))
		)
		setData(filterBy)
	},[filters])

	return (
		<GS.VStack flex={1} paddingHorizontal="$7">
			<HomeHeaderApp />
			<CardInfoHome />

			{/* search */}
			<GS.Text fontSize="$md" pt="$2">
				Compre produtos variados
			</GS.Text>

			<GS.Input mt="$4" mb="$6">
				<GS.InputField
					placeholder="Buscar anúncio"
					value={search}
					onChangeText={(e) => setSearch(e)}
				/>
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

			{/* lista de produtos */}
			<FlatList
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<CardAds info={item} onPress={() => handleGoDetails(item)} />
				)}
				numColumns={2}
				horizontal={false}
				contentContainerStyle={{ gap: 16 }}
				ListEmptyComponent={() => (
					<GS.Text color="$gray400" textAlign="center" pt="$16">
						Não há produtos {'\n\n'}cadastrados ainda.
					</GS.Text>
				)}
			/>
			{showActionsheet && (
				<SheetFilterHome
					showActionsheet={showActionsheet}
					setShowActionsheet={setShowActionsheet}
					filter={filters}
					setFilter={setFilters}
					handleResetFilters={handleResetFiltered}
				/>
			)}
		</GS.VStack>
	);
}
