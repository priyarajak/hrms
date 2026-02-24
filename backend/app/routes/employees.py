from fastapi import APIRouter, HTTPException
from app.database import employee_collection
from app.schemas import EmployeeCreate
from app.models import employee_helper

router = APIRouter()

# ➜ ADD EMPLOYEE


@router.post("/")
async def add_employee(employee: EmployeeCreate):
    # Check duplicate employee_id
    existing_emp = await employee_collection.find_one(
        {"employee_id": employee.employee_id}
    )
    if existing_emp:
        raise HTTPException(status_code=400,
                            detail="Employee ID already exists")

    # Check duplicate email
    existing_email = await employee_collection.find_one(
        {"email": employee.email}
    )
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already exists")

    new_employee = await employee_collection.insert_one(employee.dict())
    created_employee = await employee_collection.find_one(
        {"_id": new_employee.inserted_id})
    return employee_helper(created_employee)


# ➜ GET ALL EMPLOYEES
@router.get("/")
async def get_employees():
    employees = []
    async for emp in employee_collection.find():
        employees.append(employee_helper(emp))
    return employees


# ➜ DELETE EMPLOYEE
@router.delete("/{employee_id}")
async def delete_employee(employee_id: str):
    result = await employee_collection.delete_one({"employee_id": employee_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Employee not found")

    return {"message": "Employee deleted successfully"}
