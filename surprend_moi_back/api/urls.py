from api.views import *
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('sign-up/', sign_up),
    path('sign-in/', sign_in),
    path('create-item/', create_item),
    path('get-items/', get_items),
    path('create-shopping-list/', create_shopping_list),
    path('get-shopping-lists/', get_shopping_lists),
    path('put-item-in-shopping-list/', put_item_in_shopping_list),
    path('get-items-from-shopping-list/<int:shopping_list_id>/', get_items_from_shopping_list),
    path('check-shopping-list-item/<int:shopping_list_item_id>/', check_list_item),
    path('delete-shopping-list/<int:shopping_list_id>/', delete_shopping_list),
    path('upload-profile-picture/', upload_profile_picture)
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

