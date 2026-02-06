// Toggles the visibility of the disk panel
function toggleDisk() {
    let disk_mask = document.getElementById("disk_mask");
    disk_mask.classList.toggle("flex");
}

// Function to create and position segments
function createDisk(strings) {
    const kumihimoDisk = document.getElementById('disk');
    kumihimoDisk.innerHTML = "";
    const numSegments = strings/2;
    const segments = []; // To store references to the segment elements
    
    const angleStep = 360 / numSegments; // Angle between each segment in degrees

    // Adjust the size of each segment depending on the number of strings wanted
    let width = 20;
    switch (strings) {
        case 8:
          width = 50;
          break;
        case 12:
          width = 35;
          break;
        case 16:
            width = 25;
            break;
        case 20:
            width = 20;
            break;
        case 24:
            width = 17;
            break;
        case 28:
            width = 15;
            break;
        case 32:
            width = 13;
            break;
        case 36:
            width = 12;
            break;
        case 40:
            width = 10;
            break;
        default:
            width = 20;
    }
    const rootElement = document.documentElement;
    rootElement.style.setProperty('--segment-width', `${width}%`);


    let quarter = strings/4;
    let prev_class = -1;
    for (let i = 0; i < numSegments; i++) {
        if (i == quarter) {
            prev_class = (strings-quarter) - (quarter+1);
        }

        // First sub-segment
        let seg1 = document.createElement('div');
        seg1.classList.add('subsegment');

        let next_class = prev_class + quarter + 1;
        seg1.classList.add(`cell_${next_class}`);
        seg1.addEventListener("click", function() {assignColorToCell(seg1.classList[1])});
        prev_class = next_class;

        seg1.dataset.segmentIndex = 2*i; // Store the index for easy reference

        // Second sub-segment
        let seg2 = document.createElement('div');
        seg2.classList.add('subsegment');

        next_class = prev_class - quarter;
        seg2.classList.add(`cell_${next_class}`);
        seg2.addEventListener("click", function() {assignColorToCell(seg2.classList[1])});
        prev_class = next_class;

        seg2.dataset.segmentIndex = 2*i + 1; // Store the index for easy reference

        // Super segment (contains sub-segments)
        let supersegment = document.createElement('div');
        supersegment.classList.add('supersegment');
        supersegment.appendChild(seg1);
        supersegment.appendChild(seg2);
        supersegment.dataset.segmentIndex = i; // Store the index for easy reference
        segments.push(supersegment);

        // Calculate the rotation for each segment
        const rotationAngle = i*angleStep;
        supersegment.style.transform = `rotate(${rotationAngle}deg)`;

        kumihimoDisk.appendChild(supersegment);
    }
}