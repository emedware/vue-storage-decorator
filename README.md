# vue-storage-decorator

[![npm](https://img.shields.io/npm/v/vue-storage-decorator.svg)](https://www.npmjs.com/package/vue-storage-decorator)

Give a Persist decorator to persist vue object properties to some storage

Allows to create a decorator `@Persist()` to decorate Vue class members so that their value is loaded from a storage and persisted there when it changes

## Yet another package

This one has been done for the members to be loaded at `data()` gathering moment (not on `create()`). Also, it allows to persist all the data in one and only one variable of the storage.

## Install

npm i -S vue-storage-decorator

## Usage

```typescript
import Persistance from 'vue-storage-decorator'
const Persist = Persistance("myKey");

@Component()
class myApp extends Vue {
    @Persist() myProp = 0
    @Persist() yesNo = true
}
```

First a decorator (here called `Persist`) is created with the function `Persistance(key: string, storage?: any)`.
The key is the key used in the persistance object. The persistance object can be any like `localStorage`, `sessionStorage`, or even an object you create and manage by yourself : it can either implement `setItem` and/or `getItem` or just be a plain object. If none is specified, `localStorage` is used

This created decorator is then used. It can take an argument : the watch option to use on the variable (default: `{deep: true}`).
The decorated members *have to* have an initial value. This one will be overriden by the persisted value if something was persisted.

After the first run of the component here, the `localStorage` will contain `myKey-> {"myProp": 0, "yesNo": true}`.

### Disableing persistance in some cases

It can happen - when you control appears in a main window and a popup for ex. - that the control should in some case stop persisting its changes.

In order to do that, the created `Persistance` has a member `persisting: boolean` that can be changed at any time.
Also, in order to force the persistance - for ex. when setting `persisting` back to `true` - it has the function `persist`.

```ts
Persist.persisting = false;
....
Persist.persisting = true;
Persist.persist();
```

## TODO

- rollup generates index.d.ts in the root folder when `"declaration": true,`
- `npm run prepack` raises errors while `rollup -c` does not