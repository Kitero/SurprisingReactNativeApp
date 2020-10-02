from api.views import *
from django.urls import path


urlpatterns = [
    path('sign-up/', sign_up),
    path('sign-in/', sign_in),
    path('create-item/', create_item),
    path('get-items/', get_items),
    path('create-shopping-list/', create_shopping_list),
    path('get-shopping-lists/<int:user_id>/', get_shopping_lists),
    path('put_item_in_shopping_list/<int:shopping_list_id>/', put_item_in_shopping_list),
    path('get_items_from_shopping_list/<int:shopping_list_id>/', get_items_from_shopping_list),
]
