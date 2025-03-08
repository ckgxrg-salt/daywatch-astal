import { App, Astal } from "astal/gtk3";

import { coffeeState } from "../app";

export default function Inhibitor(monitor: number) {
	return <window
		application={App}
		className="Inhibitor"
		name="astal-inhibitor"
		namespace="astal-inhibitor"
		layer={Astal.Layer.BACKGROUND}
		monitor={monitor}
		exclusivity={Astal.Exclusivity.IGNORE}
		setup={self => {
			self.set_inhibit(coffeeState.get());
			coffeeState.subscribe(state => self.set_inhibit(state));
		}}
	/>;
}
