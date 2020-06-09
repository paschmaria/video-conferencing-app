from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render
from opentok import OpenTok, MediaModes, ArchiveModes

from .forms import UsernameForm

api_key = settings.TOK_BOX_API_KEY
api_secret = settings.TOK_BOX_API_SECRET
opentok = OpenTok(api_key, api_secret)
session = opentok.create_session(
    media_mode=MediaModes.routed,
    archive_mode=ArchiveModes.always
)


def index(request):
    if request.is_ajax():
        if request.method == 'POST':
            form = UsernameForm(request.POST)

            if form.is_valid():
                username = form.cleaned_data.get('username')
                session_id = session.session_id
                metadata = f"username={username}"
                token = opentok.generate_token(session_id, data=metadata)
                data = {
                    'key': api_key,
                    'id': session_id,
                    'token': token
                }
                return JsonResponse(data)
            else:
                return JsonResponse(form.errors, 400)

    return render(request, 'meeting_app/index.html')