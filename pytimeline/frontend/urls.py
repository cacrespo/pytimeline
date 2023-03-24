from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    path('board/', TemplateView.as_view(template_name="board.html")),

    path('boardc/', TemplateView.as_view(template_name="board copy.html")),

]

