import os
import json
from dotenv import load_dotenv
from groq import Groq
from fastapi import FastAPI
from pydantic import BaseModel

load_dotenv() #reads .env file

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  #only for developing later we'll select which to allow
    allow_methods=["*"],
    allow_headers=["*"],
)

class IdeaRequest(BaseModel):
    idea: str

system_prompt = """You are a senior software requirements analyst with 10+ 
years of experience writing SRS(Software Requirements Specification) documents
for real software projects.
Given a one-line app idea , generate a complete, professional requirements document.

Rules:
- Functional requirements: exactly 5-7 items, each specific and actionable(no vague like "user can login" - instead "user can register using email/phone with OTP  verification")
- Non-functional requirements: exactly 4-5 items, covering performance, security , scalability , and usability
- User stories: exactly 4-5 items, strict format "As a [role] , I want [goal] so that [benefit]"
- Risks: exactly 3-4 items, each with a brief mitigation note
- Acceptance criteria; exactly 5-6 items, written in Given/When/Then format where possible
- Assumptions: excatly 2-3 items, things the analyst is assuming about scope or users
- Project scope: 1-2 sentences summarizing what's in scope and what's explicitly out of scope


Respond ONLY with valid JSON in this exact format , no extra text, no markdown code blocks:
{ 
"project_scope": "..." , 
"functional_requirements": ["..." , "..."] ,
"non_functional_requirements":["..." , "..."] ,
"user_stories": ["..." , "..."], 
"risks": [{"risk": "..." , "mitigation": "..."}]
"acceptance_criteria":  ["..." , "..."],
"assumptions": ["..." , "..."]
}
"""

@app.post("/generate-requirements")
def generate_requirements(request: IdeaRequest):
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": request.idea}
        ]
    )
    result = json.loads(response.choices[0].message.content)
    return result