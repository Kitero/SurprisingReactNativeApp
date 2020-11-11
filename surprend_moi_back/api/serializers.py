from rest_framework import serializers
import api.models as models
import api.tools as tools
import api.serializers as api_serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('id', 'username', 'password', 'token', 'profile_picture')
        extra_kwargs = {
            'token': {'default': tools.get_new_token},
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        if 'token' not in validated_data:
            validated_data['token'] = tools.get_new_token()
        return super().create(validated_data)


class ShoppingItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ShoppingItem
        fields = ('id', 'name')


class ShoppingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ShoppingList
        fields = ('id', 'created_by', 'name')


class ShoppingListItemSerializer(serializers.ModelSerializer):
    item = serializers.PrimaryKeyRelatedField(read_only=True, default=api_serializers.ShoppingItemSerializer)
    class Meta:
        model = models.ShoppingListItem
        fields = ('id', 'shopping_list', 'item', 'checked')
