function getPlot(id) {
    
    // get data from json file
    d3.json("StarterCode/samples.json").then((data)=> {
        console.log(data)
// step 1
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wfreq}`)

        var samples = data.samples.filter(s => s.id.toString() === id)[0];

        console.log(samples);

        var sampleValues = samples.sample_values.slice(0, 10).reverse();

        var idValues = (samples.otu_ids.slice(0, 10)).reverse();
        
        var idOtu = idValues.map(d => "OTU " + d)

        console.log(`OTU IDS: ${idOtu}`)

        var labels = samples.otu_labels.slice(0, 10);

        console.log(`Sample Values: ${sampleValues}`)
        console.log(`Id Values: ${idValues}`)

        
        // start trace
        var trace = {
            x: sampleValues,
            y: idOtu,
            text: labels,
            type:"bar",
            orientation: "h",
        };

        var data = [trace];

        
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 30,
                b: 20
            }
        };

        //  bar plot
        Plotly.newPlot("bar", data, layout);

        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels

        };

        var layout = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1300
        };

        var data1 = [trace1];

        Plotly.newPlot("bubble", data1, layout); 

        //  pie chart
        var tracePie = {
            labels: idOtu,
            values:sampleValues,
            type:"pie",
        }

        var data = [tracePie]
        
        
        Plotly.newPlot("gauge", data)

    });    
}
function getInfo(id) {
    d3.json("data/samples.json").then((data)=> {
        
        var metadata = data.metadata;

        console.log(metadata)

        var result = metadata.filter(meta => meta.id.toString() === id)[0];


        var demographic = d3.select("#sample-metadata");
        
        demographic.html("");

        Object.entries(result).forEach((key) => {   
                demographic.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();