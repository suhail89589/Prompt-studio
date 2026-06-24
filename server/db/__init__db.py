from server.db.Session import engine
from server.models.user import Base


def init_db():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()
    print("Database tables created succesfully !")
