from flask import request, Response, jsonify, Blueprint
from dateutil.relativedelta import relativedelta
from validate_docbr import CPF

from app import db
from ..input_schema import schema_employee
from ..utils import validate, clean_dict, valid_date_format
from ..models import Employee

import datetime
import re

api_v1 = Blueprint('api/v1', __name__)

@api_v1.route('employee/<id>', methods=['GET'])
def get_employee(id):
		try:
				data = Employee.query.get(id)
				data = {"first_name": data.first_name, "last_name": data.last_name, "gender": data.gender, "birth_date": str(data.birth_date),
						"CPF": data.CPF }
				return jsonify(data), 200
		except Exception as e:
				print('ERROR: {}'.format(e))
				return jsonify({'error': {'message': 'servidor não conseguiu processar a requisição'}}), 400

@api_v1.route('employee', methods=['POST'])
def post_employee():
		cpf = CPF()
		minor_data = '1900-01-01'
		bigger_date = datetime.datetime.now() - relativedelta(years=18)
		minor_data = datetime.datetime.strptime(minor_data, '%Y-%m-%d')
		bigger_date = datetime.datetime.strptime(str(bigger_date.date()), '%Y-%m-%d')
		try:
				payload = request.get_json(silent=True)

				if validate(payload, schema_employee) is False:
						return jsonify({'error': {'message': 'valores errados'}}), 400

				clean_dict(payload)

				if not payload['first_name']:
						return jsonify({'error': {'message': 'Nome é um campo obrigatório'}}), 400
				if not payload['gender']:
						return jsonify({'error': {'message': 'Sexo é um campo obrigatório'}}), 400
				if not payload['CPF']:
						return jsonify({'error': {'message': 'CPF é um campo obrigatório'}}), 400

				cpf.validate(payload['CPF'])

				if cpf.validate(payload['CPF']) is False:
						return jsonify({'error': {'message': 'CPF é inválido'}}), 400

				cpf = re.sub('[^0-9]', '', payload['CPF'])

				gender = payload['gender'].swapcase()

				if gender not in ['M', 'F', 'OTHER']:
						return jsonify({'error': {'message': 'Sexo não pode ter um valor deferente de masculino(m), feminino(f) ou outro(other)'}}), 400

				if Employee.query.filter_by(CPF=cpf).first():
						return jsonify({'error': {'message': 'Esse CPF já foi registrado'}}), 400

				if payload['birth_date']:
						if valid_date_format(payload['birth_date']) is False:
								return jsonify({'error': {'message': 'Data de nascimento deve está em um formato válido'}}), 400

						if (minor_data < datetime.datetime.strptime(payload['birth_date'], '%Y-%m-%d') < bigger_date) is False:
								return jsonify({'error': {'message': 'Essa data de nascimento não é permitida'}}), 400

						employee = Employee(first_name=payload['first_name'],
									last_name=payload['last_name'],
									gender=gender,
									birth_date=payload['birth_date'],
									CPF=cpf)
						db.session.add(employee)
						db.session.commit()

						return jsonify({"id": employee.id, "first_name": employee.first_name, "last_name": employee.last_name, "gender": employee.gender,
								"birth_date": str(employee.birth_date), "CPF": employee.CPF}), 201

				employee = Employee(first_name=payload['first_name'],
									last_name=payload['last_name'],
									gender=gender,
									CPF=cpf)
				db.session.add(employee)
				db.session.commit()

				return jsonify({"id": employee.id, "first_name": employee.first_name, "last_name": employee.last_name, "gender": employee.gender,
						"birth_date": str(employee.birth_date), "CPF": employee.CPF}), 201

		except Exception as e:
				print('ERROR: {}'.format(e))
				return jsonify({'error': {'message': 'servidor não conseguiu processar a requisição'}}), 400
