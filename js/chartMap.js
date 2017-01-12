
var chartMap = {
    makeFakeChart : function(attCount, rezyCount){
        var html = '';
        html = '<button id="specialBackButton" style="position:absolute;top:0;right:0" onClick="return globalTableBack();">BACK</button>';
        html += '<div class="specialLineChartTable" style="height:100%; width:100%;">';
            html += '<div style="max-height: 350px; overflow-y:scroll">';
                html += '<h4>Attendances</h4>';
                html += '<div class="fakeChartDiv" style="width: 100%;">';
                    html += '<table style="width: 100%">';
                    html += '<tr><td class="fakeChartTd" style="width: 65%">Samuel Adams</td><td style="width:10%">&nbsp;</td><td class="fakeChartTd" style="width:25%">01/10/2016</td></tr>';
                    html += '<tr><td class="fakeChartTd" style="width: 65%">Gandalf TheGrey</td><td style="width:10%">&nbsp;</td><td class="fakeChartTd" style="width:25%">01/10/2016</td></tr>';
                    html += '<tr><td class="fakeChartTd" style="width: 65%">Frodo Baggins</td><td style="width:10%">&nbsp;</td><td class="fakeChartTd" style="width:25%">02/02/2016</td></tr>';
                    html += '<tr><td class="fakeChartTd" style="width: 65%">Adolph Coors</td><td style="width:10%">&nbsp;</td><td class="fakeChartTd" style="width:25%">02/28/2016</td></tr>';
                    html += '<tr><td class="fakeChartTd" style="width: 65%">Samuel Jackson</td><td style="width:10%">&nbsp;</td><td class="fakeChartTd" style="width:25%">03/13/2016</td></tr>';
                    html += '<tr><td class="fakeChartTd" style="width: 65%">Ara Gorn</td><td style="width:10%">&nbsp;</td><td class="fakeChartTd" style="width:25%">03/30/2016</td></tr>';
                    html += '<tr><td class="fakeChartTd" style="width: 65%">Jack Daniels</td><td style="width:10%">&nbsp;</td><td class="fakeChartTd" style="width:25%">03/30/2016</td></tr>';
                    html += '<tr><td class="fakeChartTd" style="width: 65%">Arnold Palmer</td><td style="width:10%">&nbsp;</td><td class="fakeChartTd" style="width:25%">11/10/2016</td></tr>';
                    html += '<tr><td class="fakeChartTd" style="width: 65%">Jack Nicholson</td><td style="width:10%">&nbsp;</td><td class="fakeChartTd" style="width:25%">11/22/2016</td></tr>';
                    // for(var i = 0; i < attCount; i++){
                    //     html += '<tr><td class="fakeChartTd" style="width: 65%">Fake Name</td><td style="width:10%">&nbsp;</td><td class="fakeChartTd" style="width:25%">01/10/2015</td></tr>';
                    // }
                    html += '</table>';
                html += '</div>';
                html += '<h4>Reservations</h4>';
                html += '<div class="fakeChartDiv" style="width: 100%;">';
                    html += '<table style="width: 100%">';
                        html += '<tr><td class="fakeChartTd" style="width: 65%">Marianne Adams</td><td style="width:10%">&nbsp;</td><td class="fakeChartTd" style="width:25%">01/10/2016</td></tr>';
                        html += '<tr><td class="fakeChartTd" style="width: 65%">Amber Adams</td><td style="width:10%">&nbsp;</td><td class="fakeChartTd" style="width:25%">01/10/2016</td></tr>';
                        html += '<tr><td class="fakeChartTd" style="width: 65%">Samwise Gamgee</td><td style="width:10%">&nbsp;</td><td class="fakeChartTd" style="width:25%">02/02/2016</td></tr>';
                        html += '<tr><td class="fakeChartTd" style="width: 65%">TheGreen Dragon</td><td style="width:10%">&nbsp;</td><td class="fakeChartTd" style="width:25%">02/28/2016</td></tr>';
                        html += '<tr><td class="fakeChartTd" style="width: 65%">Floyd Landis</td><td style="width:10%">&nbsp;</td><td class="fakeChartTd" style="width:25%">03/13/2016</td></tr>';
                        html += '<tr><td class="fakeChartTd" style="width: 65%">Stu Thorn</td><td style="width:10%">&nbsp;</td><td class="fakeChartTd" style="width:25%">03/30/2016</td></tr>';
                    // for(var i = 0; i < rezyCount; i++){
                    //     html += '<tr><td class="fakeChartTd" style="width: 65%">Fake Name</td><td style="width:10%">&nbsp;</td><td class="fakeChartTd" style="width:25%">01/10/2015</td></tr>';
                    // }
                    html += '</table>';
                html += '</div>';
            html += '</div>';
        html += '</div>';
        return html;
    },

    classMetricsLine : {
        default : true,
        container : 'divContainerClassMetricsChart',
        inner : 'divInnerClassMetricsChart',
        linkId : 'addClassMetricsLine',
        placeHolderHtml : function(){
            return '<div style="padding-left:0; padding-top:10px;height:100%;text-align:center;" id="' + chartMap.classMetricsLine.inner + '"><div class="chart-icon" style="margin-bottom:10px;font-size:18pt;">Member Metrics Summary (Line Chart)</div><i class="fa fa-line-chart" style="font-size:20em;"></i></div></div>';
        },
        html : function(){
            return '<div id="'+ chartMap.classMetricsLine.inner +'" style="width:100%;height:90%"><svg class="specialLineChartSvg" style="height:95%; width:95%"></svg></div>';
        }
    },
    classMetricsBar : {
        default : true,
        container : 'divContainerClassMetricsBar',
        inner : 'divInnerClassMetricsBarChart',
        linkId : 'addClassMetricsBar',
        placeHolderHtml : function(){
            return '<div style="padding-left:0; padding-top:10px;height:100%;text-align:center;" id="' + chartMap.classMetricsBar.inner + '"><div class="chart-icon" style="margin-bottom:10px;font-size:18pt;">Member Metrics Summary (Bar Chart)</div><i class="fa fa-bar-chart" style="font-size:20em;"></i></div></div>';
        },
        html : function(){
            return '<div id="' + chartMap.classMetricsBar.inner + '" style="width:100%;height:100%"><svg style="height:95%; width:95%"></svg></div>';
        }
    },
    memberDoughnut : {
        default : true,
        container : 'divContainerMemberDoughnutChart',
        inner : 'divInnerMemberDoughnutChart',
        linkId : 'addMemberDoughnut',
        placeHolderHtml : function(){
            return '<div style="padding-left:0; padding-top:50px;height:100%;text-align:center;" id="' + chartMap.memberDoughnut.inner + '"><div class="chart-icon" style="margin-top:-50px;margin-bottom:10px;font-size:18pt;">Members Categories</div><i class="fa fa-pie-chart" style="font-size:20em;"></i></div></div>';
        },
        html : function(){
            var html = '<button id="childBackButton" style="position:absolute;top:0;right:0;display:none;" onClick="return globalChildBack();">BACK</button>';
            html += '<div id="' + chartMap.memberDoughnut.inner + '" style="padding-left:20px; padding-top:20px; height: 90%">';
            html += '<svg id="memberDoughnut" class="mypiechart"></svg><svg id="memberDoughnutChild" class="mypiechart" style="display:none;"></svg></div>';
            return html
        }
    },
    memberSummaryNumbers : {
        default : false,
        container : 'tileContainerMemberSummary',
        inner : 'tileInnerMemberSummary',
        linkId : 'addMemberSummary',
        placeHolderHtml : function(){
            return '<div style="padding-left:0; padding-top:0; text-align:center;" id="' + chartMap.memberSummaryNumbers.inner + '"><div class="chart-icon" style="font-size:18pt;">Member Summary</div><i class="fa fa-th-large" style="font-size:20em;"></i></div></div>';
        },
        html : function(){
            return '';
        }
    },
    membershipPie : {
        default : false,
        container : 'tileContainerMembershipPie',
        inner : 'tileInnerMembershipPie',
        linkId : 'addMembershipsPie',
        placeHolderHtml : function(){
            return '<div style="padding-left:0; padding-top:50px;height:100%;text-align:center;" id="' + chartMap.membershipPie.inner + '"><div class="chart-icon" style="margin-top:-50px;margin-bottom:10px;font-size:18pt;">Membership Summary</div><i class="fa fa-pie-chart" style="font-size:20em;"></i></div></div>';
        },
        html : function(){
            return '<div style="padding-left:0; padding-top:50px;height:100%;text-align:center;" id="' + chartMap.membershipPie.inner + '"><svg id="membershipPie"></svg></div>';
        }
    },
    sineWaveLine : {
        default : false,
        container : 'tileContainerSineWave',
        inner : 'tileInnerSineWave',
        linkId : 'addSineChart',
        placeHolderHtml : function(){
            return '<div style="padding-left:0; padding-top:0; text-align:center; width:100%;height:90%" id="' + chartMap.sineWaveLine.inner + '"><div class="chart-icon" style="font-size:18pt;">Sine Wave</div><i class="fa fa-line-chart" style="font-size:20em;"></i></div></div>';
        },
        html : function(){
            return '<div style="padding-left:0; padding-top:0; text-align:center; width:100%;height:90%" id="' + chartMap.sineWaveLine.inner + '"><svg style="height:95%; width:95%"></svg></div>';
        }
    },
    fake1 : {
        default : false,
        container : 'tileContainerFake1',
        inner : 'tileInnerSineFake1',
        linkId : 'fake1',
        placeHolderHtml : function(){
            return '<div style="padding-left:0; padding-top:10px;height:100%;text-align:center;" id="' + chartMap.fake1.inner + '"><div class="chart-icon" style="margin-bottom:10px;font-size:18pt;">Fake Chart 1</div><i class="fa fa-dashboard" style="font-size:20em;"></i></div></div>';
        },
        html : function(){
            return '';
        }
    },
    fake2 : {
        default : false,
        container : 'tileContainerFake2',
        inner : 'tileInnerSineFake2',
        linkId : 'fake2',
        placeHolderHtml : function(){
            return '<div style="padding-left:0; padding-top:10px;height:100%;text-align:center;" id="' + chartMap.fake2.inner + '"><div class="chart-icon" style="margin-bottom:10px;font-size:18pt;">Fake Chart 2</div><i class="fa fa-line-chart" style="font-size:20em;"></i></div></div>';
        },
        html : function(){
            return '';
        }
    },
    fake3 : {
        default : false,
        container : 'tileContainerFake3',
        inner : 'tileInnerSineFake3',
        linkId : 'fake3',
        placeHolderHtml : function(){
            return '<div style="padding-left:0; padding-top:10px;height:100%;text-align:center;" id="' + chartMap.fake3.inner + '"><div class="chart-icon" style="margin-bottom:10px;font-size:18pt;">Fake Chart 3</div><i class="fa fa-area-chart" style="font-size:20em;"></i></div></div>';
        },
        html : function(){
            return '';
        }
    },
    fake4 : {
        default : false,
        container : 'tileContainerFake4',
        inner : 'tileInnerSineFake4',
        linkId : 'fake4',
        placeHolderHtml : function(){
            return '<div style="padding-left:0; padding-top:10px;height:100%;text-align:center;" id="' + chartMap.fake4.inner + '"><div class="chart-icon" style="margin-bottom:10px;font-size:18pt;">Fake Chart 4</div><i class="fa fa-bar-chart" style="font-size:20em;"></i></div></div>';
        },
        html : function(){
            return '';
        }
    }

};