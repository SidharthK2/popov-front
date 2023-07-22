import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Props {
	title: string;
	id: string;
}

const NavItem = ({ title, id }: Props): React.JSX.Element => {
	return (
		<Box>
			<Box
				display={'flex'}
				alignItems={'center'}
				aria-describedby={id}
				sx={{ cursor: 'pointer' }}
			>
				<Typography
					fontWeight={200}
					color={'text.primary'}
				>
					{title}
				</Typography>
			</Box>
		</Box>
	);
};

export default NavItem;
