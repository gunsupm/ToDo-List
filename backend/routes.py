from app import app,db
from flask import request, jsonify
from models import Task


#get all task
@app.route("/api/tasks",methods=["GET"])
def get_task():
    tasks = Task.query.all()
    result = [task.to_json() for task in tasks ]
    return jsonify(result)

# Create a task
@app.route("/api/tasks",methods=["POST"])
def create_task():
  try:
    data = request.json

    required_fields = ["name","completed"]
    for field in required_fields:
      if field not in data or not data.get(field):
        return jsonify({"error":f'Missing required field: {field}'}), 400

    name = data.get("name")
    completed = data.get("completed")

    new_friend = Friend(name=name, completed=completed)

    db.session.add(new_friend) 
    db.session.commit()

    return jsonify(new_friend.to_json()), 201
    
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}), 500