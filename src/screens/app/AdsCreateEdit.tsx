import React from 'react';

import * as GS from '@gluestack-ui/themed';
import { HeaderApp } from '@components/HeaderApp';
import { Input } from '@components/Input';
import { InputTextArea } from '@components/TextAreaInput';
import { CircleIcon, CheckIcon, Check } from 'lucide-react-native';
import CircleSelected from '@assets/circleSelectIcon.svg';
import { ScrollView } from 'react-native';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';

export function AdsCreateEditScreen() {
	const [values, setValues] = React.useState('novo');
	const [aceptReplace, setAceptReplace] = React.useState(false);
	const [payments, setPayments] = React.useState(['']);
	const { navigate, goBack } = useNavigation();
	return (
		<GS.VStack flex={1} paddingHorizontal="$7">
			<HeaderApp type="AdsCreate" />
			<ScrollView showsVerticalScrollIndicator={false}>
				<GS.Heading mt="$2" mb="$3" fontSize="$md">
					Imagens
				</GS.Heading>
				<GS.Text fontSize="$md">
					Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
				</GS.Text>

				<GS.Heading mt="$2" mb="$3" fontSize="$md">
					Sobre o produto
				</GS.Heading>
				<Input placeholder="Título do anúncio" />
				<InputTextArea placeholder="Descrição do anúncio" numberOfLines={8} />

				<GS.RadioGroup value={values} onChange={setValues}>
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

				<GS.Heading mt="$2" mb="$3" fontSize="$md">
					Venda
				</GS.Heading>

				<Input placeholder="Valor do produto" />
				<GS.Heading mt="$2" mb="$3" fontSize="$md">
					Aceita troca?
				</GS.Heading>
				<GS.HStack space="md" alignItems="center">
					<GS.Switch
						trackColor={{ false: '$gray700', true: '$blue500' }}
						thumbColor={'$gray700'}
						ios_backgroundColor={'$gray500'}
						onChange={() => setAceptReplace(!aceptReplace)}
					/>
					<GS.Text size="sm">{aceptReplace ? 'Sim' : 'Não'}</GS.Text>
				</GS.HStack>

				<GS.Heading mt="$2" mb="$3" fontSize="$md">
					Meios de pagamento aceitos
				</GS.Heading>

				<GS.CheckboxGroup
					value={payments}
					onChange={(keys) => {
						setPayments(keys);
					}}
				>
					<GS.VStack space="md">
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
				<GS.VStack mt="$10" gap="$4">
					<Button title="Avançar" onPress={() => navigate('home')} />
					<Button title="Cancelar" type="outline" onPress={goBack} />
				</GS.VStack>
			</ScrollView>
		</GS.VStack>
	);
}
