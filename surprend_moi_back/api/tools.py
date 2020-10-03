import string
import random


def __generate_token(letters, tokens) -> str:
    token = ''.join(letters[random.randrange(len(letters))] for _ in range(32))
    if token in [t.value for t in tokens]:
        return __generate_token(letters, tokens)
    return token


def get_new_token(tokens=None) -> str:
    if tokens is None:
        tokens = []
    letters = string.ascii_letters + string.digits
    return __generate_token(letters, tokens)
