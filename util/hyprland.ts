// Interacts with Hyprland
import Hyprland from "gi://AstalHyprland";
import { exec } from "astal";

import Dashboard from "../widget/dashboard/Dashboard";
import { focused } from "../app";

const hypr = Hyprland.get_default();

// WM callbacks
export function hyprInit() {
	hypr.connect("monitor-added", (_, monitor) => {
		if (monitor.get_name() == "DP-1") {
			Dashboard();
		}
	});
	hypr.connect("client-added", (_, client) => {
		if (!focused.get() && client.get_monitor().get_name() == "DP-1" && !client.get_floating() && client.get_class() != "alacritty-cava") {
			exec(["notify-send", "-i", "laptop", "Astal", "Switched to Focus Mode.\nUse the Return button above to restore the dashboard."])
			focused.set(true);
		}
	});
	hypr.connect("workspace-added", (_, workspace) => {
		if (workspace.get_monitor().get_name() == "DP-1" && !focused.get()) {
			exec(["notify-send", "-i", "laptop", "Astal", "Cannot create new Workspace.\nDashboard is locked when not in Focus Mode."])
			workspace.move_to(hypr.get_monitor(0));
		}
	});
}

// Send all clients back to primary screen
export function sendBack() {
	let clients = hypr.get_clients();
	let workspace = hypr.get_monitor(0).get_active_workspace();
	clients.forEach(each => {
		if (each.get_monitor().get_name() == "DP-1" && each.get_class() != "alacritty-cava") {
			each.move_to(workspace);
		}
	});
}

// Switch the focus back to primary monitor before any task
export function switchFocus() {
	hypr.dispatch("focusmonitor", "eDP-1");
}
