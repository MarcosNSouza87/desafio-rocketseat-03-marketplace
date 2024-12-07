import React, { useState } from 'react';
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

import { Camera, Edit2 } from 'lucide-react-native';
import { gluestackUIConfig } from '../../../config/gluestack-ui.config';

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
	phoneNumber: string;
	password: string;
	password_confirm: string;
};

const signUpSchema = yup.object({
	name: yup.string().required('Informe o nome.'),
	phoneNumber: yup.string().required('Informe seu número.'),
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
			phoneNumber: '',
			password: '',
			password_confirm: '',
		},
		resolver: yupResolver(signUpSchema),
	});

	function handleSignUp() {}
	function handleAddAvatar() {}

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
						w="$20"
						h="$20"
						bg="$gray500"
						rounded="$full"
						borderColor="$blue500"
						borderWidth="$2"
						alignItems="center"
						justifyContent="center"
					>
						<Camera color={tokens.colors.gray400} size={38} />
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
						name="phoneNumber"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Telefone"
								onChangeText={onChange}
								value={value}
								errorMessage={errors.phoneNumber?.message}
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
