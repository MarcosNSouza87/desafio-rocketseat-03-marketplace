import * as GS from '@gluestack-ui/themed';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof GS.Image>;

export function UserPhoto({ ...rest }: Props) {
	return (
		<GS.Image
			rounded="$full"
			{...rest}
		/>
	);
}
