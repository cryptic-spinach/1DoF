function download() {
    const file = new File([mouseRecording.join("\n")], 'mouse-recording.csv', {
        type: 'text/csv',
    });

    const link = document.createElement('a');
    const url = URL.createObjectURL(file);

    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}
