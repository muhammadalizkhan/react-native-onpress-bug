export interface INativeSearch {
	hi: string;
}
import DefaultVariableStorage from "./DefaultVariableStorage";

class BottomOptManger extends DefaultVariableStorage<INativeSearch | undefined> {
	setStorage(value: INativeSearch | undefined, refresh: boolean = true) {
		this.memoryVariable = value;
		if (refresh) {
			this.refreshListeners();
		}
	}
}

export const BottomOptionsManager = new BottomOptManger('', undefined);
