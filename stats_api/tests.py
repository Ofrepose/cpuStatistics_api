from django.test import TestCase
from django.test import Client
from django.urls import reverse


client = Client()

#Put endpoints into list for testing
endPoints = ['/','/api/','/api/memory/','/api/cpu/','/api/disk/']

#Put host url for testing - localhost or heroku in this case
url = 'https://localhost:8000'


"""Test views on apis"""
class ViewsTester(TestCase):
    def setup(self):
        print('at top of test')
        self.client = Client()

    def testViews(self):
        self.assertEqual(self.client.get(url).status_code, 200)
        self.assertTemplateUsed(self.client.get(url), 'index.html')
        self.assertContains(self.client.get(url), 'Coding Challenge')
        #Iterates through endPoints list and checks that all return status 200
        for e in endPoints:
            print(f'Testing end point: {e}')
            self.assertEqual(self.client.get(url+e).status_code, 200)
            print(f'Test passed with status: 200')
