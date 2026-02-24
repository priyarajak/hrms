# from datetime import datetime


def employee_helper(employee) -> dict:
    return {
        "id": str(employee["_id"]),
        "employee_id": employee["employee_id"],
        "name": employee["name"],
        "email": employee["email"],
        "department": employee["department"],
    }


def attendance_helper(record) -> dict:
    return {
        "id": str(record["_id"]),
        "employee_id": record["employee_id"],
        "date": record["date"],
        "status": record["status"],
    }