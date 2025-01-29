from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import topic_generation

# Initialize the FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5001"],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include routes from the `api` folder
app.include_router(topic_generation.router)