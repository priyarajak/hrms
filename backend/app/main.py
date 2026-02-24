from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import employees, attendance

app = FastAPI(title="HRMS Lite API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employees.router, prefix="/employees", tags=["Employees"])
app.include_router(attendance.router, 
                   prefix="/attendance", tags=["Attendance"])


@app.get("/")
def root():
    return {"message": "HRMS Lite API running"}
