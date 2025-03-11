import { Astal } from "astal/gtk3";
import { exec } from "astal";

import { coffeeState, focused } from "../../app";
import { sendBack } from "../../util/hyprland";

export function Return() {
	return <button
		className="Return"
		tooltipText="Return to normal layout"
		heightRequest={64}
		widthRequest={40}
		onClicked={() => {
			exec(["notify-send", "-i", "monitor", "Astal", "Exited Focus Mode.\nWindows are sent back to the primary screen."])
			focused.set(false);
			sendBack();
		}}
	>
		<icon icon="go-first-view" />
	</button>;
}

export function Tea() {
	return <button
		heightRequest={64}
		widthRequest={40}
		setup={self => {
			if (coffeeState.get()) {
				self.set_class_name("TeaDrunk");
				(self.get_child() as Astal.Icon).icon = "caffeine-plus-on";
				self.set_tooltip_text("Inhibited System Idle");
			} else {
				self.set_class_name("TeaZzz");
				(self.get_child() as Astal.Icon).icon = "caffeine-plus-off";
				self.set_tooltip_text("Again, this widget says Zzz, pretending to sleep");
			}
			coffeeState.subscribe(state => {
				if (state) {
					self.set_class_name("TeaDrunk");
					(self.get_child() as Astal.Icon).icon = "caffeine-plus-on";
					self.set_tooltip_text("Inhibited System Idle");
				} else {
					self.set_class_name("TeaZzz");
					(self.get_child() as Astal.Icon).icon = "caffeine-plus-off";
					self.set_tooltip_text("Again, this widget says Zzz, pretending to sleep");
				}
			});
		}}
		onClicked={() => {
			coffeeState.set(!coffeeState.get());
		}}
	>
		<icon />
	</button>;
}
