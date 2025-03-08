import { Gtk } from "astal/gtk3";
import Mpris from "gi://AstalMpris";
import { bind } from "astal";

import { activePlayer, nextPlayer, mapPlayersIcon, lengthStr } from "../../util/mpris";

export default function Media() {
	return <box
		className="BarMedia"
	>
		<button className="BarTitle" onClicked={() => nextPlayer()}>
			<icon icon={bind(activePlayer).as(player => mapPlayersIcon(player))} />
		</button>
		{bind(activePlayer).as(player => {
			if (player === undefined) {
				return <box />;
			} else {
				return <PlayerControl player={player} />;
			}
		})}
	</box>;
}

function PlayerControl({ player }: { player: Mpris.Player }) {
	const { START, CENTER } = Gtk.Align;
	const title = bind(player, "title").as(t => t || "");
	const position = bind(player, "position").as(p => player.length > 0 ? p / player.length : 0);
	const playIcon = bind(player, "playbackStatus").as(s => s === Mpris.PlaybackStatus.PLAYING ? "media-playback-pause-symbolic" : "media-playback-start-symbolic");

	return <box className="BarPlayer">
		<box valign={CENTER} className="Title">
			<label truncate maxWidthChars={20} halign={START} label={title} tooltipText={title} />
		</box>
		<button
			className="PlayPause"
			onClicked={() => player.play_pause()}
			visible={bind(player, "canControl")}>
			<icon icon={playIcon} />
		</button>
		<slider
			className="Progress"
			visible={bind(player, "length").as(l => l > 0)}
			onDragged={({ value }) => player.position = value * player.length}
			value={position}
		/>
		<label
			className="Position"
			halign={START}
			visible={bind(player, "length").as(l => l > 0)}
			label={bind(player, "position").as(lengthStr)}
		/>
	</box >
}
