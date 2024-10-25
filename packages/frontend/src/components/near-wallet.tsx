"use client";
import {useBitteWallet} from "@mintbase-js/react";
import {Button} from "@/src/components/ui/button";

export const NearWalletConnector = () => {
	const {isConnected, selector, connect, activeAccountId} = useBitteWallet();

	const handleSignout = async () => {
		const wallet = await selector.wallet();
		return wallet.signOut();
	};

	const handleSignIn = async () => {
		return connect();
	};

	if (!isConnected) {
		return (
			<div className="w-full flex justify-center items-center">
				<Button className="w-full" onClick={handleSignIn}>Login</Button>
			</div>
		);
	}

	return (
		<div className="w-full sm:w-auto flex justify-center items-center">
			<Button className="w-full" onClick={handleSignout}>
				{activeAccountId}
			</Button>
		</div>
	);
};
