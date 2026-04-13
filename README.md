# AI Job Application Tracker

An AI-powered full-stack job application tracking system designed to help users organize their job search, monitor progress, and generate intelligent insights.

This project simulates a real-world SaaS product and demonstrates full-stack development, REST API design, database integration, and AI-powered features.


# Live Demo

https://ai-application-tracker-platform 

 
# Features

## Dashboard Analytics
- Real-time application statistics
- Total Applications
- Applied
- Interviewing
- Offers
- Rejected
- API health status monitoring

## Application Management (CRUD)
- Add new job applications
- Edit application details
- Delete applications
- Filter by application status
- Track company, role, salary, notes, and links

## AI Insights
- Generates smart job search recommendations
- Resume optimization suggestions
- Follow-up message ideas
- Pattern-based feedback

## Modern UI
- Responsive dashboard
- Modal-based form interactions
- Status badges
- Loading skeletons
- Empty state handling


# Tech Stack

## Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

## Backend
- Node.js
- Express.js
- TypeScript

## Database
- Supabase (PostgreSQL)

## AI Integration
- OpenAI API

## Deployment
- Frontend → Vercel
- Backend → Render
- Database → Supabase


# Architecture Overview

Frontend (Next.js)
        ↓
REST API (Node.js + Express)
        ↓
Database (Supabase PostgreSQL)
        ↓
AI Service (OpenAI API)



#  API Endpoints

## Health Check

GET `/health`

Returns API status.


## Applications

GET `/applications`

Fetch all applications.

POST `/applications`

Create a new application.

PUT `/applications/:id`

Update an application.

DELETE `/applications/:id`

Delete an application.


## Stats

GET `/stats/summary`

Returns dashboard statistics:

```
{
  total: number,
  applied: number,
  interviewing: number,
  offer: number,
  rejected: number
}
```


## AI Insights

POST `/ai/insights`

Generates AI-powered recommendations based on application data.


# Database Schema

```
applications

id uuid primary key
company text
role text
status text
date_applied date
job_url text
notes text
salary_range text
created_at timestamp
```


# ⚙️ Environment Variables

## Backend (.env)

```
PORT=5000

SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

OPENAI_API_KEY=your_openai_key
```


## Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```


# Running Locally

## Backend

```
cd backend
npm install
npm run dev
```

Runs on:

```
http://localhost:5000
```


## Frontend

```
cd frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:3000
```


# Deployment

Frontend deployed on:

**Vercel**

Backend deployed on:

**Render**

Database hosted on:

**Supabase**


# Key Engineering Highlights

This project demonstrates:

- Full-stack application architecture
- REST API development
- Database integration
- TypeScript usage across frontend and backend
- Modular component design
- Real-time dashboard data
- API health monitoring
- AI-powered feature integration
- Cloud deployment



# Future Improvements

- User authentication system
- Multi-user support
- Resume upload parsing
- Email follow-up automation
- Advanced analytics dashboard
- Role-based permissions



# Author

Simba Chasumba

GitHub: https://github.com/SimbaChasumba1  
Portfolio: https://simbachasumba.vercel.app  

---

# Why This Project Matters

This project was built to simulate a real-world SaaS product and demonstrate production-level engineering practices including API design, state management, database modeling, and cloud deployment.