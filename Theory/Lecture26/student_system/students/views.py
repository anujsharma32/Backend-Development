
from django.http import JsonResponse


def index(request):
    return JsonResponse({
        "message": "Welcome to the Student Management API",
        "version": "1.0",
        "status": "running"
    })

def health_check(request):
    return JsonResponse({"status": "ok"})

def student_detail(request, student_id):
    return JsonResponse({
        "student_id": student_id
    })
