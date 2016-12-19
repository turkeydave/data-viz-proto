
// helper for test chart
function sinAndCos() {
    var sin = [],sin2 = [],
        cos = [];

    //Data is represented as an array of {x,y} pairs.
    for (var i = 0; i < 100; i++) {
        sin.push({x: i, y: Math.sin(i/10)});
        sin2.push({x: i, y: Math.sin(i/10) *0.25 + 0.5});
        cos.push({x: i, y: .5 * Math.cos(i/10)});
    }

    //Line chart data should be sent as an array of series objects.
    return [
        {
            values: sin,      //values - represents the array of {x,y} data points
            key: 'Sine Wave', //key  - the name of the series.
            color: '#ff7f0e'  //color - optional: choose your own line color.
        },
        {
            values: cos,
            key: 'Cosine Wave',
            color: '#2ca02c'
        },
        {
            values: sin2,
            key: 'Another sine wave',
            color: '#7777ff',
            area: true      //area - set to true if you want this line to turn into a filled area chart.
        }
    ];
}

var SinChart = {
    makeChart : function(){
        var chart;
        var data;

        nv.addGraph(function() {
            chart = nv.models.lineChart()
                .margin({left:30})  //Adjust chart margins to give the x-axis some breathing room.
                .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true)        //Show the x-axis
            ;

            chart.xAxis     //Chart x-axis settings
                .axisLabel('Time (ms)')
                .tickFormat(d3.format(',r'));

            chart.yAxis     //Chart y-axis settings
                .axisLabel('Voltage (v)')
                .tickFormat(d3.format('.02f'));

            /* Done setting the chart up? Time to render it!*/
            data = sinAndCos();   //You need data...

            d3.select('#divLineChart svg')    //Select the <svg> element you want to render the chart in.
                .datum(data)         //Populate the <svg> element with chart data...
                .call(chart);          //Finally, render the chart!

            //Update the chart when window resizes.
            //nv.utils.windowResize(function() { chart.update() });
            return chart;
        });

    }
};

var MembersChart = {
    makeChart : function(){

        var testdata = [
            {key: "Prospects", y: 5},
            {key: "New", y: 22},
            {key: "At Risk", y: 9},
            {key: "Cancelled", y: 7}
        ];
        var height = 350;
        var width = 350;
        var chart1;
        nv.addGraph(function() {
            var chart1 = nv.models.pieChart()
                .x(function(d) { return d.key })
                .y(function(d) { return d.y })
                .donut(true)
                .width(width)
                .height(height)
                .padAngle(.08)
                .cornerRadius(5)
                .id('donut1'); // allow custom CSS for this one svg
            chart1.title("Members");
            chart1.pie.donutLabelsOutside(true).donut(true);
            d3.select("#divInnerMemberDoughnutChart svg")
                .datum(testdata)
                .transition().duration(1200)
                .call(chart1);
            // LISTEN TO WINDOW RESIZE
            // nv.utils.windowResize(chart1.update);
            // LISTEN TO CLICK EVENTS ON SLICES OF THE PIE/DONUT
            // chart.pie.dispatch.on('elementClick', function() {
            //     code...
            // });
            // chart.pie.dispatch.on('chartClick', function() {
            //     code...
            // });
            // LISTEN TO DOUBLECLICK EVENTS ON SLICES OF THE PIE/DONUT
            // chart.pie.dispatch.on('elementDblClick', function() {
            //     code...
            // });
            // LISTEN TO THE renderEnd EVENT OF THE PIE/DONUT
            // chart.pie.dispatch.on('renderEnd', function() {
            //     code...
            // });
            // OTHER EVENTS DISPATCHED BY THE PIE INCLUDE: elementMouseover, elementMouseout, elementMousemove
            // @see nv.models.pie
            return chart1;
        });

    }
};

var MembersChartNumbers = {
    makeChart : function(id){

        var testdata = [
            {key: "Prospects", y: 5},
            {key: "New", y: 22},
            {key: "At Risk", y: 9},
            {key: "Cancelled", y: 7}
        ];
        var html = "<div style='position:relative'>";
            html += "<div style='width:100%; position:absolute; top:0px; text-align:center; color: #FFF'>Members Summary</div>";
            html += "<div style='width:50%; position:absolute; top:35px; left: 0px; text-align:center; color: #008000;'><div>PROSPECTS</div><div style='font-size:48pt;'>5</div></div>";
            html += "<div style='width:50%; position:absolute; top:35px; left: 50%; text-align:center; color: #5EC0E8;'><div>NEW</div><div style='font-size:48pt;'>22</div></div>";
            html += "<div style='width:50%; position:absolute; top:200px; left: 0px; text-align:center; color: #EA6060;'><div>AT RISK</div><div style='font-size:48pt;'>9</div></div>";
            html += "<div style='width:50%; position:absolute; top:200px; left: 50%; text-align:center; color: #FFA500;'><div>CANCELLED</div><div style='font-size:48pt;'>7</div></div>";
        html += "</div>";

        $('#' + id).html(html);
    }
};

var MembershipsChart = {
    makeChart : function(){

        var testdata = [
            {key: "Yearly WOT", y: 5},
            {key: "20 Cycling Punch", y: 22},
            {key: "Hot Yoga Monthly", y: 9},
            {key: "Sweet WOD Forever", y: 7}
        ];
        var height = 350;
        var width = 350;
        var chart2;
        nv.addGraph(function() {
            var chart2 = nv.models.pieChart()
                .x(function(d) { return d.key })
                .y(function(d) { return d.y })
                //.labelThreshold(.08)
                .showLabels(false)
                .color(d3.scale.category20().range().slice(10))
                .width(width)
                .height(height)
                .donut(true)
                .id('donut2')
                .titleOffset(-10)
                .title("Memberships");
            // MAKES IT HALF CIRCLE
            chart2.pie
                .startAngle(function(d) { return d.startAngle/2 -Math.PI/2 })
                .endAngle(function(d) { return d.endAngle/2 -Math.PI/2 });
            d3.select("#tileInnerMembershipPie svg")
            //.datum(historicalBarChart)
                .datum(testdata)
                .transition().duration(1200)
                .call(chart2);
            return chart2;
        });

    }
};

var ClassMetricsLineChart = {
    makeChart : function(){
        // used for nice labels on x-axis (see tick format function)
        var monthNames = [];
        monthNames.push({val: "Jan"});
        monthNames.push({val: "Feb"});
        monthNames.push({val: "Mar"});
        monthNames.push({val: "Apr"});
        monthNames.push({val: "May"});
        monthNames.push({val: "Jun"});
        monthNames.push({val: "Jul"});
        monthNames.push({val: "Aug"});
        monthNames.push({val: "Sept"});
        monthNames.push({val: "Oct"});
        monthNames.push({val: "Nov"});
        monthNames.push({val: "Dec"});
        monthNames.push({val: "Tot"});

        var attData = [], rezyData = [];
        // jan
        attData.push({x: 0, y: 0});
        rezyData.push({x: 0, y: 0});
        // feb
        attData.push({x: 1, y: 0});
        rezyData.push({x: 1, y: 0});
        // mar
        attData.push({x: 2, y: 0});
        rezyData.push({x: 2, y: 0});
        // apr
        attData.push({x: 3, y: 0});
        rezyData.push({x: 3, y: 0});
        // mauy
        attData.push({x: 4, y: 0});
        rezyData.push({x: 4, y: 0});
        // jun
        attData.push({x: 5, y: 0});
        rezyData.push({x: 5, y: 0});
        // jul
        attData.push({x: 6, y: 0});
        rezyData.push({x: 6, y: 0});
        // aug
        attData.push({x: 7, y: 0});
        rezyData.push({x: 7, y: 0});
        // sept
        attData.push({x: 8, y: 0});
        rezyData.push({x: 8, y: 0});
        // oct
        attData.push({x: 9, y: 0});
        rezyData.push({x: 9, y: 0});
        // nov
        attData.push({x: 10, y: 0});
        rezyData.push({x: 10, y: 0});
        // dec
        attData.push({x: 11, y: 0});
        rezyData.push({x: 11, y: 0});
        // tot
        attData.push({x: 12, y: 0});
        rezyData.push({x: 12, y: 0});

        var jqxhr = $.get( "http://192.168.49.140:5102/api/warehouse/EE0DB82E-F1C3-4FC6-9976-8852F3F52D33/2016", function(data) {
            if(data.January !== undefined){
                attData[0].y = data.January.Fact_Attendance_Count;
                rezyData[0].y = data.January.Fact_Reservation_Count;
            }
            if(data.February !== undefined){
                attData[1].y = data.February.Fact_Attendance_Count;
                rezyData[1].y = data.February.Fact_Reservation_Count;
            }
            if(data.March !== undefined){
                attData[2].y = data.March.Fact_Attendance_Count;
                rezyData[2].y = data.March.Fact_Reservation_Count;
            }
            if(data.April !== undefined){
                attData[3].y = data.April.Fact_Attendance_Count;
                rezyData[3].y = data.April.Fact_Reservation_Count;
            }
            if(data.May !== undefined){
                attData[4].y = data.May.Fact_Attendance_Count;
                rezyData[4].y = data.May.Fact_Reservation_Count;
            }
            if(data.June !== undefined){
                attData[5].y = data.June.Fact_Attendance_Count;
                rezyData[5].y = data.June.Fact_Reservation_Count;
            }
            if(data.July !== undefined){
                attData[6].y = data.July.Fact_Attendance_Count;
                rezyData[6].y = data.July.Fact_Reservation_Count;
            }
            if(data.August !== undefined){
                attData[7].y = data.August.Fact_Attendance_Count;
                rezyData[7].y = data.August.Fact_Reservation_Count;
            }
            if(data.September !== undefined){
                attData[8].y = data.September.Fact_Attendance_Count;
                rezyData[8].y = data.September.Fact_Reservation_Count;
            }
            if(data.October !== undefined){
                attData[9].y = data.October.Fact_Attendance_Count;
                rezyData[9].y = data.October.Fact_Reservation_Count;
            }
            if(data.November !== undefined){
                attData[10].y = data.November.Fact_Attendance_Count;
                rezyData[10].y = data.November.Fact_Reservation_Count;
            }
            if(data.December !== undefined){
                attData[11].y = data.December.Fact_Attendance_Count;
                rezyData[11].y = data.December.Fact_Reservation_Count;
            }
            if(data.All !== undefined){
                attData[12].y = data.All.Fact_Attendance_Count;
                rezyData[12].y = data.All.Fact_Reservation_Count;
            }

            //Line chart data should be sent as an array of series objects.
            var chartData = [
                {
                    values: attData,      //values - represents the array of {x,y} data points
                    key: 'Attendance Count', //key  - the name of the series.
                    color: '#ff7f0e'  //color - optional: choose your own line color.
                },
                {
                    values: rezyData,
                    key: 'Reservation Count',
                    color: '#2ca02c'
                }
            ];


            /*These lines are all chart setup.  Pick and choose which chart features you want to utilize. */
            nv.addGraph(function() {
                var chart = nv.models.lineChart()
                        .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                        .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                        .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                        .showYAxis(true)        //Show the y-axis
                        .showXAxis(true)        //Show the x-axis
                    ;

                chart.xAxis     //Chart x-axis settings
                    .axisLabel('Months')
                    .tickValues([0,1,2,3,4,5,6,7,8,9,10,11,12])
                    .tickFormat(function(d) {
                        return monthNames[d].val;
                    });
                //.tickFormat(d3.format('s'));

                chart.yAxis     //Chart y-axis settings
                    .axisLabel('Count');
                //.tickFormat(d3.format('.02f'));

                // /* Done setting the chart up? Time to render it!*/
                // var myData = sinAndCos();   //You need data...

                d3.select('#divInnerClassMetricsChart svg')    //Select the <svg> element you want to render the chart in.
                    .datum(chartData)         //Populate the <svg> element with chart data...
                    .call(chart);          //Finally, render the chart!

                //Update the chart when window resizes.
                //nv.utils.windowResize(function() { chart.update() });
                return chart;
            });

        })
            .done(function() {
                //alert( "second success" );
            })
            .fail(function() {
                alert( "error" );
            });
        // .always(function() {
        //     alert( "finished" );
        // });

    }
};

var ClassMetricsBarChart = {
    makeChart : function(){
        // used for nice labels on x-axis (see tick format function)
        var monthNames = [];
        monthNames.push({val: "Jan"});
        monthNames.push({val: "Feb"});
        monthNames.push({val: "Mar"});
        monthNames.push({val: "Apr"});
        monthNames.push({val: "May"});
        monthNames.push({val: "Jun"});
        monthNames.push({val: "Jul"});
        monthNames.push({val: "Aug"});
        monthNames.push({val: "Sept"});
        monthNames.push({val: "Oct"});
        monthNames.push({val: "Nov"});
        monthNames.push({val: "Dec"});
        monthNames.push({val: "Tot"});

        var attData = [], rezyData = [];
        // jan
        attData.push({x: 0, y: 0});
        rezyData.push({x: 0, y: 0});
        // feb
        attData.push({x: 1, y: 0});
        rezyData.push({x: 1, y: 0});
        // mar
        attData.push({x: 2, y: 0});
        rezyData.push({x: 2, y: 0});
        // apr
        attData.push({x: 3, y: 0});
        rezyData.push({x: 3, y: 0});
        // mauy
        attData.push({x: 4, y: 0});
        rezyData.push({x: 4, y: 0});
        // jun
        attData.push({x: 5, y: 0});
        rezyData.push({x: 5, y: 0});
        // jul
        attData.push({x: 6, y: 0});
        rezyData.push({x: 6, y: 0});
        // aug
        attData.push({x: 7, y: 0});
        rezyData.push({x: 7, y: 0});
        // sept
        attData.push({x: 8, y: 0});
        rezyData.push({x: 8, y: 0});
        // oct
        attData.push({x: 9, y: 0});
        rezyData.push({x: 9, y: 0});
        // nov
        attData.push({x: 10, y: 0});
        rezyData.push({x: 10, y: 0});
        // dec
        attData.push({x: 11, y: 0});
        rezyData.push({x: 11, y: 0});
        // tot
        attData.push({x: 12, y: 0});
        rezyData.push({x: 12, y: 0});

        var jqxhr = $.get( "http://192.168.49.140:5102/api/warehouse/EE0DB82E-F1C3-4FC6-9976-8852F3F52D33/2016", function(data) {
            if(data.January !== undefined){
                attData[0].y = data.January.Fact_Attendance_Count;
                rezyData[0].y = data.January.Fact_Reservation_Count;
            }
            if(data.February !== undefined){
                attData[1].y = data.February.Fact_Attendance_Count;
                rezyData[1].y = data.February.Fact_Reservation_Count;
            }
            if(data.March !== undefined){
                attData[2].y = data.March.Fact_Attendance_Count;
                rezyData[2].y = data.March.Fact_Reservation_Count;
            }
            if(data.April !== undefined){
                attData[3].y = data.April.Fact_Attendance_Count;
                rezyData[3].y = data.April.Fact_Reservation_Count;
            }
            if(data.May !== undefined){
                attData[4].y = data.May.Fact_Attendance_Count;
                rezyData[4].y = data.May.Fact_Reservation_Count;
            }
            if(data.June !== undefined){
                attData[5].y = data.June.Fact_Attendance_Count;
                rezyData[5].y = data.June.Fact_Reservation_Count;
            }
            if(data.July !== undefined){
                attData[6].y = data.July.Fact_Attendance_Count;
                rezyData[6].y = data.July.Fact_Reservation_Count;
            }
            if(data.August !== undefined){
                attData[7].y = data.August.Fact_Attendance_Count;
                rezyData[7].y = data.August.Fact_Reservation_Count;
            }
            if(data.September !== undefined){
                attData[8].y = data.September.Fact_Attendance_Count;
                rezyData[8].y = data.September.Fact_Reservation_Count;
            }
            if(data.October !== undefined){
                attData[9].y = data.October.Fact_Attendance_Count;
                rezyData[9].y = data.October.Fact_Reservation_Count;
            }
            if(data.November !== undefined){
                attData[10].y = data.November.Fact_Attendance_Count;
                rezyData[10].y = data.November.Fact_Reservation_Count;
            }
            if(data.December !== undefined){
                attData[11].y = data.December.Fact_Attendance_Count;
                rezyData[11].y = data.December.Fact_Reservation_Count;
            }
            if(data.All !== undefined){
                attData[12].y = data.All.Fact_Attendance_Count;
                rezyData[12].y = data.All.Fact_Reservation_Count;
            }

            //Line chart data should be sent as an array of series objects.
            var chartData = [
                {
                    values: attData,      //values - represents the array of {x,y} data points
                    key: 'Attendance Count', //key  - the name of the series.
                    color: '#ff7f0e'  //color - optional: choose your own line color.
                },
                {
                    values: rezyData,
                    key: 'Reservation Count',
                    color: '#2ca02c'
                }
            ];


            /*These lines are all chart setup.  Pick and choose which chart features you want to utilize. */
            nv.addGraph(function() {
                var chart = nv.models.multiBarChart()
                        .barColor(d3.scale.category20().range())
                        .duration(300)
                        .margin({bottom: 100, left: 100})
                    //.rotateLabels(45)
                    //.groupSpacing(0.1)
                    ;

                chart.xAxis     //Chart x-axis settings
                    .axisLabel('Months')
                    .tickValues([0,1,2,3,4,5,6,7,8,9,10,11,12])
                    .tickFormat(function(d) {
                        return monthNames[d].val;
                    });
                //.tickFormat(d3.format('s'));

                chart.yAxis     //Chart y-axis settings
                    .axisLabel('Count');
                //.tickFormat(d3.format('.02f'));

                // /* Done setting the chart up? Time to render it!*/
                // var myData = sinAndCos();   //You need data...

                d3.select('#divInnerClassMetricsBarChart svg')    //Select the <svg> element you want to render the chart in.
                    .datum(chartData)         //Populate the <svg> element with chart data...
                    .call(chart);          //Finally, render the chart!

                //Update the chart when window resizes.
                //nv.utils.windowResize(function() { chart.update() });
                return chart;
            });

        })
            .done(function() {
                //alert( "second success" );
            })
            .fail(function() {
                alert( "error" );
            });
        // .always(function() {
        //     alert( "finished" );
        // });

    }
};
