from app import app,db
from flask import request, jsonify
from models import Task


#get all task
@app.route("/api/task",methods=["GET"])
def get_task():
    tasks = Task.query.all()
    result = [task.to_json() for task in tasks ]
    return jsonify(result)