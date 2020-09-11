const titleName = document.title = "Your project name";

const headerTitle =  "Your title";

const showMemoryText = true;
const showCPUText = true;
const showDiskText = true;
const hostForPreview = "https://cpu-stats-api-heroku.herokuapp.com/api/?format=json"
const localHost = "http://localhost:5000/api/"
// If running on local host change this to the localHost variable from above
const hostURL = hostForPreview;

















//commits your changes to the DOM
document.title = titleName;
document.querySelector("#subTitle").innerHTML = headerTitle;

!showMemoryText ? (document.querySelector("#memoryAvailable").style.display = "none",
    document.querySelector("#memoryUsed").style.display = "none") : null;

!showCPUText ? (document.querySelector("#cpuAvailable").style.display = "none",
    document.querySelector("#cpuUsed").style.display = "none") : null;

!showDiskText ? (document.querySelector("#diskAvailable").style.display = "none",
    document.querySelector("#diskUsed").style.display = "none") : null;

