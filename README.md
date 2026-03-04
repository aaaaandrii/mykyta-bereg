# S E C-style landing page (static)

This project is a lightweight static recreation of the structure/layout of `https://www.sec.studio` (home + talents + suites + imprint + cookie notice).

## Run locally

### Option A: Python (recommended)

```bash
cd /Users/andriipavlov/Documents/Bereg
python3 -m http.server 5173
```

Open `http://localhost:5173`.

### Option B: Node

```bash
cd /Users/andriipavlov/Documents/Bereg
npx --yes serve .
```

## Files

- `index.html`: page structure + content
- `styles.css`: styling (responsive)
- `script.js`: cookie banner behavior + active nav + footer year

