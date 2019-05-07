
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
