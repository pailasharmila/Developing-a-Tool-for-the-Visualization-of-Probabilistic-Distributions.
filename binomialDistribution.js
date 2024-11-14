// Function to calculate the binomial distribution value for a given number of successes (k), trials (n), and probability (p)
function binomialDistribution(k, n, p) {
    if (k > n || k < 0) return 0;
    const combination = factorial(n) / (factorial(k) * factorial(n - k));
    return combination * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

// Factorial function optimized for larger values
function factorial(num) {
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    return result;
}

// Function to update the Binomial Distribution plot and calculation details
function updateBinomialPlot(n, p) {
    const xValues = [];
    const yValues = [];

    // Generate data points for the plot (for each number of successes k)
    for (let k = 0; k <= n; k++) {
        xValues.push(k);
        yValues.push(binomialDistribution(k, n, p));
    }

    // Plot the data using Plotly.js
    const trace = {
        x: xValues,
        y: yValues,
        type: 'bar',
        marker: { color: '#ff7f0e' }
    };

    const layout = {
        title: 'Binomial Distribution',
        xaxis: { title: 'Number of Successes (k)', range: [0, n] },
        yaxis: { title: 'Probability' }
    };

    Plotly.newPlot('binomialPlot', [trace], layout);

    // Update the calculation details section for each value of k
    let binomialCalculationDetails = '<p><strong>Binomial Distribution Formula:</strong></p>';
    binomialCalculationDetails += '<p>P(X=k) = C(n, k) * p^k * (1-p)^(n-k)</p>';
    binomialCalculationDetails += `<p>Current Values:</p>`;
    binomialCalculationDetails += `<p>n (Number of Trials) = ${n}, p (Probability of Success) = ${p.toFixed(2)}</p>`;

    // Dynamically add P(X=k) for each k value
    for (let k = 0; k <= n; k++) {
        const prob = binomialDistribution(k, n, p).toFixed(4);
        binomialCalculationDetails += `<p>P(X=${k}) = ${prob}</p>`;
    }

    document.getElementById('calculationDetails').innerHTML = binomialCalculationDetails;
}

// Function to handle file upload
function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = e.target.result.split(/\r?\n/).map(Number).filter(val => !isNaN(val)); // Parse numbers from file
        if (data.length > 0) {
            const n = calculateN(data);
            const p = calculateP(data);

            // Update the sliders to reflect the calculated values
            document.getElementById('nSlider').value = n;
            document.getElementById('pSlider').value = p.toFixed(2);
            document.getElementById('nValue').innerText = n;
            document.getElementById('pValue').innerText = p.toFixed(2);

            // Update the plot and calculation details with the calculated n and p
            updateBinomialPlot(n, p);

            // Show alert message for data upload
            showAlert('Data uploaded. Using calculated n and p.');
        }
    };

    reader.readAsText(file);
}

// Function to calculate n (number of trials)
function calculateN(data) {
    return data.length; // Example: the number of data points is the number of trials
}

// Function to calculate p (probability of success)
function calculateP(data) {
    const successes = data.reduce((acc, val) => acc + (val ? 1 : 0), 0); // Count the number of successes (assuming binary data)
    return successes / data.length;
}

// Event listeners for sliders
document.getElementById('nSlider').addEventListener('input', function() {
    const n = parseInt(this.value);
    const p = parseFloat(document.getElementById('pSlider').value);
    document.getElementById('nValue').innerText = n;
    updateBinomialPlot(n, p);
});

document.getElementById('pSlider').addEventListener('input', function() {
    const p = parseFloat(this.value);
    const n = parseInt(document.getElementById('nSlider').value);
    document.getElementById('pValue').innerText = p.toFixed(2);
    updateBinomialPlot(n, p);
});

// Function to show an alert message
function showAlert(message) {
    const alertMessage = document.createElement('div');
    alertMessage.innerText = message;
    alertMessage.style.position = 'fixed';
    alertMessage.style.top = '50%';
    alertMessage.style.left = '50%';
    alertMessage.style.transform = 'translate(-50%, -50%)';
    alertMessage.style.backgroundColor = '#ff7f0e';
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

// Event listener for file input
document.getElementById('fileInput').addEventListener('change', handleFileUpload);

// Initialize plot with default values
window.onload = function() {
    updateBinomialPlot(10, 0.5); // Default values for n and p
};
