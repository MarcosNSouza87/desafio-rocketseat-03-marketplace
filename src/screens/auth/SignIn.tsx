import React, { useState } from 'react';
import * as GS from '@gluestack-ui/themed';
import LogoSVG from '@assets/logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { ScrollView } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormDataProps = {
	email: string;
	password: string;
};

const signInSchema = yup.object({
	email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
	password: yup
		.string()
		.required('Informe a senha.')
		.min(6, 'A senha deve ter pelo menos 6 dígitos.'),
});

export function SignIn() {
	const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

	const [isLoading, setIsLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataProps>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(signInSchema),
	});

	function handleSignIn () {

	}

	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1 }}
			showsVerticalScrollIndicator={false}
		>
			<GS.Center flex={1} bg="$gray600" borderRadius="$5" p="$10">
				<GS.VStack alignItems="center" w="$full">
					<LogoSVG />
					<GS.Heading fontFamily="$heading" mt="$5" color="$gray200" fontSize="$4xl">
						marketspace
					</GS.Heading>
					<GS.Text fontFamily="$body" color="$gray400">
						Seu espaço de venda e compra
					</GS.Text>
					<GS.Text color="$gray300" mt="$20" mb="$5">
						Acesse a sua conta
					</GS.Text>

					<Controller
						control={control}
						name="email"
						rules={{ required: 'Informe o e-mail' }}
						render={({ field: { onChange, value } }) => (
							<Input
								w="100%"
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
						name="password"
						rules={{ required: 'Informe a senha' }}
						render={({ field: { onChange, value } }) => (
							<Input
								w="100%"
								isSecurity
								placeholder="Senha"
								onChangeText={onChange}
								value={value}
								errorMessage={errors.password?.message}
							/>
						)}
					/>
					<Button title="Entrar" type="secondary" onPress={handleSubmit(handleSignIn)} mt="$4" />
				</GS.VStack>
			</GS.Center>
			<GS.Center
				gap="$2"
				bg="$white"
				paddingHorizontal="$10"
				style={{ height: 250 }}
			>
				<GS.Text fontFamily="$body" fontSize="$md" pb="$3" color="$gray200">
					Ainda não tem acesso?
				</GS.Text>
				<Button
					title="Criar conta"
					type="outline"
					onPress={() => navigate('signUp')}
				/>
			</GS.Center>
		</ScrollView>
		// <GS.VStack flex={1} bg="$gray600" justifyContent="space-between">
		// 	<GS.Box h="$4"></GS.Box>
		// 	<GS.VStack alignItems="center" justifyContent="center" h="$40">
		// 		<LogoSVG />
		// 		<GS.Heading fontFamily="$heading" mt="$5" fontSize="$4xl">
		// 			marketspace
		// 		</GS.Heading>
		// 		<GS.Text fontFamily="$body" color="$gray400">
		// 			Seu espaço de compra e venda
		// 		</GS.Text>
		// 	</GS.VStack>
		// 	<GS.Center gap="$2" paddingHorizontal="$10">
		// 		<GS.Text fontFamily="$body" fontSize="$sm" pb="$3" color="$gray200">
		// 			Acessar sua conta
		// 		</GS.Text>
		// 		<Input placeholder="E-mail" />
		// 		<Input placeholder="Senha" isSecurity />
		// 		<Button title="Entrar" type="secondary" onPress={() => {}} mt="$4" />
		// 	</GS.Center>
		// 	<GS.Center gap="$2" bg="$white" paddingHorizontal="$10" style={{ height: 250 }}>
		// 		<GS.Text fontFamily="$body" fontSize="$md" pb="$3" color="$gray200">
		// 			Ainda não tem acesso?
		// 		</GS.Text>
		// 		<Button
		// 			title="Criar conta"
		// 			type="outline"
		// 			onPress={() => navigate('signUp')}
		// 		/>
		// 	</GS.Center>
		// </GS.VStack>
	);
}
