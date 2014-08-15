'use strict';

/* Controllers */

angular.module('kaizen.controllers', [])
  
    .controller('ServerListController', ['$scope', function($scope) {
        
        /**
         * Inicialización
         */
        function initialize () {
            
            $scope.servidores = [
                {
                    id: 1,
                    name: 'Servidor-1',
                    ping: 165,
                    descrip: 'SQL',
                    os: 'Windows'
                },
                {
                    id: 12,
                    name: 'Servidor-2',
                    ping: 16,
                    descrip: 'Mail Server',
                    os: 'Linux'  		
                },  	
                {
                    id: 3,
                    name: 'Servidor-3',
                    ping: 845,
                    descrip: 'Node server',
                    os: 'Linux'  		
                },  	
                {
                    id: 4,
                    name: 'Servidor-4',
                    ping: 225,
                    descrip: 'Terminal Server',
                    os: 'Windows'  		
                }  	
            ];
            
            $scope.max = 1000;
            $scope.data = 30;
            
            /**
             * High Charts config
             */
            Highcharts.setOptions({
                global: {
                    useUTC: false
                }
            });
            
            setTimeout(function () {
                for (var i = 0; i < $scope.servidores.length; i++) {
                    configurarGrafico(i);
                }
            }, 3000);
        }
        
    
        /**
         * Actualizar servidor
         */
        function actualizarServer(index) {
            var ping = $scope.servidores[index].ping = Math.round(Math.random() * 100);
            $scope.$apply();
            return ping;
        }
        
        
        /**
         * Configurar grafico
         */
        function configurarGrafico (index) {
            /**
             * Preparo configuración
             */
            var config = {
                chart: {
                    type: 'spline',
                    animation: Highcharts.svg,
                    marginRight: 10,
                    events: {
                        load: function() {
                            var series = this.series[0];
                            
                            setInterval(function() {
                                var x = (new Date()).getTime(),
                                    y = actualizarServer(index);
                                
                                series.addPoint({x: x, y: y}, true, true);
                            }, 1000);
                        }
                    }
                },
                title: {
                    text: 'Live server data'
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150
                },
                yAxis: {
                    title: {
                        text: 'Ping'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    formatter: function() {
                            return '<b>'+ this.series.name +'</b><br/>'+
                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                            Highcharts.numberFormat(this.y, 2);
                    }
                },
                legend: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    name: 'data',
                    /* Reservo 10 mediciones para el inicio, separadas cada 1 segundo (1000 milisegundos) */
                    data: [
                        {x: (new Date()).getTime()-9000, y: 0}, // 1
                        {x: (new Date()).getTime()-8000, y: 0}, // 2
                        {x: (new Date()).getTime()-7000, y: 0}, // 3
                        {x: (new Date()).getTime()-6000, y: 0}, // 4
                        {x: (new Date()).getTime()-5000, y: 0}, // 5
                        {x: (new Date()).getTime()-4000, y: 0}, // 6
                        {x: (new Date()).getTime()-3000, y: 0}, // 7
                        {x: (new Date()).getTime()-2000, y: 0}, // 8
                        {x: (new Date()).getTime()-1000, y: 0}, //9
                        {
                            x: (new Date()).getTime(),
                            y: $scope.servidores[index].ping
                        } //10
                    ]
                }]
            };    
        
            
            /**
             * Paso los valores al elemento
             */
            $('#chart-server-'+$scope.servidores[index].id).highcharts(config);
            
        }
        
        initialize();
        
    }]);
