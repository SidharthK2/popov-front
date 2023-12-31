'use client'

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Alert, AlertTitle, Dialog, DialogActions, DialogTitle, TextField} from "@mui/material";
import Header from "@/app/header";
import useProviderStore from "@/app/store";

export default function Proposal() {
	const provider = useProviderStore((state) => state.provider);
	const ownerAddress = useProviderStore((state) => state.ownerAddress);

	const [open, setOpen] = React.useState(false);
	const [showAlert, setShowAlert] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleVoteFor = () => {
		setOpen(false);
		setShowAlert(true);
	};

	const handleVoteAgainst = () => {
		setOpen(false);
		setShowAlert(true);
	};

	return(
		<Box>
			<Header/>
			{ showAlert ?
				<Alert onClose={() => { setShowAlert(false) }}>
					Your vote has been added — <strong>thanks !</strong>
				</Alert>
				:
				<></>
			}
			<Box padding={8}>
				<Box
					display={'flex'}
					justifyContent={'space-between'}
					alignItems={{ xs: 'flex-start', sm: 'center' }}
					flexDirection={{ xs: 'column', sm: 'row' }}
				>
					<Box>
						<Typography fontWeight={700} variant={'h4'} gutterBottom>
							Proposal title
						</Typography>
						<Typography variant={'h6'}>by jeremy.</Typography>
					</Box>
					<Box display="flex" marginTop={{ xs: 2, md: 0 }}>
						<Button variant="contained" color="primary" size="large" onClick={handleClickOpen}>
							Vote now
						</Button>
						<Dialog
							open={open}
							onClose={handleClose}
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description"
						>
							<DialogTitle id="alert-dialog-title">
								{"What's your vote for this proposal ?"}
							</DialogTitle>
							<DialogActions>
								<Button onClick={handleVoteAgainst}>Disagree</Button>
								<Button onClick={handleVoteFor} autoFocus>
									Agree
								</Button>
							</DialogActions>
						</Dialog>
						<Box
							component={Button}
							variant="outlined"
							color="primary"
							size="large"
							marginLeft={2}
						>
							Share with a friend
						</Box>
					</Box>
				</Box>
				<Divider sx={{ marginY: 4 }} />
				<Grid container spacing={4}>
					<Grid item xs={12} md={8}>
						<Box marginBottom={3}>
							<Typography variant={'h5'} fontWeight={700} gutterBottom>
								Description
							</Typography>
							<Typography component={'p'}>
								We believe lorem ipsum dolor sit amet, consectetur adipiscing
								elit. Phasellus feugiat elit vitae enim lacinia semper. Cras nulla
								lectus, porttitor vitae urna iaculis, malesuada tincidunt lectus.
								Proin nec tellus sit amet massa auctor imperdiet id vitae diam.
								Aenean gravida est nec diam suscipit iaculis. Praesent urna velit,
								auctor nec turpis et, vehicula lobortis sem. Vivamus convallis mi
								sagittis eleifend laoreet. Praesent vitae venenatis enim. Nulla
								tincidunt felis et lectus rhoncus laoreet.
							</Typography>
						</Box>
						<Box>
							<Typography variant={'h5'} fontWeight={700} gutterBottom>
								IA Chatbot
							</Typography>
							<TextField id="filled-basic" label="Response" variant="filled" disabled fullWidth/>
							<br/>
							<Divider/>
							<br/>
							<TextField
								id="outlined-multiline-flexible"
								label="Multiline"
								multiline
								maxRows={4}
								fullWidth
							/>
						</Box>
					</Grid>
					<Grid item xs={12} md={4}>
						<Grid container spacing={4} direction="column">
							<Grid item xs={12} data-aos="fade-up">
								<Box component={Card} bgcolor={'primary.main'}>
									<CardContent>
										<Typography
											variant="h6"
											gutterBottom
											color="text.primary"
											sx={{ color: 'common.white' }}
										>
											Votes For :
										</Typography>
										<Typography
											variant="subtitle1"
											color="text.secondary"
											sx={{ color: 'common.white' }}
										>
											500
										</Typography>
									</CardContent>
								</Box>
							</Grid>
							<Grid item xs={12} data-aos="fade-up">
								<Box component={Card}>
									<CardContent>
										<Typography variant="h6" gutterBottom color="text.primary">
											Votes Against :
										</Typography>
										<Typography
											variant="subtitle1"
											color="text.primary"
										>
											31
										</Typography>
									</CardContent>
								</Box>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}