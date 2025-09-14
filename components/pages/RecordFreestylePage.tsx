import { RecordFreestyleProvider } from "../../context/RecordFreestyleContext";
import RecorderFreestylePageContent from "../recorder/RecorderFreestylePageContent";

export default function RecordFreestylePage() {
	return (
		<RecordFreestyleProvider>
			<RecorderFreestylePageContent />
		</RecordFreestyleProvider>
	);
}
