import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configuração do banco de dados
config = {
    "host": "localhost",
    "user": "root",
    "password": "12345",  # Substitua pela sua senha
    "database": "agenda",  # Nome do banco de dados
}

# Rota para buscar todos os contatos (GET)
@app.route("/contatos", methods=['GET'])
def buscarContatos():
    try:
        conexao = mysql.connector.connect(**config)
        janelinha = conexao.cursor(dictionary=True)
        janelinha.execute("SELECT * FROM contatos")
        lista_de_contatos = janelinha.fetchall()
        return jsonify(lista_de_contatos)
    except Exception as e:
        return jsonify({"error": str(e)})


# Rota para cadastrar um novo contato (POST)
@app.route("/contatos", methods=['POST'])
def cadastrarContato():
    try:
        nome = request.json['nome']
        email = request.json['email']

        conexao = mysql.connector.connect(**config)
        janelinha = conexao.cursor(dictionary=True)
        janelinha.execute("""
            INSERT INTO contatos (nome, email)
            VALUES (%s, %s);
        """, (nome, email))
        conexao.commit()
        return jsonify({"mensagem": "Contato cadastrado com sucesso!"})
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run(debug=True)