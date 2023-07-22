import React, {useState} from "react";
import Container from "@/app/container";
import Topbar from "@/app/components/TopBar";

const Header = (): React.JSX.Element => {

	const [openSidebar, setOpenSidebar] = useState(false);

	const handleSidebarOpen = (): void => {
		setOpenSidebar(true);
	};

	const handleSidebarClose = (): void => {
		setOpenSidebar(false);
	};

	return(
		<Container maxWidth={1} paddingY={{ xs: 1, sm: 1.5 }}>
			<Topbar onSidebarOpen={handleSidebarOpen} />
		</Container>
	)
}

export default Header;