// Interacts with Hyprland
import Hyprland from "gi://AstalHyprland";
import { exec } from "astal";

import Dashboard from "../widget/dashboard/Dashboard";
import { focused } from "../app";

const hypr = Hyprland.get_default();

// WM callbacks
export function hyprInit() {
	hypr.connect("monitor-added", () => {
		Dashboard(1);
	})
	hypr.connect("client-added", (_, client) => {
		if (!focused.get() && client.get_monitor().get_name() == "DP-1" && client.get_class() != "alacritty-cava") {
			exec(["notify-send", "-i", "laptop", "Astal", "Switched to Focused Mode.\nUse the Return button above to restore the dashboard."])
			focused.set(true);
		}
	})
	hypr.connect("monitor-removed", (_, id) => {
		if (id == 1 && focused.get()) {
			exec(["notify-send", "-i", "monitor", "Astal", "Automatically Exited Focused Mode.\nFocused Mode is unsupported in suspension."])
			focused.set(false);
			sendBack();
		}
	})
}

// Send all clients back to primary screen
export function sendBack() {
	let clients = hypr.get_clients();
	let workspace = hypr.get_monitor(0).get_active_workspace();
	clients.forEach(each => {
		if (each.get_monitor().get_name() == "DP-1" && each.get_class() != "alacritty-cava") {
			each.move_to(workspace);
		}
	})
}

// Switch the focus back to primary monitor before any task
export function switchFocus() {
	hypr.dispatch("focusmonitor", "eDP-1");
}
