// Function to calculate the uniform distribution value for a given x, min, and max
function uniformDistribution(x, min, max) {
    if (x >= min && x <= max) {
        return 1 / (max - min);
    }
    return 0;
}

// Function to update the Uniform Distribution plot and calculation details
function updateUniformPlot(min, max) {
    const xValues = [];
    const yValues = [];

    // Generate data points for the plot
    for (let x = min - 1; x <= max + 1; x += 0.1) {
        xValues.push(x);
        yValues.push(uniformDistribution(x, min, max));
    }

    // Plot the data using Plotly.js
    const trace = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines',
        line: { color: '#4a90e2', width: 3 }
    };

    const layout = {
        title: 'Uniform Distribution',
        xaxis: { title: 'X', range: [min - 1, max + 1] },
        yaxis: { title: 'Probability Density' }
    };

    Plotly.newPlot('uniformPlot', [trace], layout);

    // Update the calculation details section
    const calculationDetails = `
        <p><strong>Uniform Distribution Formula:</strong></p>
        <p>f(x) = 1 / (b - a), for a ≤ x ≤ b</p>
        <p>Current Values:</p>
        <p>a (Minimum) = ${min.toFixed(2)}, b (Maximum) = ${max.toFixed(2)}</p>
        <p>For x between ${min.toFixed(2)} and ${max.toFixed(2)}, the value of f(x) = ${uniformDistribution((min + max) / 2, min, max).toFixed(6)}</p>
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
            const min = Math.min(...data);
            const max = Math.max(...data);

            // Update the sliders to reflect the calculated min and max
            document.getElementById('minSlider').value = min.toFixed(1);
            document.getElementById('maxSlider').value = max.toFixed(1);
            document.getElementById('minValue').innerText = min.toFixed(1);
            document.getElementById('maxValue').innerText = max.toFixed(1);

            // Update the plot and calculation details with the calculated min and max
            updateUniformPlot(min, max);

            // Show alert message for data upload
            showAlert('Data uploaded. Using calculated min and max.');
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

// Event listeners for sliders
document.getElementById('minSlider').addEventListener('input', function() {
    const min = parseFloat(this.value);
    const max = parseFloat(document.getElementById('maxSlider').value);
    document.getElementById('minValue').innerText = min.toFixed(1);
    updateUniformPlot(min, max);
});

document.getElementById('maxSlider').addEventListener('input', function() {
    const max = parseFloat(this.value);
    const min = parseFloat(document.getElementById('minSlider').value);
    document.getElementById('maxValue').innerText = max.toFixed(1);
    updateUniformPlot(min, max);
});

// Event listener for file input
document.getElementById('fileInput').addEventListener('change', handleFileUpload);

// Initialize plot with default values
window.onload = function() {
    updateUniformPlot(0, 5); // Default min = 0, max = 5
};
