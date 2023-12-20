// Function to apply colors from the selected palette
function applyColors(palette) {
    var colors = palettes[palette][0];
    var colorHexDiv = document.querySelector(".colorsHex");

    // Clear previous color codes
    colorHexDiv.innerHTML = "";

    Object.keys(colors).forEach(function (key, index) {
        var colorId = "color" + (index + 1);

        document.querySelector("." + key).style.backgroundColor = colors[key];
        displayColorCode(colorHexDiv, colorId, colors[key]);
    });
}

// Function to display color code
function displayColorCode(colorHexDiv, colorId, colorCode) {
    // Create a new paragraph element
    var pElement = document.createElement("p");

    // Set the id attribute using the colorId value
    pElement.id = colorId;

    // Set the text content to the color code
    pElement.textContent = colorCode;

    // Add the paragraph element to the colorHexDiv
    colorHexDiv.appendChild(pElement);

    // Add click event to copy color code to clipboard
    pElement.addEventListener("click", function () {
        copyToClipboard(colorCode);
    });
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);


}

// Function to get the next palette key
function getNextPaletteKey(currentPaletteKey) {
    var paletteKeys = Object.keys(palettes);
    var currentIndex = paletteKeys.indexOf(currentPaletteKey);

    // If the current palette is the last one, go back to the first one; otherwise, go to the next one
    var nextIndex = (currentIndex === paletteKeys.length - 1) ? 0 : currentIndex + 1;

    return paletteKeys[nextIndex];
}

// Keep track of the last selected palette
var lastSelectedPalette = null;

// Event listener for the "Change" button
document.getElementById("changeButton").addEventListener("click", function () {
    // Get the next palette key
    var nextPaletteKey = getNextPaletteKey(lastSelectedPalette);

    // Change colors using the next palette
    applyColors(nextPaletteKey);

    // Update the last selected palette
    lastSelectedPalette = nextPaletteKey;
});

// Fetch JSON data
fetch('assets/json/palettes.json')
    .then(response => response.json())
    .then(data => {
        // Assign the JSON data to the palettes variable
        window.palettes = data;

        // Initial colors setup, using the first palette
        applyColors(Object.keys(data)[0]);

        // Set the last selected palette to the first one initially
        lastSelectedPalette = Object.keys(data)[0];
    })
    .catch(error => console.error('Error fetching palettes.json:', error));
