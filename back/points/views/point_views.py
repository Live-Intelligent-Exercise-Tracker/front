from datetime import date, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from django.db.models import Sum

from points.models.attendance_model import Attendance
from points.models.points_model import Points



#  출석 체크 상태 조회 (월~일 기준)
class AttendanceStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        today = date.today()
        start_of_week = today - timedelta(days=today.weekday())  # 이번 주 월요일
        dates = [start_of_week + timedelta(days=i) for i in range(7)]

        attendance_qs = Attendance.objects.filter(user=user, date__in=dates)
        attendance_map = {a.date: a.checked for a in attendance_qs}

        week_labels = ["월", "화", "수", "목", "금", "토", "일"]
        status = [attendance_map.get(d, False) for d in dates]

        return Response({
            "week": week_labels,
            "status": status
        })


#  출석 체크 + 포인트 지급 (50P)
class AttendanceCheckInView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        today = date.today()

        attendance, _ = Attendance.objects.get_or_create(user=user, date=today)

        if attendance.checked:
            return Response({"message": "이미 출석 완료된 상태입니다."},
                            status=status.HTTP_200_OK)

        attendance.checked = True
        attendance.save()

        # 중복 포인트 지급 방지
        if not Points.objects.filter(user=user, reason="출석 체크", created_at__date=today).exists():
            Points.objects.create(
                user=user,
                amount=+50,  #  50포인트 지급
                reason="출석 체크"
            )

        return Response({"message": "출석 체크 완료 및 포인트 50점 지급"},
                        status=status.HTTP_200_OK)


#  포인트 총합 + 최근 10개 이력
class PointSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        total = Points.objects.filter(user=user).aggregate(Sum('amount'))['amount__sum'] or 0
        history = Points.objects.filter(user=user).order_by('-created_at')[:10]

        history_data = [
            {
                "amount": p.amount,
                "reason": p.reason,
                "created_at": p.created_at,
            }
            for p in history
        ]

        return Response({
            "total": total,
            "history": history_data
        })