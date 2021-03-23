function buildMetadata(sample) {
    console.log(sample);
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        console.log(metadata);
        var resultsarray = metadata.filter(sampleobject => sampleobject.id == sample);
        console.log(resultsarray);
        var result = resultsarray[0];
        console.log(result);
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);
        });
    });
}

