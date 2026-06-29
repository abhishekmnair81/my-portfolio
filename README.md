# ⚡ ABHI // HUD_v1.0 — Advanced Cyberpunk Developer Portfolio

A state-of-the-art, game-themed developer portfolio designed as an interactive sci-fi HUD (Heads-Up Display) dashboard. Built with **React (Vite) + Tailwind CSS** on the frontend, and a **Django REST Framework** API on the backend.

---

## 🛠️ Tech Stack & Architecture

### Frontend (`/frontend`)
*   **React 18**: Modular functional components using Hooks.
*   **Tailwind CSS**: Sleek glassmorphism, carbon grid layouts, scanline overlays, and neon glow borders.
*   **Framer Motion**: Smooth, cinematic transitions and hover card scaling.
*   **Web Audio API**: Custom audio synthesizer engine generating soft, pleasant UI audio cues (click, boot sequence, level-up arpeggios, bypass decryption signals) dynamically without external audio media files.
*   **HTML5 Canvas**: Multi-thread canvas animations for falling hexadecimal matrix code rain, fiber-optic data flow tracers, and real-time frequency oscillators.

### Backend (`/backend`)
*   **Django 6.0 + Django REST Framework**: Exposes RESTful endpoints for projects, skill levels, bio stats, and roadmap timelines.
*   **SQLite Database**: Fully populated database telemetry representing Abhishek M Nair's actual credentials.
*   **Auto-Seeding**: The backend views automatically populate database records with real content on first load if the database tables are empty.

---

## 🚀 Running the Project

### 1. Start the Django Backend

1.  Navigate into the `backend/` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Apply database migrations and start the server:
    ```bash
    python manage.py migrate
    python manage.py runserver
    ```
    The server will run on `http://127.0.0.1:8000`.

### 2. Start the React Frontend

1.  Navigate into the `frontend/` directory:
    ```bash
    cd ../frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the Vite dev server:
    ```bash
    npm run dev
    ```
    The application will run on `http://localhost:5180`.

---

## 🖥️ Interactive HUD Dashboard Features (v1.0 Upgrades)

*   **Premium Startpage Welcome Splash**:
    *   Falling cyan/green hexadecimal matrix code rain canvas.
    *   Spinning double-ring holographic gyro reactor core.
    *   SVG soundwave tuning oscilloscope matching boot statuses.
*   **Holographic Command Deck & AI Terminal**:
    *   Collapsible dual-pane FUI console board.
    *   Interactive terminal shell simulator (type `help`, `skills`, `projects`, `clear`, `about`, `system`).
    *   Cybersecurity hacking decryption bypass minigame. Bypassing the firewall unlocks the `"Neural Core Decrypted"` global achievement badge.
    *   Vector radar segment scanner mapping coordinates (clicking sweeps and smooth-scrolls to the section).
*   **Real-time Telemetry Signal Modulator (Hero Page)**:
    *   Canvas-based frequency wave graph tracking simulated CPU loads (`SYS_LOAD: 70%`) and signal locks.
*   **Biometric Face-Scan HUD (About Page)**:
    *   Dynamic pointer-tracking guidelines, crosshair targets, and coordinate telemetry overlaying your active avatar profile feeds.
*   **Skills Category Matrix Grid & Telemetry Sweeps**:
    *   Hovering quadrants displays category-tailored grid mesh watermarks.
    *   Horizontal laser scan lines traverse progress indicators representing active flow.
*   **Fiber-Optic Timeline Roadmap**:
    *   Glowing green/cyan tracer particle constantly flowing down the timeline center.
    *   Checkpoints trigger a slow spin on briefcase/graduation caps and apply glowing side borders.
*   **System Credentials Circuit Badges**:
    *   Holographic vector circuits rendering behind certifications that scale and rotate on user hover.
*   **Dynamic Theme Accent Switcher**:
    *   Switch colors on the fly (Cyan, Amber, Green, Pink). A root-level MutationObserver instantly updates canvas drawings and borders.
