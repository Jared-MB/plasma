# Plasma

Monorepo for `@crm/plasma` — a fully type-safe HTTP client wrapper around `fetch` with zero codegen.

## Structure

```
plasma/
├── packages/
│   └── plasma/          # @crm/plasma — the published package
├── apps/                # Internal apps (docs, playground, etc.)
├── turbo.json           # Turborepo task config
├── biome.json           # Linter & formatter
└── pnpm-workspace.yaml
```

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 20 |
| pnpm | 10.30.0 |

## Getting Started

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm turbo run test --filter @crm/plasma

# Type check
pnpm check-types

# Lint
pnpm lint

# Format
pnpm format
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm build` | Build all packages and apps |
| `pnpm dev` | Start dev mode for all packages and apps |
| `pnpm lint` | Lint all packages |
| `pnpm format` | Format all `.ts`, `.tsx`, `.md` files |
| `pnpm check-types` | Run TypeScript type checking |
| `pnpm changeset` | Create a new changeset |
| `pnpm changeset:version` | Consume changesets and bump versions |
| `pnpm release` | Build and publish to npm |

## Release Workflow

This repo uses [Changesets](https://github.com/changesets/changesets) to manage versions and changelogs.

### Creating a changeset

After making changes to `@crm/plasma`, run:

```bash
pnpm changeset
```

Select the package, choose the bump type (`patch` / `minor` / `major`), and describe what changed. Commit the generated `.md` file inside `.changeset/` along with your code.

### Publishing

When a PR with pending changesets is merged to `main`, the [Release workflow](.github/workflows/release.yml) automatically:

1. Opens a **"chore: version packages"** PR that bumps `package.json` versions and updates `CHANGELOG.md`
2. When that PR is merged, publishes the package to npm

### Manual release

```bash
pnpm changeset          # create changeset
pnpm changeset:version  # bump versions + update CHANGELOG
pnpm release            # build + publish to npm
```

## Packages

### [`@crm/plasma`](packages/plasma)

Full type-safe HTTP client wrapper around `fetch`. See the [package README](packages/plasma/README.md) for detailed API docs.

## License

[MIT](LICENSE)
