//Grid Greensock code created by Blake Bowen
//Forked from: http://codepen.io/osublake/pen/RNLdpz/

var chartMap = {
    classMetricsLine : {
        default : true,
        container : 'divContainerClassMetricsChart',
        inner : 'divInnerClassMetricsChart',
        linkId : null
    },
    classMetricsBar : {
        default : true,
        container : 'divContainerClassMetricsBar',
        inner : 'divInnerClassMetricsBarChart',
        linkId : null
    },
    memberDoughnut : {
        default : true,
        container : 'divContainerMemberDoughnutChart',
        inner : 'divInnerMemberDoughnutChart',
        linkId : null
    },
    memberSummaryNumbers : {
        default : false,
        container : 'tileContainerMemberSummary',
        inner : 'tileInnerMemberSummary',
        linkId : 'addMemberSummary'
    },
    membershipPie : {
        default : false,
        container : 'tileContainerMembershipPie',
        inner : 'tileInnerMembershipPie',
        linkId : 'addMembershipsPie'
    },
    sineWaveLine : {
        default : false,
        container : 'tileContainerSineWave',
        inner : 'tileInnerSineWave',
        linkId : 'addSineWave'
    }

};

var loadedCharts = [];


// GRID OPTIONS
var rowSize   = 400;
var colSize   = 400;
var gutter    = 7;     // Spacing between tiles
var fixedSize = false; // When true, each tile's colspan will be fixed to 1
var oneColumn = false; // When true, grid will only have 1 column and tiles have fixed colspan of 1
var threshold = "50%"; // This is amount of overlap between tiles needed to detect a collision

var $addMemberSummary  = $("#addMemberSummary");
var $addMembershipsPie  = $("#addMembershipsPie");
//$add.click(createTile);
//$add.mousedown(selectTile);
$addMemberSummary.on('mouseover', selectTile);
$addMemberSummary.on('mouseout', removeIfNoAction);
// $addMemberSummary.mouseover(selectTile);
// $addMemberSummary.mouseout(removeIfNoAction);
$addMembershipsPie.on('mouseover', selectTile);
$addMembershipsPie.on('mouseout', removeIfNoAction);

var $list = $("#list");
var $mode = $("input[name='layout']");

// Live node list of tiles
var tiles  = $list[0].getElementsByClassName("tile");
var label  = 1;
var zIndex = 1000;

var startWidth  = "100%";
var startSize   = colSize;
var singleWidth = colSize * 3;

var colCount   = null;
var rowCount   = null;
var gutterStep = null;

var shadow1 = "0 1px 3px  0 rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(0, 0, 0, 0.6)";
var shadow2 = "0 6px 10px 0 rgba(0, 0, 0, 0.3), 0 2px 2px 0 rgba(0, 0, 0, 0.2)";

var currMouseOverX = 150;

$(window).resize(resize);

$mode.change(init);


init();

// ========================================================================
//  INIT
// ========================================================================
function init() {

  var width = startWidth;

  // This value is defined when this function
  // is fired by a radio button change event
  switch (this.value) {

    case "mixed":
      fixedSize = false;
      oneColumn = false;
      colSize   = startSize;
      break;

    case "fixed":
      fixedSize = true;
      oneColumn = false;
      colSize   = startSize;
      break;

    case "column":
      fixedSize = false;
      oneColumn = true;
      width     = singleWidth;
      colSize   = singleWidth;
      break;
  }

  $(".tile").remove();

  TweenLite.to($list, 0.2, { width: width });
  TweenLite.delayedCall(0.25, populateBoard);

  function populateBoard() {

      createTile('divContainerClassMetricsChart', '<div id="divInnerClassMetricsChart" style="width:100%;height:90%"><svg style="height:95%; width:95%"></svg></div>', true);
      loadedCharts.push(chartMap.classMetricsLine.container);
      label++;

      createTile('divContainerMemberDoughnutChart', '<div id="divInnerMemberDoughnutChart" style="padding-left:20px; padding-top:20px"><svg id="memberDoughnut" class="mypiechart"></svg></div>', false);
      loadedCharts.push(chartMap.memberDoughnut.container);
      label++;

      createTile('divContainerClassMetricsBar', '<div id="divInnerClassMetricsBarChart" style="width:100%;height:100%"><svg style="height:95%; width:95%"></svg></div>', true);
      loadedCharts.push(chartMap.classMetricsBar.container);
      label++;
      //
      // // createTile('div4', '<div>Four</div>', true);
      // createTile('divLineChartContainer', '<div id="divLineChart" style="width:100%;height:100%"><svg style="height:95%; width:95%"></svg></div>', true);
      //label++;


      setTimeout(function(){
          // ----divContainerClassMetricsChart
          // Class metrics coming from cube .... line chart
          ClassMetricsLineChart.makeChart();

          // Members doughnut chart
          MembersChart.makeChart();

          // ------- divContainerClassMetricsBar
          // Class metrics coming from cube .... bar chart
          //    Note: only doing setTimeout here so I don't have to make another data call ....
          setTimeout(function(){
              ClassMetricsBarChart.makeChart();
          }, 1000);


          //SinChart.makeChart();

          //MembershipsChart.makeChart();


      }, 500);

      resize();

    // for (var i = 0; i < numTiles; i++) {
    //   createTile();
    // }
  }
}


// ========================================================================
//  RESIZE
// ========================================================================
function resize() {

  colCount   = oneColumn ? 1 : Math.floor($list.outerWidth() / (colSize + gutter));
  gutterStep = colCount == 1 ? gutter : (gutter * (colCount - 1) / colCount);
  rowCount   = 0;

  layoutInvalidated();
}


// ========================================================================
//  CHANGE POSITION
// ========================================================================
function changePosition(from, to, rowToUpdate) {

  var $tiles = $(".tile");
  var insert = from > to ? "insertBefore" : "insertAfter";

  // Change DOM positions
  $tiles.eq(from)[insert]($tiles.eq(to));

  layoutInvalidated(rowToUpdate);
}

// ========================================================================
//  CREATE TILE
// ========================================================================
function createTile(id, innerHtml, isDouble, isFromMenu) {

  var colspan = fixedSize || oneColumn ? 1 : (isDouble ? 2 : 1);

    var element = $('<div></div>').addClass("tile").attr("id", id)
        .append('<button style="position:absolute;bottom:0;right:0" onClick="removeTile(this)">remove</button>').append(innerHtml);

  label++;
  var lastX   = 0;

  Draggable.create(element, {
    onDrag      : onDrag,
    onPress     : onPress,
    onRelease   : onRelease,
    zIndexBoost : false
  });

  // NOTE: Leave rowspan set to 1 because this demo
  // doesn't calculate different row heights
  var tile = {
    col        : null,
    colspan    : colspan,
    element    : element,
    height     : 0,
    inBounds   : true,
    index      : null,
    isDragging : false,
    lastIndex  : null,
    newTile    : true,
    positioned : false,
    row        : null,
    rowspan    : 1,
    width      : 0,
    x          : 0,
    y          : 0,
    isTemp     : isFromMenu ? true : false,
    isLoaded     : false
  };

  // Add tile properties to our element for quick lookup
  element[0].tile = tile;

  $list.append(element);
  layoutInvalidated();

  function onPress() {
      //console.log('........onPress');
    lastX = this.x;
    tile.isDragging = true;
    tile.lastIndex  = tile.index;
    tile.isTemp = false;
      //toggleOptionButton(this._eventTarget.id, false);
    TweenLite.to(element, 0.2, {
      autoAlpha : 0.75,
      boxShadow : shadow2,
      scale     : 0.95,
      zIndex    : "+=1000"
    });
      return true;
  }

  function onDrag() {
      tile.isTemp = false;
    // Move to end of list if not in bounds
    if (!this.hitTest($list, 0)) {
      tile.inBounds = false;
      changePosition(tile.index, tiles.length - 1);
      return;
    }

    tile.inBounds = true;

    for (var i = 0; i < tiles.length; i++) {

      // Row to update is used for a partial layout update
      // Shift left/right checks if the tile is being dragged
      // towards the the tile it is testing
      var testTile    = tiles[i].tile;
      var onSameRow   = (tile.row === testTile.row);
      var rowToUpdate = onSameRow ? tile.row : -1;
      var shiftLeft   = onSameRow ? (this.x < lastX && tile.index > i) : true;
      var shiftRight  = onSameRow ? (this.x > lastX && tile.index < i) : true;
      var validMove   = (testTile.positioned && (shiftLeft || shiftRight));

      if (this.hitTest(tiles[i], threshold) && validMove) {
        changePosition(tile.index, i, rowToUpdate);
        break;
      }
    }

    lastX = this.x;
  }

  function onRelease() {
    //console.log('........onRelease');
      tile.isTemp = false;
      //toggleOptionButton(this._eventTarget.id, false);
      if(!tile.isLoaded){
        // todo: when to set this ??
        tile.isLoaded = true;
        loadTileContents(this._eventTarget.id);
      }

    // // testing
    //   tile.height = rowSize;
    //   tile.width = tile.colspan * colSize;

    // Move tile back to last position if released out of bounds
    this.hitTest($list, 0)
      ? layoutInvalidated()
      : changePosition(tile.index, tile.lastIndex);

    TweenLite.to(element, 0.2, {
      autoAlpha : 1,
      boxShadow: shadow1,
      scale     : 1,
      x         : tile.x,
      y         : tile.y,
      zIndex    : ++zIndex
    });

    tile.isDragging = false;
  }
}

// ========================================================================
//  LAYOUT INVALIDATED
// ========================================================================
function layoutInvalidated(rowToUpdate) {

  var timeline = new TimelineMax();
  var partialLayout = (rowToUpdate > -1);

  var height = 0;
  var col    = 0;
  var row    = 0;
  var time   = 0.35;

  $(".tile").each(function(index, element) {

    var tile    = this.tile;
    var oldRow  = tile.row;
    var oldCol  = tile.col;
    var newTile = tile.newTile;

    // PARTIAL LAYOUT: This condition can only occur while a tile is being
    // dragged. The purpose of this is to only swap positions within a row,
    // which will prevent a tile from jumping to another row if a space
    // is available. Without this, a large tile in column 0 may appear
    // to be stuck if hit by a smaller tile, and if there is space in the
    // row above for the smaller tile. When the user stops dragging the
    // tile, a full layout update will happen, allowing tiles to move to
    // available spaces in rows above them.
    if (partialLayout) {
      row = tile.row;
      if (tile.row !== rowToUpdate) return;
    }

    // Update trackers when colCount is exceeded
    if (col + tile.colspan > colCount) {
      col = 0; row++;
    }

    $.extend(tile, {
      col    : col,
      row    : row,
      index  : index,
      x      : col * gutterStep + (col * colSize),
      y      : row * gutterStep + (row * rowSize),
      width  : tile.colspan * colSize + ((tile.colspan - 1) * gutterStep),
      height : tile.rowspan * rowSize
    });

    col += tile.colspan;

    // If the tile being dragged is in bounds, set a new
    // last index in case it goes out of bounds
    if (tile.isDragging && tile.inBounds) {
      tile.lastIndex = index;
    }

    if (newTile) {

      // Clear the new tile flag
      tile.newTile = false;

      var from = {
        autoAlpha : 0,
        boxShadow : shadow1,
        height    : tile.height,
        scale     : 0,
        width     : tile.width
      };

      var to = {
        autoAlpha : 1,
        scale     : tile.isTemp ? .75 : 1,
        zIndex    : zIndex
      };

      // move temps to where the menu hover was ....
      if(tile.isTemp){
        tile.x = currMouseOverX;
        tile.y = -55; //-100; this works .... if covered no mouse out event fires... but couldn't hover on another item without closing this one ....
      }


      timeline.fromTo(element, time, from, to, "reflow");
    } else if (tile.width === (tile.colspan * colSize + ((tile.colspan - 1) * gutterStep) ) * .75){
        var from = {
            scale     : .75
        };

        var to = {
            scale     : 1
        };
        timeline.fromTo(element, time, from, to, "reflow");
    }

    // Don't animate the tile that is being dragged and
    // only animate the tiles that have changes
    if (!tile.isDragging && (oldRow !== tile.row || oldCol !== tile.col)) {

      var duration = newTile ? 0 : time;

      // Boost the z-index for tiles that will travel over
      // another tile due to a row change
      if (oldRow !== tile.row) {
        timeline.set(element, { zIndex: ++zIndex }, "reflow");
      }

      timeline.to(element, duration, {
        x : tile.x,
        y : tile.y,
        onComplete : function() { tile.positioned = true; },
        onStart    : function() { tile.positioned = false; }
      }, "reflow");
    }
  });

  // If the row count has changed, change the height of the container
  if (row !== rowCount) {
    rowCount = row;
    height   = rowCount * gutterStep + (++row * rowSize);
    timeline.to($list, 0.2, { height: height }, "reflow");
  }
}

// -------------------------------- functional stuff --------------------------
function selectTile (ex){
    var html = '';
    //console.log('........ selectTile');
    // todo: use clientY for when we have menu on the side bar
    var clientX = ex.clientX > 100 ? ex.clientX - 100 : ex.clientX;
    currMouseOverX = clientX;

    //removeTemporaryTiles();
    if(ex.currentTarget.id === chartMap.memberSummaryNumbers.linkId /* 'addMemberSummary'*/) {
        removeTemporaryTiles(chartMap.memberSummaryNumbers.container /*ignore 'tileContainerMemberSummary'*/);

        // don't re-add it if its already added ....
        if(_.indexOf(loadedCharts, chartMap.memberSummaryNumbers.container) >= 0){
            //console.log(chartMap.memberSummaryNumbers.container + ' already loaded !!!');
            return;
        }
        html = '<div style="padding-left:0; padding-top:0;" id="' + chartMap.memberSummaryNumbers.inner + '"><img src="img/member-summary-chart.png" style="opacity: .55"></div>'
        createTile(chartMap.memberSummaryNumbers.container, html, false, true);
        loadedCharts.push(chartMap.memberSummaryNumbers.container);
    } else if(ex.currentTarget.id === chartMap.membershipPie.linkId /*'addMembershipsPie'*/){
        removeTemporaryTiles(chartMap.membershipPie.container /* ignore 'tileContainerMembershipPie' */);
        // don't re-add it if its already added ....
        if(_.indexOf(loadedCharts, chartMap.membershipPie.container) >= 0){
            //console.log(chartMap.memberSummaryNumbers.container + ' already loaded !!!');
            return;
        }
        html = '<div style="padding-left:0; padding-top:50px;height:100%" id="' + chartMap.membershipPie.inner + '"><img src="img/membership-half-pie.png" style="opacity: .55"></div>'
        createTile(chartMap.membershipPie.container, html, false, true);
        loadedCharts.push(chartMap.membershipPie.container);
    }
}

// set timeout to remove mouseover popup after a few seconds if no action taken : mouse over something else, press, move this etc..
function  removeIfNoAction(ex) {
    var linkId = ex.currentTarget.id;
    setTimeout(function(){
        var id = '';
        if(linkId === chartMap.memberSummaryNumbers.linkId /*'addMemberSummary'*/) {
            id = chartMap.memberSummaryNumbers.container; // 'tileContainerMemberSummary';
        } else if(linkId === chartMap.membershipPie.linkId /*'addMembershipsPie'*/){
            id = chartMap.membershipPie.container; //'tileContainerMembershipPie';
        }
        var item = $('#' + id);
        if(item && item[0] && item[0].tile && item[0].tile.isTemp){
            //console.log('removeIfNoAction() - removing: ' + id);
            // kill draggable
            try{
                Draggable.get('#' + id).kill();
            }catch(e){}
            item.remove();
            var removeIdx = loadedCharts.indexOf(id);
            if(removeIdx != -1) {
                loadedCharts.splice(removeIdx, 1);
            }
            //toggleOptionButton(id, true);
            layoutInvalidated();
        }

    }, 2000);
}

function removeTile(button){
    var tileContainer = button.parentElement;
    var id = tileContainer.id;
    // kill draggable
    try{
        Draggable.get('#' + id).kill();
    }catch(e){}
    var removeIdx = loadedCharts.indexOf(id);
    if(removeIdx != -1) {
        loadedCharts.splice(removeIdx, 1);
    }
    //toggleOptionButton(id, true);
    $(tileContainer).remove();
    layoutInvalidated();
};

// load the actual chart into our tile ... triggered after onRelease of dragging
function loadTileContents(tileId){

    if(tileId === chartMap.memberSummaryNumbers.container /*'tileContainerMemberSummary'*/){
        MembersChartNumbers.makeChart(chartMap.memberSummaryNumbers.inner);
    } else if(tileId === chartMap.membershipPie.container /*'tileContainerMembershipPie'*/){
        $('#' + chartMap.membershipPie.inner).html('<svg id="membershipPie"></svg><');
        MembershipsChart.makeChart();
    }
};

// remove the ones added onHover (isTemp == true)
function removeTemporaryTiles(ignoreId) {
    //console.log('........ removeTemporaryTiles');
    var haveTemps = false;
    $(".tile").each(function(index, element) {
        var tile = this.tile;

        if(element.id !== ignoreId && tile.isTemp){
            //console.log('removeTemporaryFiles() - removing: ' + element.id);
            haveTemps = true;
            var id = element.id;

            // kill draggable
            try{
                Draggable.get('#' + id).kill();
            }catch(e){}
            try{
                $(element).remove();
            }catch(e){}
            var removeIdx = loadedCharts.indexOf(id);
            if(removeIdx != -1) {
                loadedCharts.splice(removeIdx, 1);
            }
            //toggleOptionButton(id, true);
        }
    });
    if(haveTemps){
        layoutInvalidated();
    }
};

//
// function toggleOptionButton(id, enable){
//     console.log('.... would ' + (enable ? 'enable' : 'disable')  + ' option related to : ' + id);
//     var linkId = '';
//     if(id === 'tileContainerMemberSummary') {
//         linkId = 'addMemberSummary';
//     } else if(id === 'tileContainerMembershipPie'){
//         linkId = 'addMembershipsPie';
//     }
//     // if(enable){
//     //     console.log('..... ADDING mouse handlers to : ' + linkId);
//     //     $('#' + linkId).on('mouseover', selectTile);
//     //     $('#' + linkId).on('mouseout', removeIfNoAction);
//     // }else{
//     //     console.log('..... REMOVING mouse handlers to : ' + linkId);
//     //     $('#' + linkId).off('mouseover', selectTile);
//     //     $('#' + linkId).off('mouseout', removeIfNoAction);
//     // }
// };
