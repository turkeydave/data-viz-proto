
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

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var noBackendData = function() {
    var data = {};
    data.January = {};
    data.January.Fact_Attendance_Count = getRandomIntInclusive(0, 50);
    data.January.Fact_Reservation_Count = getRandomIntInclusive(0, 50);
    data.February = {};
    data.February.Fact_Attendance_Count = getRandomIntInclusive(0, 50);
    data.February.Fact_Reservation_Count = getRandomIntInclusive(0, 50);
    data.March = {};
    data.March.Fact_Attendance_Count = getRandomIntInclusive(0, 50);
    data.March.Fact_Reservation_Count = getRandomIntInclusive(0, 50);
    data.April = {};
    data.April.Fact_Attendance_Count = getRandomIntInclusive(0, 50);
    data.April.Fact_Reservation_Count = getRandomIntInclusive(0, 50);
    data.May = {};
    data.May.Fact_Attendance_Count = getRandomIntInclusive(0, 50);
    data.May.Fact_Reservation_Count = getRandomIntInclusive(0, 50);
    data.June = {};
    data.June.Fact_Attendance_Count  = getRandomIntInclusive(0, 50);
    data.June.Fact_Reservation_Count = getRandomIntInclusive(0, 50);
    data.July = {};
    data.July.Fact_Attendance_Count = getRandomIntInclusive(0, 50);
    data.July.Fact_Reservation_Count = getRandomIntInclusive(0, 50);
    data.August = {};
    data.August.Fact_Attendance_Count = getRandomIntInclusive(0, 50);
    data.August.Fact_Reservation_Count = getRandomIntInclusive(0, 50);
    data.September = {};
    data.September.Fact_Attendance_Count = getRandomIntInclusive(0, 50);
    data.September.Fact_Reservation_Count = getRandomIntInclusive(0, 50);
    data.October = {};
    data.October.Fact_Attendance_Count = getRandomIntInclusive(0, 50);
    data.October.Fact_Reservation_Count = getRandomIntInclusive(0, 50);
    data.November = {};
    data.November.Fact_Attendance_Count = getRandomIntInclusive(0, 50);
    data.November.Fact_Reservation_Count = getRandomIntInclusive(0, 50);
    data.December = {};
    data.December.Fact_Attendance_Count = getRandomIntInclusive(0, 50);
    data.December.Fact_Reservation_Count = getRandomIntInclusive(0, 50);
    data.All = {};
    data.All.Fact_Attendance_Count = getRandomIntInclusive(100, 100);
    data.All.Fact_Reservation_Count = getRandomIntInclusive(100, 100);
    return data;
};

var helperCache = {
    monthNames : [
        {val: "Jan"},
        {val: "Feb"},
        {val: "Mar"},
        {val: "Apr"},
        {val: "May"},
        {val: "Jun"},
        {val: "Jul"},
        {val: "Aug"},
        {val: "Sept"},
        {val: "Oct"},
        {val: "Nov"},
        {val: "Dec"},
        {val: "Tot"}
    ],
    userMetricsLoaded : false,
    attData : [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: 3, y: 0},
        {x: 4, y: 0},
        {x: 5, y: 0},
        {x: 6, y: 0},
        {x: 7, y: 0},
        {x: 8, y: 0},
        {x: 9, y: 0},
        {x: 10, y: 0},
        {x: 11, y: 0},
        {x: 12, y: 0}
     ], 
    rezyData : [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 2, y: 0},
            {x: 3, y: 0},
            {x: 4, y: 0},
            {x: 5, y: 0},
            {x: 6, y: 0},
            {x: 7, y: 0},
            {x: 8, y: 0},
            {x: 9, y: 0},
            {x: 10, y: 0},
            {x: 11, y: 0},
            {x: 12, y: 0}
        ],
    translateServerData : function(data){
        helperCache.userMetricsLoaded = true;
        if(data.January !== undefined){
            helperCache.attData[0].y = data.January.Fact_Attendance_Count;
            helperCache.rezyData[0].y = data.January.Fact_Reservation_Count;
        }
        if(data.February !== undefined){
            helperCache.attData[1].y = data.February.Fact_Attendance_Count;
            helperCache.rezyData[1].y = data.February.Fact_Reservation_Count;
        }
        if(data.March !== undefined){
            helperCache.attData[2].y = data.March.Fact_Attendance_Count;
            helperCache.rezyData[2].y = data.March.Fact_Reservation_Count;
        }
        if(data.April !== undefined){
            helperCache.attData[3].y = data.April.Fact_Attendance_Count;
            helperCache.rezyData[3].y = data.April.Fact_Reservation_Count;
        }
        if(data.May !== undefined){
            helperCache.attData[4].y = data.May.Fact_Attendance_Count;
            helperCache.rezyData[4].y = data.May.Fact_Reservation_Count;
        }
        if(data.June !== undefined){
            helperCache.attData[5].y = data.June.Fact_Attendance_Count;
            helperCache.rezyData[5].y = data.June.Fact_Reservation_Count;
        }
        if(data.July !== undefined){
            helperCache.attData[6].y = data.July.Fact_Attendance_Count;
            helperCache.rezyData[6].y = data.July.Fact_Reservation_Count;
        }
        if(data.August !== undefined){
            helperCache.attData[7].y = data.August.Fact_Attendance_Count;
            helperCache.rezyData[7].y = data.August.Fact_Reservation_Count;
        }
        if(data.September !== undefined){
            helperCache.attData[8].y = data.September.Fact_Attendance_Count;
            helperCache.rezyData[8].y = data.September.Fact_Reservation_Count;
        }
        if(data.October !== undefined){
            helperCache.attData[9].y = data.October.Fact_Attendance_Count;
            helperCache.rezyData[9].y = data.October.Fact_Reservation_Count;
        }
        if(data.November !== undefined){
            helperCache.attData[10].y = data.November.Fact_Attendance_Count;
            helperCache.rezyData[10].y = data.November.Fact_Reservation_Count;
        }
        if(data.December !== undefined){
            helperCache.attData[11].y = data.December.Fact_Attendance_Count;
            helperCache.rezyData[11].y = data.December.Fact_Reservation_Count;
        }
        if(data.All !== undefined){
            helperCache.attData[12].y = data.All.Fact_Attendance_Count;
            helperCache.rezyData[12].y = data.All.Fact_Reservation_Count;
        }
    }
};

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

            d3.select('#tileInnerSineWave svg')    //Select the <svg> element you want to render the chart in.
                .datum(data)         //Populate the <svg> element with chart data...
                .call(chart);          //Finally, render the chart!

            //Update the chart when window resizes.
            //nv.utils.windowResize(function() { chart.update() });
            return chart;
        },  // call back from .addGraph
            function(_chart){
                SinChart.chart = _chart;
            });

    }
};

var MembersChart = {
    makeChart : function(){

        var testdata = [
            {key: "Prospects", y: getRandomIntInclusive(2, 20)},
            {key: "New", y: getRandomIntInclusive(2, 50)},
            {key: "At Risk", y: getRandomIntInclusive(2, 20)},
            {key: "Cancelled", y: getRandomIntInclusive(2, 10)}
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
        },  // call back from .addGraph
            function(_chart){
                MembersChart.chart = _chart;
            });

    }
};

var MembersChartNumbers = {
    makeChart : function(id){
        var html = "<div style='position:relative'>";
            html += "<div class='memberSummaryLabel' style='width:100%; position:absolute; top:0px; text-align:center;'>Members Summary</div>";
            html += "<div style='width:50%; position:absolute; top:35px; left: 0px; text-align:center; color: #008000;'><div>PROSPECTS</div><div style='font-size:48pt;'>" + getRandomIntInclusive(2, 20) + "</div></div>";
            html += "<div style='width:50%; position:absolute; top:35px; left: 50%; text-align:center; color: #5EC0E8;'><div>NEW</div><div style='font-size:48pt;'>" + getRandomIntInclusive(2, 50) + "</div></div>";
            html += "<div style='width:50%; position:absolute; top:200px; left: 0px; text-align:center; color: #EA6060;'><div>AT RISK</div><div style='font-size:48pt;'>" + getRandomIntInclusive(2, 20) + "</div></div>";
            html += "<div style='width:50%; position:absolute; top:200px; left: 50%; text-align:center; color: #FFA500;'><div>CANCELLED</div><div style='font-size:48pt;'>" + getRandomIntInclusive(2, 10) + "</div></div>";
        html += "</div>";

        $('#' + id).html(html);
    }
};

var MembershipsChart = {
    chart : null,
    makeChart : function(){

        var testdata = [
            {key: "Yearly WOT", y: getRandomIntInclusive(0, 30)},
            {key: "20 Cycling Punch", y: getRandomIntInclusive(0, 30)},
            {key: "Hot Yoga Monthly", y: getRandomIntInclusive(0, 30)},
            {key: "Sweet WOD Forever", y: getRandomIntInclusive(0, 30)}
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
        }, // call back from .addGraph
            function(_chart){
                MembershipsChart.chart = _chart;
            });

    }
};

// hack helper to hide dyno result table and reshow chart .... hackity hack, don't look back
var globalTableBack = function(){
    // re-show chart
    var $lineChartSvg = $(".specialLineChartSvg");
    $lineChartSvg.toggle();
    // remove fake html table
    $('.specialLineChartTable').remove();

    // remove back button
    $('#specialBackButton').remove();

    // more hackity ... for some reason 'onRelease' not being called ... didn't have time .. retween back to original size and opacity
    var element = $('#' + chartMap.classMetricsLine.container)[0];
    TweenLite.to(element, 0.2, {
        autoAlpha : 1,
        boxShadow: shadow1,
        scale     : 1
    });

    return true;
};

var ClassMetricsLineChart = {
    attendanceCountDisabled : false, // have these because __data__ is weird for this one, but LineChart needs array of both disabled series object
    reservationCountDisabled : false,
    chart : null,
    makeChart : function(){
        var doChartWork = function(){
            //Line chart data should be sent as an array of series objects.
            var chartData = [
                {
                    values: helperCache.attData,      //values - represents the array of {x,y} data points
                    key: 'Attendance Count', //key  - the name of the series.
                    color: '#ff7f0e'  //color - optional: choose your own line color.
                },
                {
                    values: helperCache.rezyData,
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
                        return helperCache.monthNames[d].val;
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
            },  // call back from .addGraph
                function(_chart){
                    ClassMetricsLineChart.chart = _chart;
                    ClassMetricsLineChart.chart.lines.dispatch.on("elementClick", function(e){

                        var attCount = 0, rezyCount = 0, pointIdx = 0;
                        // to get the point ...
                        if(e.length === 2){
                            var att = e[0];
                            pointIdx = att.pointIndex;
                            attCount = att.series.values[pointIdx].y;
                            var rezy = e[1];
                            pointIdx = rezy.pointIndex;
                            rezyCount = rezy.series.values[pointIdx].y;
                            console.log('AttendanceCount value: ' + attCount + ', ReservationCount: ' + rezyCount);
                        }

                        var $lineChartSvg = $(".specialLineChartSvg");
                        $lineChartSvg.toggle();
                        $lineChartSvg.after(chartMap.makeFakeChart(attCount, rezyCount));

                        console.log(e);


                        //$("#modalTest").modal('show');

                        // console.log('element: ' + e.value);
                        // console.dir(e.point);
                    });
                    ClassMetricsLineChart.chart.legend.dispatch.on("legendClick", function(__data__){
                        // weird, sometimes there is no .disabled property!!
                        if(__data__ && __data__.key !== undefined) { // they clicked on legend
                            if (__data__.key === 'Attendance Count') {
                                ClassMetricsLineChart.attendanceCountDisabled = !ClassMetricsLineChart.attendanceCountDisabled;
                                ClassMetricsBarChart.attendanceCountDisabled = !ClassMetricsBarChart.attendanceCountDisabled;
                                ClassMetricsBarChart.chart.dispatch.changeState({disabled: [ClassMetricsBarChart.attendanceCountDisabled, ClassMetricsBarChart.reservationCountDisabled] });
                            } else { // key === 'Reservation Count'
                                ClassMetricsLineChart.reservationCountDisabled = !ClassMetricsLineChart.reservationCountDisabled;
                                ClassMetricsBarChart.reservationCountDisabled = !ClassMetricsBarChart.reservationCountDisabled;
                                ClassMetricsBarChart.chart.dispatch.changeState({disabled: [ClassMetricsBarChart.attendanceCountDisabled, ClassMetricsBarChart.reservationCountDisabled] });
                            }
                        }
                    });
                }
            );
        }; // doChartWork

        if(!helperCache.userMetricsLoaded){
            // no backend
            var data = noBackendData();
            helperCache.translateServerData(data);
            doChartWork();

            // var url = warehouseDataServer + '/api/warehouse/EE0DB82E-F1C3-4FC6-9976-8852F3F52D33/2016';
            // var jqxhr = $.get(url, function(data) {
            //     console.log('.... loading user metric data from .net backend ....');
            //         helperCache.translateServerData(data);
            //         doChartWork();
            //     })
            //     .done(function() {
            //         //alert( "second success" );
            //     })
            //     .fail(function() {
            //         alert( "error" );
            //     });

        } else {
            doChartWork();
        }
    } // makeChart
};

var ClassMetricsBarChart = {
    chart : null,
    attendanceCountDisabled : false, // have these because __data__ is weird for this one, but LineChart needs array of both disabled series object
    reservationCountDisabled : false,
    makeChart : function(){

        var doChartWork = function(){
            //Line chart data should be sent as an array of series objects.
            var chartData = [
                {
                    values: helperCache.attData,      //values - represents the array of {x,y} data points
                    key: 'Attendance Count', //key  - the name of the series.
                    color: '#ff7f0e'  //color - optional: choose your own line color.
                },
                {
                    values: helperCache.rezyData,
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
                        return helperCache.monthNames[d].val;
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
            },
                // call back from .addGraph
                function(_chart){
                    ClassMetricsBarChart.chart = _chart;

                    ClassMetricsBarChart.chart.interactiveLayer.dispatch.on("elementClick", function(e){
                        console.log(e);
                        // console.log('element: ' + e.value);
                        // console.dir(e.point);
                    });

                    ClassMetricsBarChart.chart.legend.dispatch.on("legendClick", function(__data__){
                        // weird, sometimes there is no .disabled property!!
                        if(__data__ && __data__.key !== undefined) { // they clicked on legend
                            if (__data__.key === 'Attendance Count') {
                                // todo: only really need one 'set' of flags, series0Disabled / series1Disabled ... but ... meh
                                ClassMetricsBarChart.attendanceCountDisabled = !ClassMetricsBarChart.attendanceCountDisabled;
                                ClassMetricsLineChart.attendanceCountDisabled = !ClassMetricsLineChart.attendanceCountDisabled;
                                ClassMetricsLineChart.chart.dispatch.changeState({disabled: [ClassMetricsLineChart.attendanceCountDisabled, ClassMetricsLineChart.reservationCountDisabled] });
                            } else { // key === 'Reservation Count'
                                ClassMetricsBarChart.reservationCountDisabled = !ClassMetricsBarChart.reservationCountDisabled;
                                ClassMetricsLineChart.reservationCountDisabled = !ClassMetricsLineChart.reservationCountDisabled;
                                ClassMetricsLineChart.chart.dispatch.changeState({disabled: [ClassMetricsLineChart.attendanceCountDisabled, ClassMetricsLineChart.reservationCountDisabled] });
                            }

                        }
                    });
                }
            );
        }; // doChartWork

        if(!helperCache.userMetricsLoaded){
            var url = warehouseDataServer + '/api/warehouse/EE0DB82E-F1C3-4FC6-9976-8852F3F52D33/2016';
            var jqxhr = $.get(url, function(data) {
                console.log('.... loading user metric data from .net backend ....');
                helperCache.translateServerData(data);
                doChartWork();
            })
            .done(function() {
                //alert( "second success" );
            })
            .fail(function() {
                alert( "error" );
            });

        } else {
            doChartWork();
        }
    } // makeChart
};
