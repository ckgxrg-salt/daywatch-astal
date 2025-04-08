import { bind, Variable, execAsync } from "astal";
import Tray from "gi://AstalTray";
import GTop from "gi://GTop";

import { switchFocus } from "../util/hyprland";

export default function Dock() {
	return <box
		className="Dock"
	>
		<SysTray />
		<Cpu />
		<Memory />
	</box>;
}

function SysTray() {
	const tray = Tray.get_default();

	return <box
		className="SysTray"
		heightRequest={75}
		widthRequest={650}
	>
		{bind(tray, "items").as(items => items.map(item => (
			<menubutton
				widthRequest={50}
				tooltipMarkup={bind(item, "tooltipMarkup")}
				usePopover={false}
				actionGroup={bind(item, "actionGroup").as(ag => ["dbusmenu", ag])}
				menuModel={bind(item, "menuModel")}>
				<icon gicon={bind(item, "gicon")} />
			</menubutton>
		)))}
	</box>
}

const cpu = Variable({ cpu: new GTop.glibtop_cpu(), load: 0 }).poll(
	5000,
	({ cpu: lastCpu }) => {
		const cpu = new GTop.glibtop_cpu();
		GTop.glibtop_get_cpu(cpu);

		const used = cpu.user + cpu.sys + cpu.nice + cpu.irq + cpu.softirq;
		const total = used + cpu.idle + cpu.iowait;

		const lastUsed =
			lastCpu.user + lastCpu.sys + lastCpu.nice + lastCpu.irq + lastCpu.softirq;
		const lastTotal = lastUsed + lastCpu.idle + lastCpu.iowait;

		const diffUsed = used - lastUsed;
		const diffTotal = total - lastTotal;

		return { cpu, load: diffTotal > 0 ? diffUsed / diffTotal : 0 };
	},
);
function Cpu() {
	return <box
		className="Cpu"
		tooltipText="CPU Load"
		heightRequest={75}
		widthRequest={100}
	>
		<icon icon="cpu" />
		<button
			onClicked={() => {
				switchFocus();
				execAsync("uwsm app -- alacritty -e btop");
			}}
		>
			{bind(cpu).as(c => `${Math.round(c.load * 100)}%`)}
		</button>
	</box >;
}

const mem = Variable(new GTop.glibtop_mem()).poll(5000, () => {
	const realmem = new GTop.glibtop_mem();
	GTop.glibtop_get_mem(realmem);
	return realmem;
})
function Memory() {
	return <box
		className="Memory"
		tooltipText="Memory Usage"
		heightRequest={75}
		widthRequest={100}
	>
		<icon icon="drive-virtual" />
		<button
			onClicked={() => {
				switchFocus();
				execAsync("uwsm app -- alacritty -e btop");
			}}
		>
			{bind(mem).as(m => `${Math.round(m.user / m.total * 100)}%`)}
		</button>
	</box >;
}
