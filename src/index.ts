import Vue, { WatchOptions } from 'vue'
import { createDecorator } from 'vue-class-component'

export default function Persistance(key: string, storage?: any) {
	if(!storage) storage = window.localStorage;
	var persisted, persitanceMixin, props = {}, persist = storage.setItem ? ()=> {
			if(Persist.persisting) storage.setItem(key, JSON.stringify(persisted));
		} : ()=> {
			if(Persist.persisting) storage[key] = JSON.stringify(persisted);
		}, persistTimeout = null;
	let retrieved = storage.getItem ? storage.getItem(key) : storage[key];
	function watchAll(comp) {
		for(let prop in props)
			(function(prop) {
				comp.$watch(
					prop,
					(newVal: any, oldVal: any) => {
						persisted[prop] = newVal;
						if(!persistTimeout)
							persistTimeout = setTimeout(()=> {
								persistTimeout = null;
								persist();
							});
					},
					props[prop]
				)
			})(prop);
	}
	if(retrieved) {
		persisted = JSON.parse(retrieved);
		persitanceMixin = {
			data() {
				return Object.assign({}, persisted);
			},
			created() {
				watchAll(this);
			}
		};
	} else {
		persisted = {};
		persitanceMixin = {
			created() {
				for(let prop in props)
					persisted[prop] = this[prop];
				//Other `created` might have already changed the data
				persist();
				watchAll(this);
			}
		};
	}
	function Persist(
		options: WatchOptions = {
			deep: true
		}
	) {
		return (target: Vue, key: string) => {
			createDecorator((componentOptions, k) => {
				props[key] = options;
				if(!~componentOptions.mixins.indexOf(persitanceMixin))
					componentOptions.mixins.push(persitanceMixin)
			})(target, key)
		}
	};
	Persist.persisting = true;
	Persist.persist = persist;
	return Persist;
}