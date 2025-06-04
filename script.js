
function makeColorGrid(color_list) {
    let color_grid_container = document.getElementById("color_grid_container");

    for (let i = 0; i < color_list.length; i++) { // For group of colors
        let row = document.createElement("div");
        row.classList.add("color_grid_row");
        for (let j = 0; j < color_list[i].length; j++) { // Color in group
            let new_color = document.createElement("div");
            new_color.classList.add("color");
            new_color.style.backgroundColor = color_list[i][j];
            row.appendChild(new_color);
        }
        color_grid_container.appendChild(row);
    }
}

const color_list = [
    /* Reds */ [
      "#FFC1C1", "#FF8A8A", "#FF5C5C", "#FF3232", "#E60000", "#B20000"
    ],
    /* Oranges */ [
      "#FFE0B2", "#FFBC80", "#FFA347", "#FF8800", "#E67300", "#B25900"
    ],
    /* Yellows */ [
      "#FFFACD", "#FFF176", "#FFEB3B", "#FFD700", "#E6C200", "#B2A100"
    ],
    /* Greens */ [
      "#CCFFCC", "#99FF99", "#66FF66", "#33CC33", "#009900", "#006600"
    ],
    /* Blues */ [
      "#CCE5FF", "#99CCFF", "#66B2FF", "#3399FF", "#0066CC", "#004C99"
    ],
    /* Indigo */ [
      "#E0D6FF", "#C2B0FF", "#A58BFF", "#7F5FFF", "#5A3DCC", "#3A2599"
    ],
    /* Violets */ [
      "#F3D1FF", "#E4A9FF", "#D580FF", "#B94DFF", "#9300FF", "#6A0099"
    ],
    /* Pinks */ [
      "#FFD6EC", "#FFADD6", "#FF85C1", "#FF5CAB", "#FF3396", "#FF0A80"
    ],
    /* Greys */ [
      "#FFFFFF", "#D9D9D9", "#BFBFBF", "#808080", "#404040", "#000000"
    ],
    /* Skin Tones */ [
      "#FFE0C1", "#F1C27D", "#E0AC69", "#C68642", "#8D5524", "#5C3A1C"
    ]
  ];
makeColorGrid(color_list);
