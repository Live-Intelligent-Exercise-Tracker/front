from django.urls import path
from points.views.point_views import (
    AttendanceStatusView,
    AttendanceCheckInView,
    PointSummaryView
)

urlpatterns = [
    path("attendance/", AttendanceStatusView.as_view(), name="attendance-status"),
    path("attendance/checkin/", AttendanceCheckInView.as_view(), name="attendance-checkin"),
    path("total/", PointSummaryView.as_view(), name="point-total"),
]