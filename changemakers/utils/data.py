import re

def is_valid_indian_phone_number(phone):
    expression = re.compile(r"^([0]|\+91)?\d{10}$")
    if expression.match(phone):
        return True
    return False
    
