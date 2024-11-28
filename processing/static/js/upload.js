



const uploadForm = document.getElementById('uploadForm');
const resultsDiv = document.getElementById('results');
const labels = ['Week 0', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];

// Image preview elements
const imageInput = document.getElementById('image');
const imagePreviewDiv = document.getElementById('imagePreview');
const previewImage = document.getElementById('preview');



// Normalize predictions to percentages
const normalizePredictions = (predictions) => {
    const total = predictions.reduce((sum, value) => sum + value, 0);
    const normalizedPercentages = predictions.map(value => ((value / total) * 100).toFixed(10));
    
    return normalizedPercentages;
}


// Set detection results in the resultsDiv
const setResults = ({ growth_stage, predictions }) => {
    const normalized = normalizePredictions(predictions);

    // Create results HTML
    let html = `
        <div class="mb-3">
        <h4>Predicted Growth Stage: <span class="text-success">Week ${growth_stage}</span></h4>
        </div>
        <h5>Confidence Levels:</h5>
        <ul class="list-group">
    `;

    for (const [index, confidence] of predictions.entries()) {
        html += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${labels[index]}</span>
                <span class="badge bg-primary rounded-pill">${normalized[index]}%</span>
                <span class="badge bg-secondary rounded-pill">${confidence}%</span>
            </li>
        `;
    }
    html += '</ul>';

    resultsDiv.innerHTML = html;
};


// Handle image preview
imageInput.addEventListener('change', function () {
    
    const file = imageInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function (e) {
            previewImage.src = e.target.result; // Set preview image source
            imagePreviewDiv.style.display = "block"; // Show preview section
        };
        
        reader.readAsDataURL(file); // Read the file
    }
    else {
        imagePreviewDiv.style.display = "none"; // Hide preview if no file is selected
        previewImage.src = "#";
    }
});


// Handle form submission
const onUpload = async (e) => {
    // Avoid reload
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(e.target);
    const req = { method: 'POST', body: formData };
    
    // Send image to the backend
    await fetch('/processing/upload/', req)
        .then(res => res.json())
        .then(data => setResults(data))
        .catch(err => console.log(err));
};



// Add event listeners
uploadForm.addEventListener('submit', onUpload);
