from flask import Flask, g, request
from flask_sqlalchemy import SQLAlchemy
import json

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sqlite.db'
db = SQLAlchemy(app)

class Employee(db.Model):
    __tablename__ = 'employee'
    _id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String)
    idade = db.Column(db.Integer)
    cargo = db.Column(db.String)
	
    def __init__(self, nome, idade, cargo):
        self.nome = nome
        self.idade = idade
        self.cargo = cargo
    @property
    def serialize(self):
        return {
            'id': self._id,
            'nome': self.nome,
            'idade': self.idade,
            'cargo': self.cargo
        }

db.create_all()

def add_employee(idade,nome,cargo):
    e = Employee(nome,idade,cargo)
    db.session.add(e)
    db.session.commit()
    return e.serialize

@app.route('/', methods=['GET'])
def emp_crud():
    return 'EMPLOYEES CRUD'

@app.route('/employee', methods=['POST'])
def create_employee():
    if not request.data:
        return 'Bad Request', 400
    body = request.get_json()
    try:
        eid = add_employee(body['idade'],body['nome'],body['cargo'])
        return  json.dumps(eid), 200, {'Content-Type': 'application/json'}
    except KeyError as err:
        return 'Field ' +  str(err) + ' is missing.', 400
    else:
        return 'Bad Request', 400

@app.route('/employee', methods=['PUT'])
def update_employee():
    if not request.data:
        return 'Bad Request', 400
    body = request.get_json()
    try:
        eid = body["id"]
        print(eid)
        employee = Employee.query.filter_by(_id=eid).first()
        print(employee)
        for (key,value) in body.items():
            print(key)
            if not key == "id": setattr(employee,key,value)
        db.session.commit()
        return  json.dumps(employee.serialize), 200, {'Content-Type': 'application/json'}
    except KeyError as err:
        return 'Field ' +  str(err) + ' is missing.', 400
    else:
        return 'Bad Request', 400

@app.route('/employee/<int:id>', methods=['DELETE'])
def del_employee(id):
    try:
        Employee.query.filter_by(_id=id).delete()
        db.session.commit()
        return "User " + str(id) + " REMOVED.", 200
    except BaseException as err:
        print(err)
        return "ERROR: " + str(err), 200

@app.route('/employee', methods=['GET'])
def get_employee():
    nome = request.args.get('nome')
    idade = request.args.get('idade')
    cargo = request.args.get('cargo')
    args = {}
    if(cargo):
        args["cargo"] = cargo
    if(idade):
        args["idade"] = idade
    pessoas = Employee.query.filter_by(**args)
    if(nome):
        pessoas = pessoas.filter(Employee.nome.contains(nome))
    
    return json.dumps([pessoa.serialize for pessoa in pessoas]), 200, {'Content-Type': 'application/json'}

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
