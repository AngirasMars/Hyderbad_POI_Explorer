# Hyderabad POI Explorer

A modern, glassy, AI-ready map app to explore Hyderabad's best "chai spots" and other Points of Interest (POIs) using Google Maps data and reviews.  
Discover, filter, and interact with city hotspots—powered by React, Mapbox, and future LLM integration.

---

## 🌟 Features

- Interactive Mapbox map of Hyderabad with animated, color-coded POI pins
- Category-based POI selection (e.g., "Chai Wala")
- Live-drawer panel for POI details (name, address, ratings, open status, etc.)
- Fly-to animation and pin/list sync on click
- Gorgeous Apple-style glassmorphic UI
- **Planned:** Chatbox and LLM-powered natural language POI filtering (e.g., "best chai for families")

---

## 🚀 Getting Started

1. **Clone the repo**
    ```bash
    git clone https://github.com/yourusername/hyderabad-poi-explorer.git
    cd hyderabad-poi-explorer
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Set up your API keys**  
   - Copy `.env.example` to `.env` and fill in your keys:
     ```
     VITE_MAPBOX_TOKEN=your_mapbox_token
     # (add others as needed, e.g., Firebase or Google Maps)
     ```

4. **Run the app**
    ```bash
    npm run dev
    ```
    or
    ```bash
    npm start
    ```

5. **Open in browser:**  
   - Visit [http://localhost:5173](http://localhost:5173) or the port Vite/React specifies.

---

## 📁 Project Structure

- `src/components/` — All React UI components
- `src/data/pois.json` — Sample POI data (chai spots, etc.)
- `.env.example` — Template for required env variables
- `.env` — (DO NOT COMMIT; add your own keys here)

---

## 🛡️ Security

- **Do NOT commit your real `.env` or API keys.**
- `.env` is in `.gitignore` by default.
- Only share `.env.example` with variable names.

---

## 🤖 LLM Integration (Coming Soon)

The architecture is ready for adding a chat/LLM API endpoint to allow users to ask questions like  
> "Where are the best chai spots for families?"  
The LLM will analyze POI reviews and highlight recommended spots on the map.

---

## 🙏 Credits

- Google Maps API (for POI/review data)
- Mapbox (for map rendering)
- Inspired by the chai and startup culture of Hyderabad

---

## 📧 Contact

For feedback or collab: angirasmars@gmail.com

---

