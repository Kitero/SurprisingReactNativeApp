from rest_framework import serializers
import api.models as models
import api.tools as tools


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('id', 'username', 'password', 'token', 'profile_picture')
        extra_kwargs = {
            'token': {'default': tools.get_new_token},
            'password': {'write_only': True},
            'profile_picture': {'use_url': True}
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
    class Meta:
        model = models.ShoppingListItem
        fields = ('id', 'shopping_list', 'item', 'checked')

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'shopping_list': instance.shopping_list.id,
            'item': instance.item.name,
            'item_id': instance.item.id,
            'checked': instance.checked
        }
