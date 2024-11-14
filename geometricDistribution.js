// Function to calculate the geometric distribution value for a given x and probability p
function geometricDistribution(x, p) {
    return Math.pow(1 - p, x - 1) * p;
}

// Function to update the Geometric Distribution plot and calculation details
function updateGeometricPlot(p) {
    const xValues = [];
    const yValues = [];

    // Generate data points for the plot (x starts at 1 since it's the first trial)
    for (let x = 1; x <= 20; x++) {
        xValues.push(x);
        yValues.push(geometricDistribution(x, p));
    }

    // Plot the data using Plotly.js
    const trace = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines+markers',
        line: { color: '#4a90e2', width: 3 },
        marker: { size: 6 }
    };

    const layout = {
        title: 'Geometric Distribution',
        xaxis: { title: 'Number of Trials (x)', range: [1, 20] },
        yaxis: { title: 'Probability' }
    };

    Plotly.newPlot('geometricPlot', [trace], layout);

    // Update the calculation details section
    const calculationDetails = `
        <p><strong>Geometric Distribution Formula:</strong></p>
        <p>P(X = x) = (1 - p)^(x - 1) * p</p>
        <p>Current Values:</p>
        <p>p (Probability of Success) = ${p.toFixed(2)}</p>
        <p>For x = 1, the probability P(X = 1) = ${geometricDistribution(1, p).toFixed(6)}</p>
    `;
    document.getElementById('calculationDetails').innerHTML = calculationDetails;
}

// Function to handle file upload
function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = e.target.result.split(/\r?\n/).map(Number).filter(val => !isNaN(val)); // Parse numbers from file
        if (data.length > 0) {
            const p = calculateProbability(data);

            // Update the slider to reflect the calculated probability
            document.getElementById('probSlider').value = p.toFixed(2);
            document.getElementById('probValue').innerText = p.toFixed(2);

            // Update the plot and calculation details with the calculated probability
            updateGeometricPlot(p);

            // Show alert message for data upload
            showAlert('Data uploaded. Using calculated probability of success.');
        }
    };

    reader.readAsText(file);
}

// Function to show an alert message
function showAlert(message) {
    const alertMessage = document.createElement('div');
    alertMessage.innerText = message;
    alertMessage.style.position = 'fixed';
    alertMessage.style.top = '50%';
    alertMessage.style.left = '50%';
    alertMessage.style.transform = 'translate(-50%, -50%)';
    alertMessage.style.backgroundColor = '#4a90e2';
    alertMessage.style.color = '#fff';
    alertMessage.style.padding = '15px 30px';
    alertMessage.style.fontSize = '1.2em';
    alertMessage.style.borderRadius = '5px';
    alertMessage.style.zIndex = '9999';
    document.body.appendChild(alertMessage);

    // Hide the alert after 3 seconds
    setTimeout(() => {
        alertMessage.remove();
    }, 3000);
}

// Function to calculate the probability of success from uploaded data
function calculateProbability(data) {
    const successes = data.filter(val => val === 1).length; // Assume 1 represents success
    return successes / data.length;
}

// Event listeners for sliders
document.getElementById('probSlider').addEventListener('input', function() {
    const p = parseFloat(this.value);
    document.getElementById('probValue').innerText = p.toFixed(2);
    updateGeometricPlot(p);
});

// Event listener for file input
document.getElementById('fileInput').addEventListener('change', handleFileUpload);

// Initialize plot with default values
window.onload = function() {
    updateGeometricPlot(0.5); // Default probability of success = 0.5
};
