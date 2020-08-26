# A sample schema, like what we'd get from json.load()
schema_employee = {
    "type" : "object",
    "properties" : {
    "first_name" : {"type" : "string", "error_msg": "invalid input"},
		"last_name" : {"type" : "string", "error_msg": "invalid input"},
		"gender" : {"type" : "string", "error_msg": "invalid input"},
		"birth_date" : {"type" : "string", "error_msg": "invalid input"},
		"CPF" : {"type" : "string", "error_msg": "invalid input"},
    },
    "required": ["first_name", "last_name", "gender", "birth_date", "CPF"]
}
