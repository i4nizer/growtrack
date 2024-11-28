from django.shortcuts import render
from django.http import JsonResponse
from .models import LettuceImage
from .detection import preprocess_image, predict_growth_stage



def upload_image(request):
    if request.method == 'POST' and request.FILES.get('image'):
        
        # Save the uploaded image to the database
        lettuce_image = LettuceImage(image=request.FILES['image'])
        lettuce_image.save()

        # Get the saved image path
        img_path = lettuce_image.image.path

        # Preprocess the image
        img_array = preprocess_image(img_path)

        # growth_stage - index of the highest probability
        growth_stage, predictions = predict_growth_stage(img_array)

        # Return the result as JSON
        return JsonResponse({ 'growth_stage': int(growth_stage), 'predictions': predictions })

    # Render the upload page for GET requests
    return render(request, 'index.html')
