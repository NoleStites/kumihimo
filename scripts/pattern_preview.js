function createPatternPreview(columns, rows, cell_overlap, row_overlap, strings) {
    let preview_section = document.getElementById("pattern_preview");
    
    let colors = ['red', 'green', 'blue', 'yellow'];
    let color_index = 0;
    // console.log(colors.at(-9 % strings));

    let curr_row_flipflop = 0;
    let start_color_amount = 5;
    for (let i = 0; i < rows; i++) {
        curr_row_flipflop = i % 2;
        if (curr_row_flipflop == 0) { // Groups rows into pairs
            start_color_amount -= 1;
            if (start_color_amount == 0) {start_color_amount = 4;}
        }
        console.log(start_color_amount);
        let new_row = document.createElement("div");
        new_row.classList.add("preview_row");
        new_row.style.top = -row_overlap * i + 'px';
        new_row.style.zIndex = i;
        for (let j = 0; j < columns; j++) {
            let new_cell = document.createElement("div");
            new_cell.classList.add("preview_cell");
            new_cell.style.right = cell_overlap*j + 'px';
            new_cell.style.zIndex = j;
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
let strings = 4;
createPatternPreview(columns, rows, cell_overlap, row_overlap, strings);