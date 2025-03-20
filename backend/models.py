from app import db

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    
    
def to_json(self):
    return{
    "id":self.id,
    "name":self.name,
    "completed":self.completed,
    }