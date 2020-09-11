/*Import google charts for gauges*/
google.charts.load("current", { packages: ["gauge"] });
google.charts.setOnLoadCallback(drawChart);

// grab dom elements for text-based stats
memAvail = document.querySelector("#memoryAvailable");
memUsed = document.querySelector("#memoryUsed");
cpuAvail = document.querySelector("#cpuAvailable");
cpuUsed = document.querySelector("#cpuUsed");
diskAvail = document.querySelector("#diskAvailable");
diskUsed = document.querySelector("#diskUsed");
bytes_sent = document.querySelector("#bs");
bytes_received = document.querySelector("#br");
packets_sent = document.querySelector("#ps");
packets_received = document.querySelector("#pr");
errorsIn = document.querySelector("#ei");
errorsOut = document.querySelector("#eo");
droppedIn = document.querySelector("#pi");
droppedOut = document.querySelector("#po");

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ["Label", "Value"],
        ["Memory", 0],
        ["CPU", 0],
        ["Disk", 0]
    ]);

    var options = {
        width: 500,
        height: 220,
        redFrom: 90,
        redTo: 100,
        yellowFrom: 75,
        yellowTo: 90,
        minorTicks: 5
    };

    var chart = new google.visualization.Gauge(
        document.getElementById("chart_div")
    );

    chart.draw(data, options);

    // API call for data updates
    (async function pullStats() {
        setTimeout(async () => {
            await axios
                .get(hostURL)
                .then(api_data => {
                    // Update dashboard
                    // Set Available Memory Gauge
                    data.setValue(0, 1, api_data.data.usedMemoryPercent);
                    chart.draw(data, options);
                    // Set available CPU Gauge
                    data.setValue(1, 1, api_data.data.CPUUsedPercent);
                    chart.draw(data, options);
                    // Set disk space used gauge
                    data.setValue(2, 1, api_data.data.usedDiskSpacePercent);
                    chart.draw(data, options);
                    // Push data to text-based stat elements
                    memAvail.textContent =
                        "Memory Available: " + api_data.data.availableMemoryPercent + "%";
                    memUsed.textContent =
                        "Memory Used: " + api_data.data.usedMemoryPercent + "%";
                    cpuAvail.textContent =
                        "CPU Available: " + api_data.data.CPUAvailablePercent + "%";
                    cpuUsed.textContent = "CPU Used: " + api_data.data.CPUUsedPercent + "%";
                    diskAvail.textContent =
                        "Disk Space Available: " + api_data.data.availableDiskSpacePercent + "%";
                    diskUsed.textContent =
                        "Disk Space Used: " + api_data.data.usedDiskSpacePercent + "%";
                    bytes_sent.textContent =
                        "bytes Sent: " + api_data.data.bytes_sent;
                    bytes_received.textContent =
                        "bytes Received " + api_data.data.bytes_received;
                    packets_sent.textContent =
                        "Packets Sent: " + api_data.data.packets_sent;
                    packets_received.textContent =
                        "Packets Received: " + api_data.data.packets_received;
                    errorsIn.textContent =
                        "Errors Incoming: " + api_data.data.errorsIn;
                    errorsOut.textContent =
                        "Errors Outgoing: " + api_data.data.errorsOut;
                    droppedIn.textContent =
                        "Packets Dropped In: " + api_data.data.droppedIn;
                    droppedOut.textContent =
                        "Packets Dropped Out: " + api_data.data.droppedOut;
                    //setup next poll recursively
                    pullStats();
                })
                .catch(err => {
                    console.log(err);
                });
        }, 100);
    })();
}
