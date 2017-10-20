<script>
function DistrictOverlay(point, name, title, msg, onactive) {
    this._name = name;
    this._point = point;
    this._text = title;
    this._overText = msg;
    this._type = "DistrictOverlay";
    this._onactive = onactive;
}
DistrictOverlay.prototype = new BMap.Overlay();
DistrictOverlay.prototype.initialize = function(map) {
    this._map = map;
    var div = this._div = document.createElement("div");
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.className = "districtPoint";
    var span = this._span = document.createElement("span");
    div.appendChild(span);
    span.appendChild(document.createTextNode(this._text));
    var that = this;
    div.onclick = function() {
        that.active();
    }
    map.getPanes().labelPane.appendChild(div);
    return div;
}
DistrictOverlay.prototype.draw = function() {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x + "px";
    this._div.style.top = pixel.y + "px";
}
DistrictOverlay.prototype.getClass = function() {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x + "px";
    this._div.style.top = pixel.y + "px";
}
DistrictOverlay.prototype.active = function() {
    var allOverlay = this._map.getOverlays().filter(function(overlay) {
        return overlay.toString().split(' ')[1].indexOf('Overlay') >= 0 && overlay._type == 'DistrictOverlay';
    });
    allOverlay.forEach(function(overlay) {
        overlay._div.className = 'districtPoint';
    })
    this._div.className = 'districtPoint active';
    this._onactive(this);
}
DistrictOverlay.prototype.boundary = function(name) {
    var _this = this;   
    var bdary = new BMap.Boundary();  
    var allOverlay = this._map.getOverlays().filter(function(overlay) {
        return overlay.toString().split(' ')[1].indexOf('Polygon') >= 0;
    }); 
    allOverlay.forEach(function(ol) {
        _this._map.removeOverlay(ol);
    })
    bdary.get(name, function(rs) {
        var count = rs.boundaries.length;
        if (count === 0) {
            alert('未能获取当前输入行政区域');
            return;
        }
        var pointArray = [];
        for (var i = 0; i < count; i++) {
            var ply = new BMap.Polygon(rs.boundaries[i], { strokeWeight: 2, strokeColor: 'rgba(225,102,0,1)', fillColor: 'rgba(225,102,0,0.25)' });
            _this._map.addOverlay(ply);
            pointArray = pointArray.concat(ply.getPath());
        }
        _this._map.setViewport(pointArray);
    });
}

export default {
    DistrictOverlay
};
</script>