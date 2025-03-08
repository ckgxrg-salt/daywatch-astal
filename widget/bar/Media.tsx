import { Gtk } from "astal/gtk3";
import Mpris from "gi://AstalMpris";
import { bind } from "astal";

import { activePlayer, nextPlayer, mapPlayersIcon, lengthStr } from "../../util/mpris";

export default function Media() {
	return <box
		vertical
		className="BarMedia"
		widthRequest={40}
	>
		<button
			className="BarTitle"
			onClicked={() => nextPlayer()}
			tooltipText={bind(activePlayer).as(t => t?.get_title())}
		>
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
	const playIcon = bind(player, "playbackStatus").as(s => s === Mpris.PlaybackStatus.PLAYING ? "media-playback-pause-symbolic" : "media-playback-start-symbolic");

	return <box vertical className="BarPlayer">
		<button
			className="PlayPause"
			onClicked={() => player.play_pause()}
			visible={bind(player, "canControl")}>
			<icon icon={playIcon} />
		</button>
		<label
			className="Position"
			halign={Gtk.Align.END}
			visible={bind(player, "length").as(l => l > 0)}
			label={bind(player, "position").as(lengthStr)}
		/>
	</box >
}
