import numpy as np
import tensorflow as tf
from pathlib import Path
from django.contrib.auth.models import User, Group
from django.core.files.storage import default_storage
from rest_framework import viewsets, views
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from main.serializers import UserSerializer, GroupSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class FileUploadView(views.APIView):
    authentication_classes = ()
    permission_classes = ()
    parser_classes = [MultiPartParser]

    def put(self, request, filename, format=None):
        file_obj = request.data['file']

        file_name = default_storage.save('tmp/' + file_obj.name, file_obj)

        img_height = 360
        img_width = 360

        img = tf.keras.preprocessing.image.load_img(
            file_name, target_size=(img_height, img_width)
        )

        img_array = tf.keras.preprocessing.image.img_to_array(img)
        img_array = tf.expand_dims(img_array, 0)

        model = tf.keras.models.load_model('ml/models/v5')

        predictions = model.predict(img_array)
        score = tf.nn.softmax(predictions[0])

        class_names = ['Acinetobacter.baumanii', 'Actinomyces.israeli', 'Bacteroides.fragilis', 'Bifidobacterium.spp',
                       'Candida.albicans', 'Clostridium.perfringens', 'Enterococcus.faecalis', 'Enterococcus.faecium',
                       'Escherichia.coli', 'Fusobacterium', 'Lactobacillus.casei', 'Lactobacillus.crispatus',
                       'Lactobacillus.delbrueckii', 'Lactobacillus.gasseri', 'Lactobacillus.jehnsenii',
                       'Lactobacillus.johnsonii', 'Lactobacillus.paracasei', 'Lactobacillus.plantarum',
                       'Lactobacillus.reuteri', 'Lactobacillus.rhamnosus', 'Lactobacillus.salivarius',
                       'Listeria.monocytogenes', 'Micrococcus.spp', 'Neisseria.gonorrhoeae', 'Porfyromonas.gingivalis',
                       'Propionibacterium.acnes', 'Proteus', 'Pseudomonas.aeruginosa', 'Staphylococcus.aureus',
                       'Staphylococcus.epidermidis', 'Staphylococcus.saprophiticus', 'Streptococcus.agalactiae',
                       'Veionella']

        result_prediction = class_names[np.argmax(score)]
        result_score = 100 * np.max(score)
        file_size = Path(file_name).stat().st_size

        return Response({'prediction': result_prediction, 'score': result_score, 'fileSize': file_size}, status=200)
