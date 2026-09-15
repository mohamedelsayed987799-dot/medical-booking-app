# CuraCare — Medical Appointment Booking App

A React graduation project for booking doctor appointments. Built as a clean,
simple student project using a mock REST API.

## Tech Stack

- **React** (functional components + hooks)
- **React Router** for navigation
- **Axios** for API calls
- **Zustand** for global state management
- **React Hook Form** for form handling and validation
- **json-server** as a mock REST backend (`db.json`)
- **Tailwind CSS** for styling

## Project Structure

```
medical-booking-app/
├── db.json                # Mock database (doctors + appointments)
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/              # Route-level pages
│   ├── store/               # Zustand stores
│   ├── services/           # Axios API calls
│   ├── hooks/                # Custom hooks (e.g. useDebounce)
│   ├── App.jsx              # Routes
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind + global styles
```

## How to Run

This project needs **two terminals** running at the same time: one for the
mock API server, one for the React app.

**1. Install dependencies**

```bash
npm install
```

**2. Start the mock API server** (Terminal 1)

```bash
npm run server
```

This runs `json-server` on `http://localhost:3001`, serving:
- `GET/POST/PUT/DELETE /appointments`
- `GET /doctors`
- `GET /doctors/:id`

**3. Start the React app** (Terminal 2)

```bash
npm run dev
```

Open the app at `http://localhost:5173`.

> The app expects the API to be running on port 3001. If you change the
> port in `db.json`'s server command, update `BASE_URL` in
> `src/services/api.js` to match.

## Features

### Core
- Home page with hero section and featured doctors
- Doctors listing page with search (debounced) and specialty filtering
- Doctor details page
- Book appointment page with full form validation (React Hook Form)
- My Appointments page with reschedule (edit) and cancel (delete)
- Full CRUD for appointments via Axios + json-server
- Loading, error, and empty states throughout
- 404 Not Found page
- Fully responsive layout (mobile + desktop)

### Bonus
- Debounced search on the doctors page
- Pagination for the doctors list
- Dark / Light mode toggle
- Skeleton loading placeholders instead of spinners
- Simple hover and fade-in animations

## Notes

- `db.json` includes realistic sample data for doctors and a couple of
  starter appointments so the app isn't empty on first run.
- No secrets or API keys are used in this project, so no `.env` file is
  required — `.env.example` is included for reference only.
