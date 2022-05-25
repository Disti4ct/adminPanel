# Packages

### How to start development?

1. Install dependencies for the **panel**, **storage** and **examples/panel-interface**: `npm i`
2. Add local packages:
> run from the `/examples`

```bash
npx lerna add storage --scope panel-interface
npx lerna add panel --scope panel-interface
```

3. Start an example with **yarn** from the `/examples/panel-interface`: `yarn start`
4. Start watching the package you want to develop in real-time (check **package.json**). Run from the project root: `yarn watch`
