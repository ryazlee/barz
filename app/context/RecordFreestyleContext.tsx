import React, { createContext, useContext, useState, ReactNode } from "react";

interface RecordFreestyleContextType {
	recordAttempts: number;
	listenCount: number;
	incrementRecordAttempts: () => void;
	incrementListenCount: () => void;
	reset: () => void;
}

const RecordFreestyleContext = createContext<
	RecordFreestyleContextType | undefined
>(undefined);

export const useRecordFreestyle = () => {
	const context = useContext(RecordFreestyleContext);
	if (!context) {
		throw new Error(
			"useRecordFreestyle must be used within a RecordFreestyleProvider"
		);
	}
	return context;
};

export const RecordFreestyleProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [recordAttempts, setRecordAttempts] = useState(0);
	const [listenCount, setListenCount] = useState(0);

	const incrementRecordAttempts = () => setRecordAttempts((prev) => prev + 1);
	const incrementListenCount = () => setListenCount((prev) => prev + 1);
	const reset = () => {
		setRecordAttempts(0);
		setListenCount(0);
	};

	return (
		<RecordFreestyleContext.Provider
			value={{
				recordAttempts,
				listenCount,
				incrementRecordAttempts,
				incrementListenCount,
				reset,
			}}
		>
			{children}
		</RecordFreestyleContext.Provider>
	);
};
