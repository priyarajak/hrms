from fastapi import APIRouter, HTTPException
from app.database import attendance_collection, employee_collection
from app.schemas import AttendanceCreate
from app.models import attendance_helper

router = APIRouter()

# ➜ MARK ATTENDANCE


@router.post("/")
async def mark_attendance(record: AttendanceCreate):

    # Check employee exists
    employee = await employee_collection.find_one(
        {"employee_id": record.employee_id}
    )
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    # Prevent duplicate attendance for same date
    existing_record = await attendance_collection.find_one(
        {
            "employee_id": record.employee_id,
            "date": record.date
        }
    )
    if existing_record:
        raise HTTPException(
            status_code=400,
            detail="Attendance already marked for this date"
        )

    new_record = await attendance_collection.insert_one(record.dict())
    created_record = await attendance_collection.find_one(
        {"_id": new_record.inserted_id}
    )

    return attendance_helper(created_record)


@router.get("/{employee_id}")
async def get_attendance(employee_id: str):
    records = []
    async for rec in attendance_collection.find({"employee_id": employee_id}):
        records.append(attendance_helper(rec))
    return records
