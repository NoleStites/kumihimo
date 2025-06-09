function createPatternPreview(columns, rows, cell_overlap, row_overlap, strings) {
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
        new_row.style.top = -row_overlap * i + 'px';
        new_row.style.zIndex = i;

        // Create cells in row
        let curr_class_row = start_class_row;
        for (let j = 0; j < columns; j++) {
            let new_cell = document.createElement("div");
            new_cell.classList.add("preview_cell");
            new_cell.style.right = cell_overlap*j + 'px';
            new_cell.style.zIndex = j;

            let cell_to_access = ((j+start_color_offset) % strings);
            if ((cell_to_access == 0) && j != 0) {
                curr_class_row -= 1;
            }
        
            if (curr_class_row == -1) {curr_class_row = 4 - 1;}
            let class_num = color_class_values[curr_class_row][cell_to_access];
            new_cell.innerText = class_num;
            new_cell.classList.add(`cell_${class_num}`);

            new_row.appendChild(new_cell);
        }
        preview_section.appendChild(new_row);
    }
}

let styles = window.getComputedStyle(document.body);

let cell_overlap = Number(styles.getPropertyValue('--cell_overlap').slice(0,-2));
let row_overlap = 15;
let columns = 8;
let rows = 15;
let strings = 16; // The number of pairs placed around the disc (16 is standard) (+/-4)
createPatternPreview(columns, rows, cell_overlap, row_overlap, strings);

// 16 => 4x4
// 12 => 3x4
// 8 => 2x4