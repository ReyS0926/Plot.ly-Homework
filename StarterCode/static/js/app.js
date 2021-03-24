function createMetadata(sample) {
    console.log(sample);
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        console.log(metadata);
        var resultsarray = metadata.filter(sampleobject => sampleobject.id == sample);
        console.log(resultsarray);
        var result = resultsarray[0];
        console.log(result);
        var demographic = d3.select("#sample-metadata");
        demographic.html("");
        Object.entries(result).forEach(([key, value]) => {
            demographic.append("h5").text(`${key}: ${value}`);
        });
    });
}


function createCharts(sample) {
   
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultsarray = samples.filter(sampleobject => sampleobject.id == sample);
        var result = resultsarray[0]

        var ids = result.otu_ids;
        var labels = result.otu_labels;
        var values = result.sample_values;


        //Bar chart
        var barData = [
            {
                y: ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
                x: values.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h"
                
                
            }
        ];
        
        var barLayout = {
            title: "Top 10 Bacteria Cultured",
            margin: { t: 30, l:150}
        };
        
        Plotly.newPlot("bar", barData, barLayout);
        
        //Bubble Chart
        
        var layout = {
            margin: { t: 0},
            xaxis: { title: "IDs"},
            hovermode: "closest",
        };

        var data = [
            {
                x: ids,
                y: values,
                text: labels,
                mode: "markers",
                marker: {
                    color: ids,
                    size: values,
                }
            }
        ];

        Plotly.plot("bubble", data, layout);
    });
}

function optionChanged(id) {
    createCharts(id);
    createMetadata(id);
}


function init() {

    var dropdown = d3.select("#selDataset");
    
        
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            
            data.names.forEach(function(name) {
                dropdown
                    .append("option")
                    .text(name)
                    .property("value");
            });
    
            
            buildgraph(data.names[0]);
            getDemoInfo(data.names[0]);

        });
    }

init();