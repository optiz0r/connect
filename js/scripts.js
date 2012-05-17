var connect = {

    hosts: {},

    init: function() {
        connect.ui.init();

        connect.setHosts();
    },

    setHosts: function() {
        for (var customer_name in connect.hosts) {
            var customer = connect.hosts[customer_name];
            for (var service_name in customer) {
                var service = customer[service_name];
                for (var site_name in service) {
                    var site = service[site_name];
                    for (var device_name in site) {
                        device = site[device_name];
                        connect.ui.addHost(customer_name, service_name, site_name, device_name, device.ip, device.protocols, device.description);
                    }
                }

            }
        }
    },

    ui: {

        access_template: '<a href="%protocol%://%ip%/" class="btn btn-info" title="%Protocol% to %name%">%Protocol%</a>',

        protocolNames: {
            'telnet': 'Telnet',
            'ssh':    'SSH',
        },

        init: function() {
            
            $.extend( $.fn.dataTableExt.oStdClasses, {
                "sWrapper": "dataTables_wrapper form-inline"
            } ); 
                  
            $('#devices').dataTable({
                "bPaginate": false,
                "bLengthChange": false,
                "bFilter": true,
                "bSort": true,
                "bInfo": true,
                "bAutoWidth": false,
                "bSortClasses": false,
                "sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>"
            });
        },

        addHost: function(customer, service, site, name, ip, protocols, description) {
            access = [];
            for (var i in protocols) {
                protocol = protocols[i];
                access.push(
                    connect.ui.access_template.replace(/%name%/g, name).replace(/%protocol%/g, protocol).replace(/%Protocol%/g, connect.ui.protocolNames[protocol]).replace(/%ip%/g, ip)
                );
            }

            $('#devices').dataTable().fnAddData([
                customer, service, site, name, description, access.join(' | ')
            ]);
        },

    },

    util: {

        ucFirst: function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },

    },
};

// Initialise the generator when the page loads
$("document").ready(function(){
    connect.hosts = hosts;
    connect.init();
});

