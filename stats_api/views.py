from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
from stats_api.cpuStats import *

statistics = GetStats()


class Dashboard(APIView):
    """Dashboard returns html for front-end use"""
    def get(self,request,format=None):
        return render(request, "index.html")


class GetAllStats(APIView):
    """Get all stats for host system"""

    def get(self,request,format=None):
        """returns an object with key/value pairs of the stats"""
        #sets cpu interval at time of call {set so we can give accurate used vs available}
        pullCpu = statistics.getCPU()
        pullMemory = statistics.getRam()
        return Response({
        'CPUUsedPercent':pullCpu,
        'CPUAvailablePercent':100 - pullCpu,
        'availableMemoryPercent':pullMemory[0].get('availableRam'),
        'usedMemoryPercent':pullMemory[0].get('usedRam'),
        'usedDiskSpacePercent':statistics.getDiskInfo()[-1],
        'availableDiskSpacePercent':100-statistics.getDiskInfo()[-1],
        #'temps':statistics.getTemps(),
        'hostUpTime':statistics.getUpTime(),
        })


class GetMemoryInfo(APIView):
    """Get Memory information of host system"""

    def get(self,request,format=None):
        """Returns just Memory Information"""
        pullMemory = statistics.getRam()
        return Response({
        'availableRamPercent':pullMemory[0].get('availableRam'),
        'usedRamPercent':pullMemory[0].get('usedRam'),
        })


class GetDiskInfo(APIView):
    """Get Disk information of host system"""

    def get(self,request,format=None):
        """Returns information on Disk Drive"""
        return Response({
        'diskInfo':statistics.getDiskInfo(),
        })


class GetCpuInfo(APIView):
    """Get CPU information of host system"""

    def get(self,request,format=None):
        """Returns information on CPU"""
        pullCpu = statistics.getCPU()
        return Response({
            'CPUUsedPercent':pullCpu,
            'CPUAvailablePercent':100 - pullCpu,
        })