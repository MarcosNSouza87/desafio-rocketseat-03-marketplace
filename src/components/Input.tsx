import { ComponentProps, useState } from 'react';
import * as GS from '@gluestack-ui/themed';
type Props = ComponentProps<typeof GS.InputField> & {
	isReadOnly?: boolean;
	errorMessage?: string | null;
	isInvalid?: boolean;
	isSecurity?: boolean;
};
import { Eye, EyeOff } from 'lucide-react-native';

export function Input({
	errorMessage = null,
	isInvalid = false,
	isReadOnly = false,
	isSecurity = false,
	...rest
}: Props) {
	const invalid = !!errorMessage || isInvalid;
	const [show, setShow] = useState(true);
	return (
		<GS.FormControl isInvalid={invalid} w="$full" mb="$4">
			<GS.Input
				h="$12"
				borderWidth="$1"
				borderColor="$gray700"
				borderRadius="$md"
				$invalid={{
					borderWidth: 1,
					borderColor: '$red500',
				}}
				$focus={{
					borderWidth: 1,
					borderColor: invalid ? '$red500' : '$blue500',
				}}
				isReadOnly={isReadOnly}
				opacity={isReadOnly ? 0.5 : 1}
			>
				<GS.InputField
					px="$4"
					bg="$gray700"
					color="$gray200"
					fontFamily="$body"
					placeholderTextColor="$gray400"
					secureTextEntry={isSecurity ? show ? true: false: false}
					{...rest}
				/>
				{isSecurity && <GS.Pressable
					bg='$gray700'
					paddingHorizontal="$4"
					alignItems="center"
					justifyContent="center"
					onPress={() => setShow(!show)}
				>
					<GS.Icon as={show ? Eye : EyeOff} size="md" />
				</GS.Pressable>}
			</GS.Input>
			<GS.FormControlError>
				<GS.FormControlErrorText color="$red500">
					{errorMessage}
				</GS.FormControlErrorText>
			</GS.FormControlError>
		</GS.FormControl>
	);
}
