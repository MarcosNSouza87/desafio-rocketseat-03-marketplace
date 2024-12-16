import React, { useEffect, useState } from 'react';
import * as GS from '@gluestack-ui/themed';
import LogoSVG from '@assets/logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { ScrollView, TouchableOpacity } from 'react-native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm, Controller } from 'react-hook-form';

import { Edit2 } from 'lucide-react-native';
import { gluestackUIConfig } from '../../../config/gluestack-ui.config';
import { useAuth } from '@hooks/useAuth';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { ToastMessage } from '@components/ToastMessage';
import { api } from '@services/api';
import { UserPhoto } from '@components/UserPhoto';
import userPhotoDefault from '@assets/userPhotoDefault.png';

type userImageSelectedProps = {
	selected: boolean;
	photo: {
		uri: string;
		name: string;
		type: string;
	};
};

type FormDataProps = {
	name: string;
	email: string;
	tel: string;
	password: string;
	password_confirm: string;
};

const signUpSchema = yup.object({
	name: yup.string().required('Informe o nome.'),
	tel: yup.string().required('Informe seu número.'),
	email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
	password: yup
		.string()
		.required('Informe a senha')
		.min(6, 'A senha deve ter pelo menos 6 dígitos.'),
	password_confirm: yup
		.string()
		.required('Confirme a senha.')
		.oneOf([yup.ref('password'), ''], 'A confirmação da senha não confere.'),
});

export function SignUp() {
	const { navigate } = useNavigation<AuthNavigatorRoutesProps>();
	const [isLoading, setIsLoading] = useState(false);
	const [userPhoto, setUserPhoto] = useState<any>();
	const { user, signUp } = useAuth();
	const toast = GS.useToast();

	const { tokens } = gluestackUIConfig;
	const iconSize = tokens.space[2];

	const {
		control,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<FormDataProps>({
		defaultValues: {
			name: '',
			email: '',
			tel: '',
			password: '',
			password_confirm: '',
		},
		resolver: yupResolver(signUpSchema),
	});

	async function handleSignUp({ name, email, password, tel }: FormDataProps) {
		try {
			setIsLoading(true);

			const avatar = userPhoto ? userPhoto : undefined;
			await signUp({ email, name, tel, password, avatar });
		} catch (error) {
			console.log('error => ', error);
		} finally {
			setIsLoading(false);
		}
	}

	async function handleAddAvatar() {
		try {
			const photoSelected = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ['images'],
				quality: 1,
				aspect: [4, 4],
				allowsEditing: true,
			});
			if (photoSelected.canceled) {
				return;
			}

			const photoUri = photoSelected.assets[0].uri;
			if (photoUri) {
				const photoInfo = (await FileSystem.getInfoAsync(photoUri)) as {
					size: number;
				};

				if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
					return toast.show({
						placement: 'top',
						render: ({ id }) => (
							<ToastMessage
								id={id}
								action="error"
								title="Essa imagem é muito grande. Escolha uma de até 5Mb."
								onClose={() => toast.close(id)}
							/>
						),
					});
				}
				const fileExtension = photoSelected.assets[0].uri.split('.').pop();
				const photoFile = {
					name: `${user.name}.${fileExtension}`.toLowerCase(),
					uri: photoSelected.assets[0].uri,
					type: `${photoSelected.assets[0].type}/${fileExtension}`,
				} as any;

				//const userPhotoUploadForm: any = new FormData();

				//userPhotoUploadForm.avatar = photoFile;

				setUserPhoto(photoFile);
			}
			if (photoSelected.canceled) {
				return;
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<GS.ScrollView
			bg="$gray600"
			pt="$7"
			contentContainerStyle={{ flexGrow: 1 }}
			showsVerticalScrollIndicator={false}
		>
			<GS.VStack alignItems="center" w="$full" p="$10" justifyContent="flex-start">
				<LogoSVG width={84} height={44} />
				<GS.Heading fontFamily="$heading" mt="$1.5" fontSize="$lg">
					Boas Vindas!
				</GS.Heading>
				<GS.Text
					fontFamily="$body"
					fontSize="$sm"
					color="$gray300"
					textAlign="center"
				>
					Crie sua conta e use o espaço para comprar itens variados e vender seus
					produtos
				</GS.Text>
				<TouchableOpacity style={{ marginTop: 15 }} onPress={handleAddAvatar}>
					<GS.Box
						bg="$gray500"
						rounded="$full"
						alignItems="center"
						justifyContent="center"
						borderWidth={'$4'}
						borderColor={'$blue500'}
					>
						<UserPhoto
							source={userPhoto ? userPhoto : userPhotoDefault}
							alt="Foto do usuário"
							size="md"
							resizeMode="cover"
						/>
					</GS.Box>
					<GS.Box
						w="$8"
						h="$8"
						bg="$blue500"
						rounded="$full"
						position="absolute"
						style={{ bottom: 0, right: -4 }}
						alignItems="center"
						justifyContent="center"
					>
						<GS.Icon as={Edit2} color="$gray600" />
					</GS.Box>
				</TouchableOpacity>
				<GS.VStack w="$full" gap="$2" pt="$5">
					<Controller
						control={control}
						name="name"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Nome"
								onChangeText={onChange}
								value={value}
								errorMessage={errors.name?.message}
							/>
						)}
					/>
					<Controller
						control={control}
						name="email"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="E-mail"
								keyboardType="email-address"
								autoCapitalize="none"
								onChangeText={onChange}
								value={value}
								errorMessage={errors.email?.message}
							/>
						)}
					/>
					<Controller
						control={control}
						name="tel"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Telefone"
								onChangeText={onChange}
								value={value}
								errorMessage={errors.tel?.message}
							/>
						)}
					/>
					<Controller
						control={control}
						name="password"
						render={({ field: { onChange, value } }) => (
							<Input
								isSecurity
								placeholder="Senha"
								onChangeText={onChange}
								value={value}
								errorMessage={errors.password?.message}
							/>
						)}
					/>
					<Controller
						control={control}
						name="password_confirm"
						render={({ field: { onChange, value } }) => (
							<Input
								isSecurity
								onChangeText={onChange}
								value={value}
								onSubmitEditing={handleSubmit(handleSignUp)}
								returnKeyType="send"
								errorMessage={errors.password_confirm?.message}
								placeholder="Confirmar Senha"
							/>
						)}
					/>
					<Button
						title="Criar"
						onPress={handleSubmit(handleSignUp)}
						isLoading={isLoading}
					/>
					<GS.Center gap="$2" mt="$3">
						<GS.Text fontFamily="$body" fontSize="$sm" pb="$1" color="$gray200">
							Ja tem uma conta?
						</GS.Text>
						<Button
							title="Ir para o login"
							type="outline"
							onPress={() => navigate('signIn')}
						/>
					</GS.Center>
				</GS.VStack>
			</GS.VStack>
		</GS.ScrollView>
	);
}
