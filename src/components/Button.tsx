import * as GS from '@gluestack-ui/themed';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof GS.Button> & {
	title: string;
	type?: 'primary' | 'secondary' | 'outline';
	isLoading?: boolean;
};

export function Button({
	title,
	type = 'primary',
	isLoading = false,
	...rest
}: Props) {
	return (
		<GS.Button
			w="$full"
			h="$12"
			bg={type === 'primary' ? '$gray100' : type === 'outline' ? '$gray500' : '$blue500' }
			borderWidth="$0"
			rounded="$sm"
			// $active-bg={type === 'primary' || type === 'outline' ? '$gray100' : '$blue500' }
			disabled={isLoading}
			{...rest}
		>
			{isLoading ? (
				<GS.ButtonSpinner color="$white" />
			) : (
				<GS.Text
					color={type === 'outline' ? '$gray200' : '$white'}
					fontFamily="$heading"
					fontSize="$md"
				>
					{title}
				</GS.Text>
			)}
		</GS.Button>
	);
}
