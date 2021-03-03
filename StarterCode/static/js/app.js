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
            marker: {
                color: 'rbg(124,142,195)'},
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
                t: 100,
                b: 100
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
            height: 500,
            width: 1200
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
// pull json
function getInfo(id) {
    d3.json("data/samples.json").then((data)=> {
        
        var metaData = data.metaData;

        console.log(metadata)

        var metaResult = metaData.filter(metaData => metaData.id.toString() === id)[0];


        var metaDemographic = d3.select("#sample-metadata");
        
        metaDemographic.html("");

        Object.entries(metaResult).forEach((key) => {   
                metaDemographic.append("h5").text(key[0].toUpperCase() + " : " + key[1] + "\n");    
        });
    });
}

function init() {
    var down = d3.select("#selDataset");

    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name) {
            down.append("option").text(name).property("value");
        });

        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();