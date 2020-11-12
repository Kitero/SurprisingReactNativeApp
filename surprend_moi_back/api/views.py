from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
import api.serializers as serializers
import api.models as models


@api_view(['POST'])
def sign_up(request):
    serializer = serializers.UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
def sign_in(request):
    try:
        query = models.User.objects.get(username=request.data['username'],
                                        password=request.data['password'])
        serializer = serializers.UserSerializer(query)
    except models.User.DoesNotExist:
        return Response('Invalid username or password', status=status.HTTP_404_NOT_FOUND)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_item(request):
    serializer = serializers.ShoppingItemSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_items(request):
    query = models.ShoppingItem.objects.all()
    serializer = serializers.ShoppingItemSerializer(query, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_shopping_list(request):
    data = {
        **(request.data if type(request.data) == dict else request.data.dict()),
        'created_by': request.user.pk
    }
    serializer = serializers.ShoppingListSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_shopping_lists(request):
    query = models.ShoppingList.objects.filter(created_by=request.user.pk)
    serializer = serializers.ShoppingListSerializer(query, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def put_item_in_shopping_list(request):
    serializer = serializers.ShoppingListItemSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_items_from_shopping_list(request, shopping_list_id):
    query = models.ShoppingListItem.objects.filter(shopping_list=shopping_list_id)
    serializer = serializers.ShoppingListItemSerializer(query, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_list_item(request, shopping_list_item_id):
    query = models.ShoppingListItem.objects.get(pk=shopping_list_item_id)
    data = {'checked': True}
    serializer = serializers.ShoppingListItemSerializer(query, data=data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)
