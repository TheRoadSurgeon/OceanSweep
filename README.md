# OceanSweep

OceanSweep is a web-based platform to help track and reduce ocean waste through a collaborative community experience. Users can sign up under different roles, view a dashboard with impact stats, and navigate resources/engagement areas. 

# Class
CS442 Software Engineering II class project.

## Key Features
- **Role-based accounts:** `VOLUNTEER`, `EXPERT`, `ORGANIZER`, `CONSULTANT`
- **Navigation tabs:** Dashboard, Engagements, Resources, About Us
- **Dashboard:** high-level impact metrics and a “Top Volunteers” panel
- **Authentication + database:** credentials-based auth backed by PostgreSQL + Prisma

## Tech Stack
- **Next.js** (App Router)
- **Tailwind CSS**
- **PostgreSQL**
- **Prisma ORM**

## Project Report
[Final Report (PDF)](FinalReport/development_report_completed.pdf)

## Screenshots

### Primary Page
![Primary Page](WebsiteScreenshot/PrimaryPage.png)

### Login / Signup
![Login Page](WebsiteScreenshot/LoginPage.png)
![Sign Up Page](WebsiteScreenshot/SignUpPage.png)

### Dashboard
![Dashboard](WebsiteScreenshot/DashboardTab.png)

### Engagements
![Engagements](WebsiteScreenshot/EngagementsTab.png)

### Resources
![Resources 1](WebsiteScreenshot/ResourcesTab1.png)
![Resources 2](WebsiteScreenshot/ResourcesTab2.png)
![Resources 3](WebsiteScreenshot/ResourcesTab3.png)

### About Us
![About Us 1](WebsiteScreenshot/AboutUsTab1.png)
![About Us 2](WebsiteScreenshot/AboutUsTab2.png)


## Getting Started (Local)

### 1) Install dependencies
```bash
npm install
```

### 2) Environment variables
Create a local `.env` (this repo ignores `.env*` by default). Example:
```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DB_NAME"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace_me"
```

### 3) Prisma
```bash
npx prisma generate
# If you’re using migrations:
npx prisma migrate dev
# Optional:
npx prisma studio
```

### 4) Run the app
```bash
npm run dev
```

Then open `http://localhost:3000`.

## Team
- Onkar Dangi  
- Dante D'Oronzo  
- Yurii Koval  
- Hristian Tountchev  
