import GObject, { register, property } from "astal/gobject"
import { monitorFile, readFileAsync } from "astal/file"
import { exec, execAsync } from "astal/process"

const get = (args: string) => Number(exec(`brightnessctl --device=intel_backlight ${args}`));

@register({ GTypeName: "Brightness" })
export default class Brightness extends GObject.Object {
	static instance: Brightness;
	static get_default() {
		if (!this.instance)
			this.instance = new Brightness();

		return this.instance;
	}

	#max = get("max");
	#current = get("get") / (get("max") || 1);

	@property(Number)
	get screen() { return this.#current; }

	set screen(percent) {
		if (percent < 0)
			percent = 0;

		if (percent > 1)
			percent = 1;

		execAsync(`brightnessctl set --device=asus_screenpad ${Math.floor(percent * 100)}% -q`);
		execAsync(`brightnessctl set --device=intel_backlight ${Math.floor(percent * 100)}% -q`).then(() => {
			this.#current = percent;
			this.notify("screen");
		});
	}

	constructor() {
		super();

		const screenPath = `/sys/class/backlight/intel_backlight/brightness`;

		monitorFile(screenPath, async f => {
			const v = await readFileAsync(f);
			this.#current = Number(v) / this.#max;
			this.notify("screen");
		})
	}
}
