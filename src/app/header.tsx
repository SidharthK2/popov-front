import React from "react";
import styles from "@/app/page.module.css";
import Image from "next/image";

const Header = (): React.JSX.Element => {
	return(
		<div className={styles.description}>
			<p>
				Get started with popov
			</p>
			<div>
				<a
					href="/"
					target="_blank"
					rel="noopener noreferrer"
				>
					At{' '}
					<Image
						src="/ethglobal.svg"
						alt="EthGlobal Logo"
						className={styles.vercelLogo}
						width={100}
						height={24}
						priority
					/>
				</a>
			</div>
		</div>
	)
}

export default Header;