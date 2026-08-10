# AI Requirements Engineer

An AI-powered tool that takes a simple app idea and turns it into a clear, well structured software requirements document.
It covers everything from functional and non-functional requirements to user stories, risks, acceptance criteria, 
and assumptions all generated with the help of an LLM.

## Demo

<img width="400" height="258" alt="AI_req_Demo" src="https://github.com/user-attachments/assets/e9900b2f-e25a-4c1e-9221-688da0bd9e33" />


## What it does

Simply describe your app idea in your own words (for example, "an app like Uber but for tutors"), and the tool turns it into a structured requirements document.
Instead of starting from a blank page and figuring out what requirements you need, the AI helps break the idea down into the key details a software requirements
analyst would normally work through making the process faster and easier.
## Features

* AI-generated functional & non-functional requirements
* User stories in standard format
* Risk analysis with mitigation notes
* Acceptance criteria (Given/When/Then format)
* Export the full document as a PDF
* Clean, professional UI with smooth animations

## Tech Stack

**Frontend:** React (Vite), CSS
**Backend:** Python, FastAPI
**AI:** Groq API (`llama-3.3-70b-versatile`)
**PDF Export:** jsPDF

## Architecture

```text
User describes idea (React UI)
        ⬇
POST request to FastAPI backend
        ⬇
Backend sends structured prompt to Groq API
        ⬇
AI returns requirements as JSON
        ⬇
Backend returns JSON to frontend
        ⬇
React renders organized, styled sections
```

## Project Structure

```text
ai-requirements-engineer/
├── main.py              # FastAPI app + Groq integration
├── requirements.txt     # Python dependencies
├── .env                 # API key (not committed)
├── frontend/
│   ├── src/
│   │   ├── App.jsx      # Main React component
│   │   └── App.css      # Styling
│   └── package.json
└── README.md
```

## Running Locally

### Prerequisites

* Python 3.9+
* Node.js 18+
* A free [Groq API key](https://console.groq.com)

### **1. Clone the repository**

```bash
git clone https://github.com/JumanahFar/ai-requirements-engineer.git
cd ai-requirements-engineer
```

### **2. Set up the backend**

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in `backend/` with your Groq API key:

```env
GROQ_API_KEY=your_api_key_here
```

Run the backend server:

```bash
uvicorn main:app --reload
```

The API will run at `http://127.0.0.1:8000`.

### **3. Set up the frontend**

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app will run at `http://localhost:5173`.

## What I Learned

This project was built to understand how AI applications work in practice — not by training a model, but by integrating a language model via API into a real full-stack application.

Key concepts covered:

* Prompt engineering for structured, consistent outputs
* Using `response_format` to enforce valid JSON from an LLM
* Building a REST API with FastAPI
* Connecting a React frontend to a Python backend
* Handling CORS between frontend and backend
* Client-side PDF generation

## Future Improvements

* Save and revisit past generated projects
* User authentication
* Export to additional formats (Word, Markdown)
* UML diagram suggestions
* Editable/refinable requirements after generation

## Author

**Jumanah Alanazi**
