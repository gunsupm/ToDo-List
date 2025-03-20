from app import app,db
from flask import request, jsonify
from models import Task


#get all task
@app.route("/api/tasks",methods=["GET"])
def get_task():
    tasks = Task.query.all()
    result = [task.to_json() for task in tasks]
    return jsonify(result)

# Create a task
@app.route("/api/tasks",methods=["POST"])
def create_task():
  try:
    data = request.json

    required_fields = ["name","completed"]
    for field in required_fields:
      if field not in data:
        return jsonify({"error":f'Missing required field: {field}'}), 400

    name = data.get("name")
    completed = data.get("completed", False)

    new_task = Task(name=name, completed=completed)

    db.session.add(new_task)   
    db.session.commit()

    return jsonify(new_task.to_json()), 201


    
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}), 500
  
@app.route("/api/tasks/<int:id>",methods=["DELETE"])
def delete_task(id):
  try:
    task = Task.query.get(id)
    if task is None :
      return jsonify({"error":f"Task not found "}), 404
    
    db.session.delete(task)   
    db.session.commit()
    return jsonify({"msg": "Task DELETED"}), 200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}), 500
  
@app.route("/api/tasks/<int:id>",methods=["PATCH"])
def update_task(id):
  try:
    task = Task.query.get(id)
    if task is None:
      return jsonify({"error":"Task not found"}), 404
    
    data = request.json

    task.name = data.get("name")
    task.completed = data.get("completed")

    db.session.commit()
    return jsonify(task.to_json()),200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500