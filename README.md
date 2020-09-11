# Remote Server Statistics Dashboard

CPU-Statistics is a Python-Django application that can give you remote access to stats on your server.

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install the requirements.

```bash
pip install -r requirements.txt
```

## Usage
To run locally:
```bash
python manage.py runserver 0.0.0.0:5000
```
To run with Docker:
```bash
docker-compose python manage.py runserver 0.0.0.0:5000
```
## Customize Application
To customize features in the application locate the 'customizeIt.js' file inside staticfiles-scripts:
```bash
cd staticfiles/scripts
```
Inside that JavaScript you will see the following variables you can customize
```javascript
const titleName = "Whatever you want the head to read";
const headerTitle = "Title on the top of the DOM";

const showMemoryText = true <-- false to hide text output of memory
const showCPUText = true <-- false to hide text output of cpu
const showDiskText = true <-- false to hide text output of disk usage

const hostForPreview = "**ignore** <-- this is host string for default preview of application";
const localHost = "--value of your host machine - You'll want to pass this variable into 'hostURL' if your server is your local machine";
const hostURL = "url of host machine or pass in localHost variable if host is your local machine";
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
