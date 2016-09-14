//Leaflet-SVGIcon
//SVG icon for any marker class
//Ilya Atkin
//ilya.atkin@unh.edu

L.DivIcon.PathSVGIcon = L.DivIcon.extend({
    options: {
        "className": "chartMarker",
        "iconAnchor": null, //defaults to [iconSize.x/2, iconSize.y] (point tip)
        "iconSize": L.point(32,48),
        "popupAnchor": null
    },
    initialize: function(options) {
        options = L.Util.setOptions(this, options)

        if (!options.iconAnchor) {
            options.iconAnchor = L.point(Number(options.iconSize.x)/2, Number(options.iconSize.y))
        }
        if (!options.popupAnchor) {
            options.popupAnchor = L.point(0, (-0.75)*(options.iconSize.y))
        }

        options.html = this._createSVG()
    },
    _createSVG: function() {
        var className = this.options.className

        var style = "width:" + this.options.iconSize.x + "; height:" + this.options.iconSize.y + ";"
        var here = '<circle style="stroke-dasharray: 79, 158;" r="25" cx="25" cy="25" class="pieMarker"></circle>'
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="' + className + '" style="' + style + '">' + here + '</svg>'

        return svg
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