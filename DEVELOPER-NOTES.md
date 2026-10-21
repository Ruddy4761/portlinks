# PortLinks site – developer notes

Comments were stripped from the production files. The ones that matter:

- **Ticker (top bar)** – sample data. Replace with your port / vessel API.
- **Client logos (homepage)** – placeholders. Replace each `.cl` with `<img src="client-logo.svg" alt="Client name">`.
- **Tracking form** (`.trkf`, `assets/main.js`) – demo only. Connect it to your tracking API.
- **Chat widget** (`#chat`, `assets/main.js`) – scripted replies. Connect `reply()` to your chatbot API.

## Structure
- `assets/base.css` – styles shared by all pages
- `assets/dev.css` – extra styles for the "under development" pages
- `assets/software.css` – extra styles for software-solutions.html
- `assets/main.js` – shared script
- `assets/logo.png` – logo (was embedded as base64 in every page)

Original readable source is in the first git commit.
