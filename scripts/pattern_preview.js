// Spiral preview
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

// Hollow preview
function createHollowPreview(strings)
{
    // Define a tileable hollow preview (hollow_flex)
    // let hollow_flex = document.getElementById("hollow_flex");
    let hollow_flex = document.createElement("div");
    hollow_flex.classList.add("hollow_flex");
    let cells_in_width = Math.floor(strings / 2);

    let first_start_value = 4;
    let second_start_value = 3;
    let start_with_repeat = false;

    for (let i = 0; i < cells_in_width; i++) {
        let new_row = document.createElement("div");
        new_row.classList.add("hollow_row");

        for (let j = 0; j < cells_in_width; j++) {
            // Create cell
            let new_cell = document.createElement("div");
            new_cell.classList.add("hollow_cell");

            // Determine cell class
            let cell_class = 0;
            if (!start_with_repeat) { // Every other row
                if (j % 2 == 0) {
                    cell_class = (first_start_value + (first_start_value*j/2)) % strings;
                }
                else {
                    cell_class = (second_start_value - (4*(i/2))) % strings;
                    if (cell_class < 0) {
                        cell_class = strings + cell_class;
                    }
                }
            }
            else {
                if (j % 2 == 0) {
                    cell_class = (second_start_value - 2 - (4*((i-1)/2))) % strings;
                    if (cell_class < 0) {
                        cell_class = strings + cell_class;
                    }
                } else {
                    cell_class = (first_start_value + 2 + (first_start_value*(j-1)/2)) % strings;
                }
            }
            // new_cell.innerText = `${cell_class}`;
            new_cell.classList.add(`cell_${cell_class}`);
            
            // Add cell to preview
            new_row.appendChild(new_cell);
        }
        start_with_repeat = !start_with_repeat;
        hollow_flex.appendChild(new_row);
    }

    // Clone 3 more hollow tiles
    let tile2 = hollow_flex.cloneNode(true); // Deep copy
    let tile3 = hollow_flex.cloneNode(true); // Deep copy
    let tile4 = hollow_flex.cloneNode(true); // Deep copy

    let hollow_preview_row1 = document.createElement("div");
    hollow_preview_row1.classList.add("hollow_preview_row");
    hollow_preview_row1.appendChild(hollow_flex);
    hollow_preview_row1.appendChild(tile2);

    let hollow_preview_row2 = document.createElement("div");
    hollow_preview_row2.classList.add("hollow_preview_row");
    hollow_preview_row2.appendChild(tile3);
    hollow_preview_row2.appendChild(tile4);

    let big_flex = document.getElementById("hollow_preview_two_by_two");
    big_flex.appendChild(hollow_preview_row1);
    big_flex.appendChild(hollow_preview_row2);

    // Add the on-click event listeners to all cells
    for (let i = 0; i < strings; i++) {
        let class_cells = document.getElementsByClassName(`cell_${i}`);
        for (let cell of class_cells) {
            cell.addEventListener("click", function() {assignColorToCell(cell.classList[1])});
        }
    }

}

// Temp function to toggle between spiral and hollow preview
function swapStructure()
{}

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
    let curr_current_color = current_color; // Remember the current color
    for (let key of keys) { // cell_0, cell_1, ...
        current_color = class_colors[key];
        assignColorToCell(key);
    }
    // Reset current color
    current_color = curr_current_color;
}

// Adjusts the size of the class_colors dict to the number of strings, reusing previous assignments
function resizeClassColorsDict(prev_string_count, string_count) {
    let new_dict = {};
    for (let i = 0; i < string_count; i++)
    {
        if (i > prev_string_count-1) { // Adding new color slots, so default color
            new_dict[`cell_${i}`] = default_color;
        } 
        else { // Color slot already exists, so use it
            new_dict[`cell_${i}`] = class_colors[`cell_${i}`];
        }
    }

    class_colors =  new_dict; // Assign new dict
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
        resizeClassColorsDict(strings+4, strings);
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
        resizeClassColorsDict(strings-4, strings);
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
let default_color = "#99CCFF";

// Maps cell class name "cell_X" to color for that class
var class_colors = {};

// Define the positions of default flower pattern
let flower_pedals = [1, 2, 5, 7, 10, 11];
let flower_center = 6;

// Initialize the class_colors dict (each string gets the default color)
for (let i = 0; i < strings; i++)
{
    if (flower_pedals.includes(i)) {
        class_colors[`cell_${i}`] = "#FF3396";
    }
    else if (i == flower_center) {
        class_colors[`cell_${i}`] = "#FFEB3B";
    }
    else {
        class_colors[`cell_${i}`] = default_color;
    }
}

// window.onload = function() {
    createPatternPreview(columns, rows, cell_overlap, row_overlap, cell_width, strings);
    createHollowPreview(strings);

    // Adjust height and width of preview box to fit contents
    adjustPreviewBoxSize(cell_width, row_overlap, rows);
    
    // Create the default disk
    createDisk(strings);

    // Show default flower pattern
    assignClassColors();
// }