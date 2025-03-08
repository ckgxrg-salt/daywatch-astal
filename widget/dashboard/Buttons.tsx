import { Astal } from "astal/gtk3";
import { execAsync } from "astal";

import { coffeeState } from "../../app";

export default function Buttons() {
	return <box vertical className="Buttons">
		<Apps />
		<Power />
		<Coffee />
	</box>;
}

function Apps() {
	return <button
		className="Apps"
		tooltipText="Application Launcher"
		widthRequest={150}
		heightRequest={150}
		onClicked={() => {
			execAsync("uwsm app -- rofi -show drun");
		}}
	>
		<icon icon="activities" />
	</button>;
}

function Power() {
	return <button
		className="Power"
		tooltipText="Power Options"
		widthRequest={150}
		heightRequest={150}
		onClicked={() => {
			execAsync("uwsm app -- wlogout");
		}}
	>
		<icon icon="gtk-goto-last-ltr" />
	</button>;
}

// Inhibits screenlocker
function Coffee() {
	return <button
		widthRequest={150}
		heightRequest={150}
		setup={self => {
			if (coffeeState.get()) {
				self.set_class_name("CoffeeDrunk");
				(self.get_child() as Astal.Icon).icon = "caffeine-cup-full";
				self.set_tooltip_text("Inhibited System Idle");
			} else {
				self.set_class_name("CoffeeZzz");
				(self.get_child() as Astal.Icon).icon = "view-refresh";
				self.set_tooltip_text("This widget says Zzz, pretending to sleep");
			}
			coffeeState.subscribe(state => {
				if (state) {
					self.set_class_name("CoffeeDrunk");
					(self.get_child() as Astal.Icon).icon = "caffeine-cup-full";
					self.set_tooltip_text("Inhibited System Idle");
				} else {
					self.set_class_name("CoffeeZzz");
					(self.get_child() as Astal.Icon).icon = "view-refresh";
					self.set_tooltip_text("This widget says Zzz, pretending to sleep");
				}
			});
		}}
		onClicked={() => {
			coffeeState.set(!coffeeState.get());
		}}
	>
		<icon />
	</button>
}
