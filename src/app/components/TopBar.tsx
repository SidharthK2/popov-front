import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import NavItem from "@/app/components/NavItem";
import ConnectButton from "@/app/components/ConnectButton";

interface Props {
	onSidebarOpen: () => void;
	colorInvert?: boolean;
}

const Topbar = ({ onSidebarOpen }: Props): React.JSX.Element => {
	const theme = useTheme();

	return (
		<Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={1} padding={0}>
			<Box
				display={'flex'}
				component="a"
				href="/"
				title="popov"
				width={{ xs: 100, md: 120 }}
			>
				<Box component={'img'} src="ethglobal.svg" height={0.9} width={0.9} />
			</Box>
			<Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
				<Box marginLeft={0}>
					<NavItem
						title='EXPLORE'
						id='1'
					/>
				</Box>
				<Box marginLeft={4}>
					<NavItem
						title='ADD DAO'
						id='2'
					/>
				</Box>
				<Box marginLeft={4}>
					<Box
						display={'flex'}
						alignItems={'center'}
						sx={{ cursor: 'pointer' }}
					>
						<ConnectButton/>
					</Box>
				</Box>
			</Box>
			<Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
				<Button
					onClick={() => onSidebarOpen()}
					aria-label="Menu"
					variant={'outlined'}
					sx={{
						borderRadius: 2,
						minWidth: 'auto',
						padding: 1,
						borderColor: alpha(theme.palette.divider, 0.2),
					}}
				>
					<MenuIcon />
				</Button>
			</Box>
		</Box>
	);
};

export default Topbar;
