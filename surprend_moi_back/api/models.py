from django.db import models


class User(models.Model):
    username = models.CharField(max_length=256, unique=True)
    password = models.CharField(max_length=256)
    token = models.CharField(max_length=256, editable=False)
    profile_picture = models.ImageField(null=True)


class ShoppingItem(models.Model):
    name = models.CharField(max_length=256, unique=True)


class ShoppingList(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shopping_lists')
    name = models.CharField(max_length=256)


class ShoppingListItem(models.Model):
    shopping_list = models.ForeignKey(ShoppingList, on_delete=models.CASCADE, related_name='items')
    item = models.ForeignKey(ShoppingItem, on_delete=models.CASCADE)
    checked = models.BooleanField(default=False)
