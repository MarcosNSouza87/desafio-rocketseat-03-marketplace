import React, { useEffect, useState } from 'react';
import * as GS from '@gluestack-ui/themed';
import { HeaderApp } from '@components/HomeHeader';
import { Input } from '@components/Input';
import { InputTextArea } from '@components/TextAreaInput';
import { CircleIcon, CheckIcon, Check, ArrowLeft } from 'lucide-react-native';
import CircleSelected from '@assets/circleSelectIcon.svg';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Button } from '@components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
	AddImagesCreateAds,
	ImagesCreateAdsProps,
} from '@components/AddImagesCreateAds';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '@services/api';
import { ToastMessage } from '@components/ToastMessage';
import { useProducts } from '@hooks/useProducts';

type RouteParamsProps = {
	productId: string;
};

type FormDataProps = {
	name: string;
	description: string;
	is_new: boolean;
	price: number;
	accept_trade: boolean;
	payment_methods: string[];
};

const createEditAdsSchema = yup.object({
	name: yup.string().required('Informe o nome do produto'),
	description: yup.string().required('Informe uma descrição do produto'),
	is_new: yup.boolean().required('Informe se o produto é novo ou usado'),
	price: yup
		.number()
		.required('Informe o preço do produto')
		.positive('O preço deve ser maior que zero')
		.min(0.01, 'O preço deve ser maior que zero'),
	accept_trade: yup.boolean().required('Informe se aceita troca'),
	payment_methods: yup
		.array()
		.of(yup.string().required('Método de pagamento obrigatório'))
		.min(1, 'Selecione ao menos um método de pagamento')
		.required('Informe os métodos de pagamento'),
});

export function AdsEditScreen() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [values, setValues] = useState('novo');
	const [listImages, setListImages] = useState<ImagesCreateAdsProps[]>([]);
	const { navigate, goBack } = useNavigation();
	const route = useRoute();

	const [productEdit, setProductEdit] = useState<ProductDTO>();

	const { productsUser } = useProducts();

	const toast = GS.useToast();

	const { productId } = route.params as RouteParamsProps;
	const {
		control,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataProps>({
		defaultValues: productEdit,
		resolver: yupResolver(createEditAdsSchema),
	});

	// Função para submeter o formulário
	async function onSubmit(formData: FormDataProps) {
		try {
			setIsLoaded(true);
			if (productId) {
				console.log('edit => ', formData);
				//const { data } = await api.put('/products', formData);
				return;
			}
			const { data } = await api.post('/products', formData);

			console.log('resp to insert new product => ', data);
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
			navigate('adsUser');

			// const resp = await api.post('/products/images', bodySignUpForm, {
			// 	headers: {
			// 		'Content-Type': 'multipart/form-data',
			// 	},
			// });
		} catch (error) {
			setIsLoaded(false);
			toast.show({
				placement: 'top',
				render: ({ id }) => (
					<ToastMessage
						id={id}
						action="error"
						title="erro ao cadastrar produto"
						onClose={() => toast.close(id)}
					/>
				),
			});
		} finally {
			setIsLoaded(false);
		}
	}

	useEffect(() => {
		if (productId) {
			const select = productsUser.find((item) => item.id === productId);
			setProductEdit(select);
		}
		console.log('here');
	}, []);

	useEffect(() => {
		if (productEdit) {
			setValue('name', productEdit.name);
			setValue('description', productEdit.description);
			setValue('is_new', productEdit.is_new);
			setValue('price', productEdit.price);
			setValue('accept_trade', productEdit.accept_trade);
			setValue('payment_methods', productEdit.payment_methods);
		}
		console.log('product edit ==> ', productEdit?.accept_trade);
	}, [productEdit, setValue]);

	return (
		<GS.VStack flex={1} paddingHorizontal="$7">
			<GS.HStack gap="$3" pt="$16" pb="$5" alignItems="center">
				<TouchableOpacity onPress={goBack}>
					<GS.Icon as={ArrowLeft} size="xl" />
				</TouchableOpacity>
				<GS.Heading color="$gray100" fontSize="$2xl" flex={1} textAlign="center">
					Editar anúncio
				</GS.Heading>
			</GS.HStack>

			<ScrollView showsVerticalScrollIndicator={false}>
				<GS.Heading mt="$2" mb="$3" fontSize="$md">
					Imagens
				</GS.Heading>
				<GS.Text fontSize="$md">
					Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!
				</GS.Text>

				<AddImagesCreateAds setImagesList={setListImages} />

				<GS.Heading mt="$2" mb="$3" fontSize="$md">
					Sobre o produto
				</GS.Heading>

				<Controller
					control={control}
					name="name"
					render={({ field: { onChange, value } }) => (
						<Input
							placeholder="Título do anúncio"
							onChangeText={onChange}
							value={value}
							errorMessage={errors.name?.message}
						/>
					)}
				/>

				<Controller
					control={control}
					name="description"
					render={({ field: { onChange, value } }) => (
						<InputTextArea
							placeholder="Descrição do anúncio"
							numberOfLines={8}
							onChangeText={onChange}
							value={value}
							errorMessage={errors.description?.message}
						/>
					)}
				/>

				<GS.RadioGroup
					value={values}
					onChange={(value) => {
						setValues(value);
						setValue('is_new', value === 'novo');
					}}
				>
					<GS.HStack space="2xl">
						<GS.Radio value="novo">
							<GS.RadioIndicator>
								<GS.RadioIcon as={values === 'novo' ? CircleSelected : CircleIcon} />
							</GS.RadioIndicator>
							<GS.RadioLabel ml="$2">Produto novo</GS.RadioLabel>
						</GS.Radio>
						<GS.Radio value="usado">
							<GS.RadioIndicator>
								<GS.RadioIcon
									as={values === 'usado' ? CircleSelected : CircleIcon}
								/>
							</GS.RadioIndicator>
							<GS.RadioLabel ml="$2">Produto usado</GS.RadioLabel>
						</GS.Radio>
					</GS.HStack>
				</GS.RadioGroup>

				<GS.Heading mt="$4" mb="$3" fontSize="$md">
					Venda
				</GS.Heading>

				<Controller
					control={control}
					name="price"
					render={({ field: { onChange, value } }) => (
						<Input
							placeholder="Valor do produto"
							keyboardType="numeric"
							onChangeText={onChange}
							value={value?.toString()}
							errorMessage={errors.price?.message}
						/>
					)}
				/>

				<GS.Heading mt="$2" mb="$3" fontSize="$md">
					Aceita troca?
				</GS.Heading>
				<Controller
					control={control}
					name="accept_trade"
					render={({ field: { onChange, value } }) => (
						<GS.HStack alignItems="center" style={{ marginTop: -10 }}>
							<GS.Switch
								trackColor={{ false: '$gray700', true: '$blue500' }}
								thumbColor={'$gray700'}
								ios_backgroundColor={'$gray500'}
								size="sm"
								onValueChange={onChange}
								value={value}
							/>
							<GS.Text size="sm">{value ? 'Sim' : 'Não'}</GS.Text>
						</GS.HStack>
					)}
				/>

				<GS.Heading mt="$2" mb="$3" fontSize="$md">
					Meios de pagamento aceitos
				</GS.Heading>

				<Controller
					control={control}
					name="payment_methods"
					render={({ field: { onChange, value } }) => (
						<GS.CheckboxGroup value={value} onChange={onChange}>
							<GS.VStack space="md">
								<GS.Checkbox value="boleto">
									<GS.CheckboxIndicator
										borderColor={
											errors.payment_methods?.message ? '$red500' : '$gray400'
										}
									>
										<GS.CheckboxIcon as={Check} color="$gray600" />
									</GS.CheckboxIndicator>
									<GS.CheckboxLabel ml="$2" color="$gray200">
										Boleto
									</GS.CheckboxLabel>
								</GS.Checkbox>
								<GS.Checkbox value="pix">
									<GS.CheckboxIndicator
										borderColor={
											errors.payment_methods?.message ? '$red500' : '$gray400'
										}
									>
										<GS.CheckboxIcon as={Check} color="$gray600" />
									</GS.CheckboxIndicator>
									<GS.CheckboxLabel ml="$2" color="$gray200">
										Pix
									</GS.CheckboxLabel>
								</GS.Checkbox>
								<GS.Checkbox value="cash">
									<GS.CheckboxIndicator
										borderColor={
											errors.payment_methods?.message ? '$red500' : '$gray400'
										}
									>
										<GS.CheckboxIcon as={Check} color="$gray600" />
									</GS.CheckboxIndicator>
									<GS.CheckboxLabel ml="$2" color="$gray200">
										Dinheiro
									</GS.CheckboxLabel>
								</GS.Checkbox>
								<GS.Checkbox value="card">
									<GS.CheckboxIndicator
										borderColor={
											errors.payment_methods?.message ? '$red500' : '$gray400'
										}
									>
										<GS.CheckboxIcon as={Check} color="$gray600" />
									</GS.CheckboxIndicator>
									<GS.CheckboxLabel ml="$2" color="$gray200">
										Cartão de Crédito
									</GS.CheckboxLabel>
								</GS.Checkbox>
								<GS.Checkbox value="deposit">
									<GS.CheckboxIndicator
										borderColor={
											errors.payment_methods?.message ? '$red500' : '$gray400'
										}
									>
										<GS.CheckboxIcon as={Check} color="$gray600" />
									</GS.CheckboxIndicator>
									<GS.CheckboxLabel ml="$2" color="$gray200">
										Depósito Bancário
									</GS.CheckboxLabel>
								</GS.Checkbox>
								<GS.HStack h="$4">
									{errors.payment_methods?.message && (
										<GS.Text color="$red500" fontSize="$sm">
											{errors.payment_methods?.message}
										</GS.Text>
									)}
								</GS.HStack>
							</GS.VStack>
						</GS.CheckboxGroup>
					)}
				/>

				<GS.VStack mt="$5" gap="$4" mb="$7">
					<Button
						title="Avançar"
						onPress={handleSubmit(onSubmit)}
						isLoading={isLoaded}
					/>
					<Button title="Cancelar" type="outline" onPress={goBack} />
				</GS.VStack>
			</ScrollView>
		</GS.VStack>
	);
}
