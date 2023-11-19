- [Branching](#branching)
  - [Switching Branches](#switching-branches)
  - [Pulling Changes](#pulling-changes)
  - [Pushing Changes](#pushing-changes)
- [Server](#using-server)

## Branching

### Switching Branches

To switch to a different branch, open your terminal and use the following command:

```bash
git checkout branch-name
```

### Pulling Changes

Before pushing new code, it's essential to pull changes from the remote repository. Use the following commands:

Use rebase as reconciliation strategy:

```bash
git config pull.rebase true
```

After configuring the strategy, run the following command to pull the changes:

```bash
git pull origin branch-name
```

### Pushing Changes

After making changes, commit and push them to the remote repository. Follow these steps:

Add the changes:

```bash
git add .
```

Commit the changes:

```bash
git commit -m "Your commit message"
```

Push the changes to the remote repository:

```bash
git push
```

## Server

### Using Server

```bash
git checkout server
```

Then delete the node_modules folder

```bash
npm i
```

Add the .env file

Run start

```bash
npm start
```
