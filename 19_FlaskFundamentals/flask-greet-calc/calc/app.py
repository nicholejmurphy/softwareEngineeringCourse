# Put your app in here.
from flask import Flask, request
from operations import add, sub, mult, div
app = Flask(__name__)


@app.route('/add')
def add_route():
    """Add a and b paramerters."""
    a = int(request.args['a'])
    b = int(request.args['b'])
    solution = add(a, b)
    return str(solution)


@app.route('/sub')
def subtract_route():
    """Subtract a from b of paramerters."""
    a = int(request.args['a'])
    b = int(request.args['b'])
    solution = sub(a, b)
    return str(solution)


@app.route('/mult')
def multiply_route():
    """Multiply a and b paramerters."""
    a = int(request.args['a'])
    b = int(request.args['b'])
    solution = mult(a, b)
    return str(solution)


@app.route('/div')
def divide_route():
    """Divide a from b of paramerters."""
    a = int(request.args['a'])
    b = int(request.args['b'])
    solution = div(a, b)
    return str(solution)


operations = {
    'add': add,
    'sub': sub,
    'mult': mult,
    'div': div
}


@app.route('/math/<operation>')
def do_math(operation):
    """Do math operation of operation passed in"""
    a = int(request.args['a'])
    b = int(request.args['b'])
    solution = operations[operation](a, b)
    return str(solution)
