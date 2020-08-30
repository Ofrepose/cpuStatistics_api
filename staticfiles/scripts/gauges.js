google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);

// grab dom elements for text-based stats
memAvail = document.querySelector("#memoryAvailable");
memUsed = document.querySelector("#memoryUsed");
cpuAvail = document.querySelector("#cpuAvailable");
cpuUsed = document.querySelector("#cpuUsed");
diskAvail = document.querySelector("#diskAvailable");
diskUsed = document.querySelector("#diskUsed");

function drawChart() {

    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Memory', 0],
        ['CPU', 0],
        ['Disk', 0]
    ]);

    var options = {
        width: 500, height: 220,
        redFrom: 90, redTo: 100,
        yellowFrom:75, yellowTo: 90,
        minorTicks: 5
    };

    var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

    chart.draw(data, options);

    // API call for data updates
    (async function pullStats(){
        setTimeout(async()=>{
            await $.ajax({url:'https://cpu-stats-api-heroku.herokuapp.com/api/?format=json',
                success:function(api_data){
                    //update dashboard
                    // Set Available Memory Gauge
                    data.setValue(0,1,api_data.usedMemoryPercent);
                    chart.draw(data, options);
                    // Set available CPU Gauge
                    data.setValue(1, 1, api_data.CPUUsedPercent);
                    chart.draw(data, options);
                    // Set disk space used gauge
                    data.setValue(2, 1, api_data.usedDiskSpacePercent);
                    chart.draw(data, options);
                    // Push data to text-based stat elements
                    memAvail.textContent = "Memory Available: " + api_data.availableMemoryPercent + "%";
                    memUsed.textContent = "Memory Used: " + api_data.usedMemoryPercent + "%";
                    cpuAvail.textContent = "CPU Available: " + api_data.CPUAvailablePercent + "%";
                    cpuUsed.textContent = "CPU Used: " + api_data.CPUUsedPercent + "%"
                    diskAvail.textContent = "Disk Space Available: " + api_data.availableDiskSpacePercent + "%";
                    diskUsed.textContent = "Disk Space Used: " + api_data.usedDiskSpacePercent + "%";
                    //setup next poll recursively
                    pullStats();
                },
                dataType:"json"});
        },1000);
    })();

}