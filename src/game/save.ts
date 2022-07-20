import { defineValue } from "./lib";

class SaveRecord<K extends string, V extends object> {
	_maker: () => V;
	data: Record<K, V> = this as any;
	constructor(maker: () => V) {
		defineValue(this, "_maker", maker);
		this._maker = maker;
	}
	getItem(key: K) {
		return (this.data[key] ??= this._maker());
	}
	static create<K extends string, V extends object>(maker: (key: K) => V) {}
}
