import { ComponentProps, useState } from 'react';
import * as GS from '@gluestack-ui/themed';
type Props = ComponentProps<typeof GS.TextareaInput> & {
	isReadOnly?: boolean;
	errorMessage?: string | null;
	isInvalid?: boolean;
};

export function InputTextArea({
	errorMessage = null,
	isInvalid = false,
	isReadOnly = false,
	...rest
}: Props) {
	const invalid = !!errorMessage || isInvalid;
	const [show, setShow] = useState(true);
	return (
		<GS.FormControl isInvalid={invalid} w="$full" mb="$4">
			<GS.Textarea
				style={{ height: 150 }}
				borderWidth="$0"
				borderColor="$gray700"
				borderRadius="$md"
				isReadOnly={isReadOnly}
				opacity={isReadOnly ? 0.5 : 1}
			>
				<GS.TextareaInput
					px="$4"
					bg="$gray700"
					color="$gray200"
					fontFamily="$body"
					borderColor="$gray700"
					borderRadius="$md"
					placeholderTextColor="$gray400"
					$invalid={{
						borderWidth: 1,
						borderColor: '$red500',
					}}
					$focus={{
						borderWidth: 1,
						borderColor: invalid ? '$red500' : '$blue500',
					}}
					{...rest}
				/>
			</GS.Textarea>
			<GS.FormControlError>
				<GS.FormControlErrorText color="$red500">
					{errorMessage}
				</GS.FormControlErrorText>
			</GS.FormControlError>
		</GS.FormControl>
	);
}
