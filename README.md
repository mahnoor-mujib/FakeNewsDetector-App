# Fake News Detection Web App

This is a full-stack web application built with **React** and **Node.js** that allows users to:

 Analyze news articles to detect if they are fake or real using AI  
 Sign up / log in as a user  
 View a feed of famous fake news with like, dislike, and comment options  
 Interact in real-time — news refreshes every 10 seconds  

---

## Technologies Used

- **Frontend:** React, Axios, React Router
- **Backend:** Node.js, Express
- **AI API:** OpenRouter API
- **Styling:** CSS
- **Data Storage:** JSON-based mock DB (for simplicity)

---

## App Features

### Authentication
- Sign up and login pages using localStorage
- Route protection — cannot access main app without login

### Fake News Analyzer
- Paste any news article text
- Get AI-generated prediction about whether it's fake or real

### Fake News Feed
- Live-updating feed of trending fake news
- Searchable by keywords
- Users can like, dislike, comment, or delete (if admin)

---

