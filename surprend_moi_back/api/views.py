from rest_framework.decorators import api_view
from rest_framework.response import Response
import api.serializers as serialziers


@api_view(['POST'])
def sign_up(request):
    serializer = serialziers.UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
def sign_in(request):
    return Response("HELLO")


@api_view(['POST'])
def create_item(request):
    return Response("HELLO")


@api_view(['GET'])
def get_items(request):
    return Response("HELLO")


@api_view(['POST'])
def create_shopping_list(request):
    pass


@api_view(['GET'])
def get_shopping_lists(request, user_id):
    pass


@api_view(['POST'])
def put_item_in_shopping_list(request, shopping_list_id):
    pass


@api_view(['GET'])
def get_items_from_shopping_list(request, shopping_list_id):
    pass
