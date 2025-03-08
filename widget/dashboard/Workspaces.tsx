import { bind } from "astal";
import Hyprland from "gi://AstalHyprland";

export default function Workspaces() {
	const hypr = Hyprland.get_default();
	return <box
		className="Workspaces"
		widthRequest={800}
		heightRequest={210}
	>
		{bind(hypr, "workspaces").as(wss => wss
			.filter(ws => ws.id >= 0)
			.sort((a, b) => a.id - b.id)
			.map(ws => (
				<button
					className={bind(hypr, "focusedWorkspace").as(fw =>
						ws === fw ? "focused" : "")}
					widthRequest={200}
					onClicked={() => ws.focus()}>
					{ws.id}
				</button>
			))
		)}
	</box>
}
