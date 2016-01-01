# React App Template

## Create and Deploy a React Application to gitHub pages

### Setup
- Create and clone a repository.
- In the repo:

```bash
npx create-react-app .
```

```bash
npm i gh-pages --save-dev
npm i sass --save-dev
npm i npm-run-all
npm react-bootstrap bootstrap
```
Add Scripts to package.json:
```json
"clean": "rm -rf build",
"publish": "gh-pages -d build",
"deploy": "run-s clean build publish"
```
Add this prop to package.json

```json
"homepage": "https://<<Your-github-username>>.github.io/<<Your-app-name>>/"
```

### Update All Packages to the Latest Version
```bash
npm install -g npm-check-updates
ncu -u
npm i
```

### Run 
```bash
npm run start
```

### Deploy
```bash
npm run deploy
```