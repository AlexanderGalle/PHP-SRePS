export default function exportCSV(filename : String, titles : String[], lines : String[][]) {
    var formatCSV = "";
    
    // Field Titles:
    for (var i=0; i<titles.length; i++) {
        formatCSV += titles[i];
        if (i != titles.length-1)
            formatCSV += ",";
    }
    formatCSV += "\n";

    // Lines
    for (var i=0; i<lines.length; i++) {
        for (var j=0; j<lines[i].length; j++) {
            formatCSV += lines[i][j];
            if (j != titles.length-1)
                formatCSV += ",";
        }
        formatCSV += "\n";
    }

    // Create and Downoad CSV file
    const element = document.createElement("a");
    const file = new Blob([formatCSV], {type: 'text/csv'});
    element.href = URL.createObjectURL(file);
    element.download = filename + ".csv";
    document.body.appendChild(element);
    element.click();
}
