# Portfolio — Frontend (Client)

React and Vite-based frontend for the portfolio website. Ready to be deployed on Vercel.

---

## 🚀 Local Development

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Create a `.env` file (based on `.env.example`):
```bash
VITE_API_URL=http://localhost:3000
```
*Note: In local development, Vite's proxy is configured in `vite.config.ts` to automatically forward `/api` requests to `localhost:3000`, so setting `VITE_API_URL` is optional locally.*

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ☁️ Deployment (Vercel)

1. Initialize a Git repository in this folder and push it to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial frontend commit"
   # Link to your new GitHub repository and push
   ```
2. Import the repository into **Vercel**.
3. Vercel will automatically detect **Vite** as the framework.
4. Add the following **Environment Variable**:
   - `VITE_API_URL`: The URL of your deployed backend (Render) — e.g. `https://your-backend.onrender.com`
5. Click **Deploy**.
