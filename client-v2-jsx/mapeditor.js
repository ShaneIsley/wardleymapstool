/** @jsx React.DOM */
var React = require('react');
var Palette = require('./palette');
var MapCanvas = require('./mapcanvas');
var MapStore = require('./store/mapstore');
var MapActions = require('./actions/mapactions');
var jquery = require('jquery');

var mapEditorStyle = {
        minWidth : 800,
        minHeight : 600,
        height: 'auto',
        position: 'relative'
};




  var MapEditor = React.createClass({
    componentDidMount : function(){
      var url = this.props.origin + '/api/map/' + this.props.mapid;
      jquery.get(url, function(result) {
        console.log(result);
      }.bind(this));
    },
    render: function() {
        return (
            <div style={mapEditorStyle}>
              <Palette store={MapStore}/>
              <MapCanvas ref={
                  function(input){
                    jsPlumb.draggable(input, {
                        clone : 'true',
                        ignoreZoom:true,
                        grid:['50','50'],
                        containment:true,
                        stop : function(param){
                            var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
                            var target = {'top' : param.pos[1], 'left' : param.pos[0], id: id};
                            MapActions.createNodeFromDrop(target);
                        }
                    });
                  }
                } store={MapStore}/>
            </div>
        );
    }
  });

  module.exports = MapEditor;