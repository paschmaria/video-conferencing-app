from django import forms


class UsernameForm(forms.Form):
    """
    Form for validatig User name
    """

    username = forms.CharField(max_length=50)