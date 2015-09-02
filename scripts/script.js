/**
 * Created by jid on 11/03/15.
 */
function loadData()
{
    d3.csv("data/genrecount.csv", drawDataGenres);
    d3.csv("data/artists.csv", drawDataArtists);
    d3.csv("data/artistworld.csv", drawDataMap);
}

function drawDataGenres(data){
    console.log(data);

    var dataset = data;

    var min = d3.min(data, function(d){
        return parseInt(d.count);
    });

    var max = d3.max(data, function(d){
        return parseInt(d.count);
    });

    console.log(min);
    console.log(max);

    var visSVG = d3.select("#genres div")
        .append("svg")
        .attr("id", "svggenre");

    visSVG.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("id", function(d,i){
            return "rect_" + i;
        })
        .attr("x", function(d,i){
            return (i % 4) * 150;
        })
        .attr("y", function(d,i){
            return parseInt(i / 4) * 35;
        })
        .attr("width", 150)
        .attr("height",35)
        .style("stroke", "#000")
        .style("fill", function(d){
            return drawColor(d.count,min, max);
        })
        .on("mouseover", function(d){
            d3.selectAll("." + d.genre)
                .style("fill", "black")
                .style("color", "black");
        })
        .on("mouseout", function(d){
            d3.selectAll("." + d.genre)
                .style("fill", "white")
                .style("color", "white");
        })
    ;

    visSVG.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .attr("class", "textElement")
        .attr("id", function(d,i){
            return "text_" + i;
        })
        .text(function(d){
            return d.genre;
        })
        .attr("x", function(d,i){
            return (i % 4) * 150 + 75;
        })
        .attr("y", function(d,i){
            return parseInt(i / 4) * 35 + 20;
        })
        .attr("fill", "white")
        .attr("font-size", "12px")
        .attr("text-anchor", "middle");
}

function drawDataArtists(data){
    console.log(data);

    var dataset = data;

    var visSVG = d3.select("#names")
        .append("svg")
        .attr("id", "svgnames");

    visSVG.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .attr("class", function(d){
            return d.genre1 + " " + d.genre2 + " " + d.genre3;
        })
        .attr("id", function(d,i){
            return "textArtist_" + i;
        })
        .attr("x", function(d,i){
            return (i % 2) * 143;
        })
        .attr("y", function(d,i){
            return parseInt(i / 2) * 20 + 15;
        })
        .attr("width", 150)
        .attr("height",20)
        .text(function(d){
            return d.name;
        })
        .style("stroke", "#000")
        .style("fill", "white")
        .on("mouseover", function(d,i){
            d3.select("#image image")
                .attr("xlink:href", "images/" + d.id + ".jpg");

            d3.select("#circle_" + i)
                .style("opacity", 1)
                .style("z-index", 20)
                .style("fill", "url(#image)")
                .transition()
                .duration(400)
                .attr("r", 50);
        })
        .on("mouseout", function(d,i) {
            d3.select("#circle_" + i)
                .style("opacity", 0.5)
                .style("z-index", 0)
                .style("fill", "transparent")
                .transition()
                .duration(400)
                .attr("r", 5);
        })
    ;

}

function drawDataMap(data) {
    console.log(data);

    var dataset = data;

    d3.csv("data/artists.csv", function(d) {

        console.log(d);
        var dataset2 = d;

        var visSVG = d3.select("#map")
            .append("svg")
            .attr("id", "svgmap");

        visSVG.selectAll("circle")
            .data(dataset2)
            .enter()
            .append("svg:a")
            .attr("target", "_blank")
            .attr("xlink:href", function(d){
                return d.website;
            })
            .append("circle")
            .attr("id", function(d,i){
                return "circle_" + i;
            })
            .data(dataset)
            .attr("r", 5)
            .attr("cx", function(d){
                return d.x;
            })
            .attr("cy", function(d){
                return d.y;
            })
            .style("opacity", 0.5)
            .style("fill", "transparent")
            .style("stroke", "gray")
            .style("z-index", 0)
            .on("mouseover", function(d){
                d3.select("#image image")
                    .attr("xlink:href", "images/" + d.id + ".jpg");

                d3.select(this)
                    .style("opacity", 1)
                    .style("z-index", 20)
                    .style("fill", "url(#image)")
                    .transition()
                    .duration(400)
                    .attr("r", 50);
            })
            .on("mouseout", function(d,i) {
                    d3.select(this)
                        .style("opacity", 0.5)
                        .style("z-index", 0)
                        .style("fill", "transparent")
                        .transition()
                        .duration(400)
                        .attr("r", 5);
            });

    });




}

function drawColor(value, min, max){
    var parts = max - min;
    var increment = parseInt(255/parts);
    var hexString = (255 - increment * value).toString(16);
    return "#" + hexString + hexString + hexString;
}

function getData(data){
    return data;
}