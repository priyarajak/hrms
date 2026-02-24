from pydantic import BaseModel, EmailStr
# from typing import Optional


class EmployeeCreate(BaseModel):
    employee_id: str
    name: str
    email: EmailStr
    department: str


class EmployeeResponse(BaseModel):
    employee_id: str
    name: str
    email: str
    department: str


class AttendanceCreate(BaseModel):
    employee_id: str
    date: str
    status: str