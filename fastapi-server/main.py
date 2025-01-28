# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# # Initialize the FastAPI app
# app = FastAPI()

# # Add CORS middleware to allow requests from your Express server
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5000"],  # Replace with your Express server's URL
#     allow_credentials=True,
#     allow_methods=["*"],  # Allow all HTTP methods
#     allow_headers=["*"],  # Allow all headers
# )

# # Root endpoint
# @app.get("/")
# def read_root():
#     return {"message": "Welcome to the FastAPI server!"}

# # Example endpoint to call from Express
# @app.get("/api/example")
# def read_example():
#     return {"message": "This is an example endpoint"}


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import topic_generation

# Initialize the FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000"],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include routes from the `api` folder
app.include_router(topic_generation.router)