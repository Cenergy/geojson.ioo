module.exports = function (context) {
  return function (selection) {
    var layers = [
      {
        title: 'Mapbox',
        layer: L.tileLayer(
          'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=' +
            L.mapbox.accessToken,
          {
            maxZoom: 22,
            attribution:
              '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
          }
        ),
      },
      {
        title: 'Satellite',
        layer: L.tileLayer(
          'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=' +
            L.mapbox.accessToken,
          {
            maxZoom: 22,
            attribution:
              '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.maxar.com/">Maxar</a>',
          }
        ),
      },
      {
        title: 'OSM',
        layer: L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
        }),
      },
      {
        title: 'OSM2',
        layer: L.esri.imageMapLayer({
          url: 'https://landsat.arcgis.com/arcgis/rest/services/Landsat/PS/ImageServer',
          attribution:
            'United States Geological Survey (USGS), National Aeronautics and Space Administration (NASA)',
        }),
      },
      {
        title: 'OSM3',
        layer: L.esri.tiledMapLayer({
          url: 'https://services.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer',
        }),
      },
      {
        title: 'OSM4',
        layer: L.esri.dynamicMapLayer({
          url: 'https://services.arcgisonline.com/arcgis/rest/services/Specialty/Soil_Survey_Map/MapServer',
          opacity: 0.7,
        }),
      },
      {
        title: 'OSM5',
        layer: L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}', {
            pane: 'overlayPane'
        })
      },
      {
        title: 'TEST',
        layer: L.esri.basemapLayer('Topographic'),
      },
    ];

    var layerSwap = function (d) {
      var clicked = this instanceof d3.selection ? this.node() : this;
      layerButtons.classed('active', function () {
        return clicked === this;
      });
      layers.forEach(swap);
      function swap(l) {
        var datum = d instanceof d3.selection ? d.datum() : d;
        if (l.layer == datum.layer) context.map.addLayer(datum.layer);
        else if (context.map.hasLayer(l.layer))
          context.map.removeLayer(l.layer);
      }
    };

    var layerButtons = selection
      .append('div')
      .attr('class', 'layer-switch')
      .selectAll('button')
      .data(layers)
      .enter()
      .append('button')
      .attr('class', 'pad0x')
      .on('click', layerSwap)
      .text(function (d) {
        return d.title;
      });

    layerButtons
      .filter(function (d, i) {
        return i === 0;
      })
      .call(layerSwap);
  };
};
