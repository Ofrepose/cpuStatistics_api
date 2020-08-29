import functools
import psutil,os,datetime


def proper_round(num, dec=1):
    num = str(num)[:str(num).index('.')+dec+2]
    if num[-1]>='5':
        return float(num[:-2-(not dec)]+str(int(num[-2-(not dec)])+1))
    return float(num[:-1])


class GetStats():
    """Class to get stats for host system"""

    def getRam(self):
        usedRam = psutil.virtual_memory().percent
        availableRam = (psutil.virtual_memory().available * 100) / psutil.virtual_memory().total
        return [{
        'usedRam':usedRam,
        'availableRam':proper_round(availableRam)
        }]

    def getDiskInfo(self):
        return psutil.disk_usage('/')

    def getCPU(self):
        psutil.cpu_percent(interval=None)
        cpuUsed = psutil.cpu_percent(interval=2, percpu=True)
        result = functools.reduce(lambda a,b : a+b,cpuUsed)
        return float('{:0.2f}'.format(result/psutil.cpu_count(logical=False)))

    def getTemps(self):
        return 'Temperature sensors not supported on current host' if psutil.sensors_temperatures() == {} else psutil.sensors_temperatures()

    def getUpTime(self):
        return datetime.datetime.fromtimestamp(psutil.boot_time()).strftime("%Y-%m-%d %H:%M:%S")
