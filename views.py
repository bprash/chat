from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers
import json
import uuid
from uuid import UUID

import pysolr

from deeppavlov import configs, train_model
from deeppavlov.core.common.file import read_json
model_config = read_json(configs.faq.tfidf_logreg_en_faq)
model_config["dataset_reader"]["data_path"] = "C:/Users/DELL/Downloads/faq_school_en.csv"
model_config["dataset_reader"]["data_url"] = None
faq = train_model(model_config)

def index(request):
    # return HttpResponse('Hello World!')
    return render(request,
                  'index.html')

def query(request):
	print("entered query mode")
	myDict = dict(request.GET)
	a = faq(myDict.get('query'))
	print(a[0][0])
	dict1  = json.dumps({'query':a[0][0]})
	return JsonResponse(dict1,safe=False)


def validate(request):
	
	
	print("entered validation")
	myDict = dict(request.GET)
	# for k in myDict.keys():
	# 	if k == 'query':
	# 		print("query found")
			
	# 		a = faq(myDict.get('query'))
	# 		print(a[0][0])
	# 		dict1  = json.dumps({'query':a[0][0]})
	# 		return JsonResponse(dict1,safe=False)

	uid = uuid.uuid4().hex[:6].upper()
	dat = {"id": uid}
	solr = pysolr.Solr('http://localhost:8983/solr/chatbot', always_commit=True)
	dat.update(myDict)
	solr.add([dat])

	data_last=json.dumps(dat)
	return JsonResponse(data_last, safe= False)