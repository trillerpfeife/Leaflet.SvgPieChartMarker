//Leaflet-SVGIcon
//SVG icon for any marker class
//Ilya Atkin
//ilya.atkin@unh.edu

L.DivIcon.PathSVGIcon = L.DivIcon.extend({
    options: {
        "className": "chartMarkerDiv", //className of the DivIcon
        "classNameOfSvg": "chartMarker",
        "iconAnchor": null, //defaults to [iconSize.x/2, iconSize.y] (point tip)
        "iconSize": L.point(50,50),
        "popupAnchor": null,
        "percentage": 100,
        "zoomSmall": true,
        "circleText": "test",
        "fontColor": "rgb(0, 0, 0)",
        "fontOpacity": "1",
        "fontSize": null // defaults to iconSize.x/4    

    },
    initialize: function(options) {
        options = L.Util.setOptions(this, options)

        if (!options.iconAnchor) {
            options.iconAnchor = L.point(Number(options.iconSize.x)/2, Number(options.iconSize.y))
        }
        if (!options.popupAnchor) {
            options.popupAnchor = L.point(0, (-0.75)*(options.iconSize.y))
        }
        if (options.zoomSmall) {
          this._zoomOn();
        }
        if (!options.fontSize) {
            options.fontSize = Number(options.iconSize.x/4) 
        }

        options.html = this._createSVG()
    },
    _createSVG: function() {
        var classNameOfSvg = this.options.classNameOfSvg,
            size = "width='" + this.options.iconSize.x + "' height='" + this.options.iconSize.y + "'",
            viewBox = 'viewBox="0 0 ' + this.options.iconSize.x + ' ' + this.options.iconSize.y + '"',
            pieMarker = this._createPie();

        var svg = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="' + classNameOfSvg + '" preserveAspectRatio="xMinYMin" xml:space="preserve" '+ viewBox + size + '>' + pieMarker + '</svg>';
        return svg;
    },
    _createPie: function(){
      var pieMarkerSize = 'r="'+ this.options.iconSize.x/2 + '" cx="' + this.options.iconSize.x/2 + '" cy="' + this.options.iconSize.y/2 + '"',
          pieMarkerFullCircle = function(){return Math.PI*2 * this.options.iconSize.x/2;},
          pieMarkerPercentage = function(){return this.options.percentage/100 * pieMarkerFullCircle.call(this);};

      var pieMarker = '<circle style="stroke-dasharray: '+ pieMarkerPercentage.call(this) +',' + pieMarkerFullCircle.call(this) +';" '+ pieMarkerSize +' class="pieMarker"></circle>';
      return pieMarker;
    },
    _createText: function() {
        var fontSize = this.options.fontSize + "px"
        var lineHeight = Number(this.options.fontSize)

        var x = Number(this.options.iconSize.x) / 2
        var y = x + (lineHeight * 0.35) //35% was found experimentally 
        var circleText = this.options.circleText
        var textColor = this.options.fontColor.replace("rgb(", "rgba(").replace(")", "," + this.options.fontOpacity + ")")

        var text = '<text text-anchor="middle" x="' + x + '" y="' + y + '" style="font-size: ' + fontSize + '" fill="' + textColor + '">' + circleText + '</text>'

        return text;
    },
    _zoomOn: function() {
      map.on('zoomend', function() {
        console.log(map.getZoom());
        var currentZoom = map.getZoom();
        switch (currentZoom){
          case 8: changeCSSSize(100);
          break;

          case 7: changeCSSSize(70);
          break;

          case 6: changeCSSSize(50);
          break;
          case 5: changeCSSSize(40);
          break;
        }
        });

        function changeCSSSize(percentage) {
          var selects = document.getElementsByClassName("chartMarker");
          for(var i =0, il = selects.length;i<il;i++){
            selects[i].style.width = percentage + '%'
            selects[i].style.height = percentage + '%'
        }
        }


    }
})

L.divIcon.pathSvgIcon = function(options) {
    return new L.DivIcon.PathSVGIcon(options)
}

L.Marker.PathSVGMarker = L.Marker.extend({
    options: {
        "iconFactory": L.divIcon.pathSvgIcon,
        "iconOptions": {}
    },
    initialize: function(latlng, options) {
        options = L.Util.setOptions(this, options)
        options.icon = options.iconFactory(options.iconOptions)
        this._latlng = latlng
    },
    onAdd: function(map) {
        L.Marker.prototype.onAdd.call(this, map)
    },
    setPercentage: function(percentage){
      if (this._icon && percentage) {
        var pieMarkerFullCircle = function(){return Math.PI*2 * this.options.icon.options.iconSize.x/2;},
            pieMarkerPercentage = function(percentage){return percentage/100 * pieMarkerFullCircle.call(this);};
        //Set new stroke-dasharray
        this._icon.firstChild.firstChild.style.cssText = 'stroke-dasharray:'+ pieMarkerPercentage.call(this,percentage) +',' + pieMarkerFullCircle.call(this) +';';
      }
    }
})

L.marker.pathSvgMarker = function(latlng, options) {
    return new L.Marker.PathSVGMarker(latlng, options)
}

/*
,
    setStyle: function(style) {
        if (this._icon) {
            var svg = this._icon.children[0]
            var iconBody = this._icon.children[0].children[0]
            var iconCircle = this._icon.children[0].children[1]

            if (style.color && !style.iconOptions) {
                var stroke = style.color.replace("rgb","rgba").replace(")", ","+this.options.icon.options.opacity+")")
                var fill = style.color.replace("rgb","rgba").replace(")", ","+this.options.icon.options.fillOpacity+")")
                iconBody.setAttribute("stroke", stroke)
                iconBody.setAttribute("fill", fill)
                iconCircle.setAttribute("stroke", stroke)

                this.options.icon.fillColor = fill
                this.options.icon.color = stroke
                this.options.icon.circleColor = stroke
            }
            if (style.opacity) {
                this.setOpacity(style.opacity)
            }
            if (style.iconOptions) {
                if (style.color) { style.iconOptions.color = style.color }
                iconOptions = L.Util.setOptions(this.options.icon, style.iconOptions)
                this.setIcon(L.divIcon.svgIcon(iconOptions))
            }
        }
    }
*/

/*
TODO: init style
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.cssClass { color: #F00; }';
document.getElementsByTagName('head')[0].appendChild(style);
 */
