export default function exportCSV() {
    const element = document.createElement("a");
    const file = new Blob(["hello,world,123"], {type: 'text/csv'});
    element.href = URL.createObjectURL(file);
    element.download = "myCSV" + ".csv";
    document.body.appendChild(element);
    element.click();
}
