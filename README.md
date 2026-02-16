# Smart Bookmark App

A real-time bookmark manager built with Next.js, Supabase, and Tailwind CSS.

## 🚀 Live Demo

https://your-vercel-url.vercel.app

---

## 📌 Features

- 🔐 Google OAuth Login (Supabase Auth)
- ➕ Add bookmarks (Title + URL)
- ❌ Delete bookmarks
- 🔒 Private bookmarks per user (Row Level Security)
- ⚡ Real-time updates across multiple tabs
- ☁️ Deployed on Vercel

---

## 🛠️ Tech Stack

Frontend:
- Next.js (App Router)
- Tailwind CSS

Backend:
- Supabase
  - Authentication
  - PostgreSQL Database
  - Realtime subscriptions

Deployment:
- Vercel

---

## 🗄️ Database Schema

Table: bookmarks

| Column | Type |
|------|------|
| id | uuid |
| user_id | uuid |
| title | text |
| url | text |
| created_at | timestamp |

---

## 🔐 Security

Row Level Security ensures:

- Users can only view their own bookmarks
- Users can only insert their own bookmarks
- Users can only delete their own bookmarks

---

## ⚡ Realtime Functionality

Supabase Realtime is used to:

- Listen to database changes
- Update UI instantly
- Sync multiple browser tabs

---

## ⚙️ Environment Variables

Create `.env.local`:

