import { exec, Variable, bind } from "astal";
import { Gtk, App } from "astal/gtk3";

export default function Buttons() {
	return <box
		vertical
		className="LOButtons"
		widthRequest={800}
		heightRequest={200}
		valign={Gtk.Align.CENTER}
		halign={Gtk.Align.CENTER}
	>
		<box className="MenuContainer">
			<Shutdown />
			<Reboot />
			<Lock />
			<Logout />
			<Suspend />
		</box>
		<Focused />
	</box>;
}

const confirm = Variable("");
function mapClassname(orig: string, conf: string) {
	if (conf == orig.toLowerCase()) {
		return orig + "Confirm";
	}
	return orig;
}

function Focused() {
	return <label
		halign={Gtk.Align.CENTER}
		className="FocusedAction"
		label={bind(confirm).as(str => {
			switch (str) {
				case "shutdown": return "Power Off";
				case "reboot": return "Reboot";
				case "lock": return "Lock Screen";
				case "lgout": return "Log out";
				case "suspend": return "Suspend";
				default: return "Daywatch";
			}
		})} />;
}

function Shutdown() {
	return <button
		className={bind(confirm).as(c => mapClassname("Shutdown", c))}
		tooltipText="Power Off"
		widthRequest={200}
		heightRequest={250}
		onClicked={() => {
			if (confirm.get() === "shutdown") {
				exec(["hyprctl", "dispatch", "exec", "systemctl poweroff"]);
			}
			confirm.set("shutdown");
		}}
	>
		<icon icon="system-shutdown" />
	</button>;
}
function Reboot() {
	return <button
		className={bind(confirm).as(c => mapClassname("Reboot", c))}
		tooltipText="Reboot"
		widthRequest={200}
		heightRequest={250}
		onClicked={() => {
			if (confirm.get() === "reboot") {
				exec(["hyprctl", "dispatch", "exec", "systemctl reboot"]);
				App.quit();
			}
			confirm.set("reboot");
		}}
	>
		<icon icon="system-reboot" />
	</button>;
}
function Lock() {
	return <button
		className={bind(confirm).as(c => mapClassname("Lock", c))}
		tooltipText="Lock Screen"
		widthRequest={200}
		heightRequest={250}
		onClicked={() => {
			if (confirm.get() === "lock") {
				exec(["hyprctl", "dispatch", "exec", "bash -c 'pidof hyprlock || hyprlock --immediate'"]);
				App.quit();
			}
			confirm.set("lock");
		}}
	>
		<icon icon="system-lock-screen" />
	</button>;
}
function Logout() {
	return <button
		className={bind(confirm).as(c => mapClassname("LGout", c))}
		tooltipText="Log out from Current Session"
		widthRequest={200}
		heightRequest={250}
		onClicked={() => {
			if (confirm.get() === "lgout") {
				exec(["hyprctl", "dispatch", "exec", "uwsm stop"]);
				App.quit();
			}
			confirm.set("lgout");
		}}
	>
		<icon icon="system-log-out" />
	</button>;
}
function Suspend() {
	return <button
		className={bind(confirm).as(c => mapClassname("Suspend", c))}
		tooltipText="Take a Nap"
		widthRequest={200}
		heightRequest={250}
		onClicked={() => {
			if (confirm.get() === "suspend") {
				exec(["hyprctl", "dispatch", "exec", "systemctl suspend"]);
				App.quit();
			}
			confirm.set("suspend");
		}}
	>
		<icon icon="system-suspend" />
	</button>;
}
