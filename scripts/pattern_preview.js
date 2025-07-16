function createPatternPreview(columns, rows, cell_overlap, row_overlap, cell_width, strings) {
    let preview_section = document.getElementById("pattern_preview");
    strings /= 4;

    // Make a list of class numbers to be assigned to each cell in preview
    let color_class_values = [];
    for (let i = 0; i < 4; i++) {
        let row = [];
        for (let j = 0; j < strings; j++) {
            row.push(i*strings + j);
        }
        color_class_values.push(row);
    }

    let curr_row_flipflop = 0;
    let start_color_offset = -1;
    for (let i = 0; i < rows; i++) {
        let start_class_row = i % 4;

        // Groups rows into pairs
        curr_row_flipflop = i % 2;
        if (curr_row_flipflop == 0) { start_color_offset += 1; }
        start_class_row -= Math.floor(start_color_offset/strings);
        start_class_row %= 4;
        if (start_class_row < 0) { start_class_row = 4+start_class_row; }

        // Create the row
        let new_row = document.createElement("div");
        new_row.classList.add("preview_row");
        new_row.style.top = cell_width*i + - row_overlap*i + 'px';
        new_row.style.zIndex = i;
        new_row.style.width = ((cell_width - cell_overlap) * (columns - 1) + cell_width) + 'px';

        // Create cells in row
        let curr_class_row = start_class_row;
        for (let j = 0; j < columns; j++) {
            let new_cell = document.createElement("div");
            new_cell.classList.add("preview_cell");
            new_cell.style.left = cell_width*j - cell_overlap*j + 'px';
            new_cell.style.zIndex = j;

            let cell_to_access = ((j+start_color_offset) % strings);
            if ((cell_to_access == 0) && j != 0) {
                curr_class_row -= 1;
            }
        
            if (curr_class_row == -1) {curr_class_row = 4 - 1;}
            let class_num = color_class_values[curr_class_row][cell_to_access];
            // new_cell.innerText = class_num;
            let class_name = `cell_${class_num}`;
            new_cell.classList.add(class_name);
            new_cell.addEventListener("click", function() {assignColorToCell(class_name)});

            new_row.appendChild(new_cell);
        }
        preview_section.appendChild(new_row);
    }

    let row_width = document.getElementsByClassName("preview_row")[0].style.width;
    preview_section.style.width = row_width;
    // preview_section.style.height = "20px";
}

function adjustPreviewBoxSize(cell_width, row_overlap, rows) {
    let preview_box = document.getElementById("pattern_preview");

    // Calculate height
    let new_height;
    if (rows % 2 == 0) {
        new_height = (cell_width*rows/2) + ((rows/2) - 1)*(cell_width-(2*row_overlap)) + (cell_width-row_overlap);
    } else {
        new_height = (cell_width*Math.ceil(rows/2)) + Math.floor(rows/2)*(cell_width-(2*row_overlap));
    }
    preview_box.style.height = new_height + 'px';
}

// Assigns the chosen color to the selected cell and all of its classmates
function assignColorToCell(class_name) {
    let cells = document.getElementsByClassName(class_name);
    for (cell of cells) {
        cell.style.backgroundColor = current_color;
    }

    // Assign color to class_color dict
    class_colors[class_name] = current_color;
}

// Assigns the colors in the class_color dict to their given classes
function assignClassColors() {
    const keys = Object.keys(class_colors);
    console.log(class_colors);
    console.log(`Keys: ${keys}`);
    let curr_current_color = current_color; // Remember the current color
    for (let key of keys) { // cell_0, cell_1, ...
        current_color = class_colors[key];
        console.log(key);
        assignColorToCell(key);
    }
    // Reset current color
    current_color = curr_current_color;
}

// Minimum strings: 8
function removeStrings() {
    if (strings > 8) {
        strings -= 4;
        let preview_section = document.getElementById("pattern_preview");
        preview_section.innerHTML = "";
        createPatternPreview(columns, rows, cell_overlap, row_overlap, cell_width, strings);
        createDisk(strings);
        let string_display = document.getElementById("string_count");
        string_display.innerText = strings;
        assignClassColors();
    }
}

// Maximum strings: 40
function addStrings() {
    if (strings < 40) {
        strings += 4;
        let preview_section = document.getElementById("pattern_preview");
        preview_section.innerHTML = "";
        createPatternPreview(columns, rows, cell_overlap, row_overlap, cell_width, strings);
        createDisk(strings);
        let string_display = document.getElementById("string_count");
        string_display.innerText = strings;
        assignClassColors();
    }
}

let styles = window.getComputedStyle(document.body);

var cell_width = Number(styles.getPropertyValue('--preview_cell_width').slice(0,-2));
var cell_overlap = Number(styles.getPropertyValue('--cell_overlap').slice(0,-2));
var row_overlap = Number(styles.getPropertyValue('--row_overlap').slice(0,-2));
let columns = 8;
let rows = 15;
let strings = 16; // The number of pairs placed around the disc (16 is standard) (+/-4)

// Maps cell class name "cell_X" to color for that class
var class_colors = { // deafult: flower pattern
    "cell_1": "#FF3396",
    "cell_10": "#FF3396",
    "cell_11": "#FF3396",
    "cell_2": "#FF3396",
    "cell_5": "#FF3396",
    "cell_6": "#FFEB3B",
    "cell_7": "#FF3396"
}

window.onload = function() {
    createPatternPreview(columns, rows, cell_overlap, row_overlap, cell_width, strings);

    // Adjust height and width of preview box to fit contents
    adjustPreviewBoxSize(cell_width, row_overlap, rows);
    
    // Create the default disk
    createDisk(strings);

    // Show default flower pattern
    assignClassColors();
}