import { Gtk } from "astal/gtk3";
import Mpris from "gi://AstalMpris";
import { bind } from "astal";

import { activePlayer, nextPlayer, prevPlayer, mapPlayers, lengthStr } from "../util/mpris";

export default function Media() {
	return <box
		vertical
		className="Media"
		widthRequest={380}
	>
		{Switchers()}
		{bind(activePlayer).as(player => {
			if (player === undefined) {
				return <label
					className="NotFound"
					widthRequest={420}
					heightRequest={200}
				>
					No Players Found
				</label>;
			} else {
				return <PlayerControl player={player} />;
			}
		})}
	</box>;
}

function Switchers() {
	return <centerbox className="Switchers">
		<button
			tooltipText="Previous Player"
			onClicked={() => prevPlayer()}
		>
			<icon icon="media-skip-backward-symbolic" />
		</button>
		<label
			truncate
			widthRequest={300}
			label={bind(activePlayer).as(player => mapPlayers(player))}
		/>
		<button tooltipText="Next Player" onClicked={() => nextPlayer()}>
			<icon icon="media-skip-forward-symbolic" />
		</button>
	</centerbox >;
}

function PlayerControl({ player }: { player: Mpris.Player }) {
	const { START, CENTER, END } = Gtk.Align;
	const title = bind(player, "title").as(t => t || "");
	const artist = bind(player, "artist").as(a => a || "");
	const coverArt = bind(player, "coverArt").as(c => `background-image: url('${c}')`);
	const position = bind(player, "position").as(p => player.length > 0 ? p / player.length : 0);
	const playIcon = bind(player, "playbackStatus").as(s => s === Mpris.PlaybackStatus.PLAYING ? "media-playback-pause-symbolic" : "media-playback-start-symbolic");

	return <box className="MediaPlayer" vertical>
		<box>
			<box className="CoverArt" css={coverArt} widthRequest={120} heightRequest={120} />
			<box vertical valign={CENTER} className="Title">
				<label truncate maxWidthChars={20} halign={START} label={title} tooltipText={title} />
				<label halign={START} valign={START} wrap label={artist} tooltipText={artist} />
			</box>
		</box>
		<slider
			className="Progress"
			visible={bind(player, "length").as(l => l > 0)}
			onDragged={({ value }) => player.position = value * player.length}
			value={position}
		/>
		<centerbox
			className="Actions"
			widthRequest={400}
			heightRequest={50}
		>
			<label
				className="Position"
				halign={START}
				visible={bind(player, "length").as(l => l > 0)}
				label={bind(player, "position").as(lengthStr)}
			/>
			<box>
				<button
					onClicked={() => player.previous()}
					visible={bind(player, "canGoPrevious")}
					widthRequest={40}
					heightRequest={30}
				>
					<icon icon="media-skip-backward-symbolic" />
				</button>
				<button
					onClicked={() => player.play_pause()}
					visible={bind(player, "canControl")}
					widthRequest={40}
					heightRequest={30}
				>
					<icon icon={playIcon} />
				</button>
				<button
					onClicked={() => player.next()}
					visible={bind(player, "canGoNext")}
					widthRequest={40}
					heightRequest={30}
				>
					<icon icon="media-skip-forward-symbolic" />
				</button>
			</box>
			<label
				className="Length"
				halign={END}
				visible={bind(player, "length").as(l => l > 0)}
				label={bind(player, "length").as(l => l > 0 ? lengthStr(l) : "0:00")}
			/>
		</centerbox>
	</box >
}
