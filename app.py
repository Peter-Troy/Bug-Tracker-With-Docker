from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Importing CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # This will allow all domains

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://myuser:mypassword@localhost:3307/bugtracker'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Bug(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    assigned_to = db.Column(db.String(100), nullable=True)
    status = db.Column(db.String(50), nullable=False)
    priority = db.Column(db.String(50), nullable=False)
    createdAt = db.Column(db.Date, nullable=True)
    finishedAt = db.Column(db.Date, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'assigned_to': self.assigned_to,
            'status': self.status,
            'priority': self.priority,
            'createdAt': self.createdAt.isoformat() if self.createdAt else None,
            'finishedAt': self.finishedAt.isoformat() if self.finishedAt else None,
        }

@app.route('/')
def home():
    return "Backend is running!"

@app.route('/bugs', methods=['GET'])
def get_bugs():
    bugs = Bug.query.all()
    return jsonify([bug.to_dict() for bug in bugs])

@app.route('/bugs', methods=['POST'])
def submit_bug():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        bug = Bug(
            title=data['title'],
            description=data['description'],
            assigned_to=data['assigned_to'],
            status=data['status'],
            priority=data['priority'],
            createdAt=datetime.strptime(data['createdAt'], "%Y-%m-%d").date() if data.get('createdAt') else None,
            finishedAt=datetime.strptime(data['finishedAt'], "%Y-%m-%d").date() if data.get('finishedAt') else None
        )
        db.session.add(bug)
        db.session.commit()
        return jsonify(bug.to_dict()), 201
    except Exception as e:
        print(f"Error while submitting bug: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/bugs/<int:bug_id>', methods=['PUT'])
def update_bug(bug_id):
    data = request.get_json()
    bug = Bug.query.get(bug_id)
    if bug:
        bug.title = data['title']
        bug.description = data['description']
        bug.assigned_to = data['assigned_to']
        bug.status = data['status']
        bug.priority = data['priority']
        bug.createdAt = datetime.strptime(data['createdAt'], "%Y-%m-%d").date() if data.get('createdAt') else None
        bug.finishedAt = datetime.strptime(data['finishedAt'], "%Y-%m-%d").date() if data.get('finishedAt') else None
        db.session.commit()
        return jsonify({'message': 'Bug updated successfully', 'bug': bug.to_dict()}), 200
    else:
        return jsonify({'message': 'Bug not found'}), 404
    
@app.route('/bugs/<int:bug_id>', methods=['DELETE'])
def delete_bug(bug_id):
    bug = Bug.query.get(bug_id)
    if bug:
        db.session.delete(bug)
        db.session.commit()
        return jsonify({'message': 'Bug deleted successfully'}), 200
    else:
        return jsonify({'message': 'Bug not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
