import os
import json
from flask import Flask, g, request, send_file
from flask_cors import CORS
from flask.logging import default_handler
import logging
from logging.handlers import RotatingFileHandler
from models.employee import Employee, db
from simple_auth.authorization import requires_auth

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sqlite.db'

db.app = app
db.init_app(app)
db.create_all()

@app.route('/', methods=['GET'])
def emp_crud():
    return 'EMPLOYEES CRUD'

@app.route('/employee', methods=['POST'])
@requires_auth
def create_employee():
    body = request.get_json()
    try:
        employee = Employee(body["nome"],body["idade"],body["cargo"])
        db.session.add(employee)
        db.session.commit()
        app.logger.info(employee.nome + ' criado com id ' + str(employee._id))
        return  json.dumps(employee.serialize), 200, {'Content-Type': 'application/json'}
    except KeyError as err:
        app.logger.error(err)
        return 'Field ' +  str(err) + ' is missing.', 400
    else:
        app.logger.error('Invalid data')
        return 'Bad Request', 400

@app.route('/employee', methods=['PUT'])
@requires_auth
def update_employee():
    if not request.data:
        return 'Bad Request', 400
    body = request.get_json()
    try:
        eid = body["id"]
        employee = Employee.query.filter_by(_id=eid).first()
        for (key,value) in body.items():
            if not key == "id": setattr(employee,key,value)
        db.session.commit()
        app.logger.info(employee.nome + ' atualiazado com  id ' + str(employee._id))
        
        return  json.dumps(employee.serialize), 200, {'Content-Type': 'application/json'}
    except KeyError as err:
        app.logger.error(err)
        return 'Field ' +  str(err) + ' is missing.', 400
    else:
        app.logger.error('Invalida data')
        return 'Bad Request', 400

@app.route('/employee/<int:id>', methods=['DELETE'])
@requires_auth
def del_employee(id):
    try:
        Employee.query.filter_by(_id=id).delete()
        db.session.commit()
        response = "User " + str(id) + " REMOVED."
        app.logger.info(response)
        return response, 200
    except BaseException as err:
        app.logger.error("ERROR: " + str(err))
        return "ERROR: " + str(err), 500

@app.route('/employee', methods=['GET'])
def get_employee():
    nome = request.args.get('nome')
    idade = request.args.get('idade')
    cargo = request.args.get('cargo')
    page = request.args.get('page') or 1
    size = request.args.get('size') or 10
    id = request.args.get('id')
    if(id): 
        pessoas = Employee.query.filter_by(_id=id)
    else:
        args = {}
        if(cargo): args["cargo"] = cargo
        if(idade): args["idade"] = idade
        pessoas = Employee.query.filter_by(**args)
        if (nome): pessoas = pessoas.filter(Employee.nome.contains(nome))
        app.logger.info('Employees retrieved.')
    total = pessoas.count()
    pessoas = pessoas.paginate(int(page),int(size)).items
    response = {
        "items": [pessoa.serialize for pessoa in pessoas],
        "page": page,
        "size": size,
        "total": total
    }
    return json.dumps(response), 200, {'Content-Type': 'application/json'}

@app.route('/employee/cargos', methods=['GET'])
def get_cargos():
    cargos = []
    for cargo in db.session.query(Employee.cargo).distinct():
        cargos.append(cargo.cargo)
    app.logger.info('Cargos retrieved')
    return json.dumps({"items":cargos}), 200, {'Content-Type': 'application/json'}

@app.route('/log')
@requires_auth
def method_name():
    return send_file('api.log', attachment_filename='api.log')
	
@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

if __name__ == '__main__':
    app.logger.removeHandler(default_handler)
    handler = RotatingFileHandler('api.log', maxBytes=10000, backupCount=1)
    handler.setLevel(logging.INFO)
    handler.setFormatter(logging.Formatter(
        '[%(asctime)s] %(levelname)s in %(module)s: %(message)s'
    ))
    app.logger.addHandler(handler)
    app.logger.setLevel(20)
    app.run(os.environ['HOST'],os.environ['PORT'])