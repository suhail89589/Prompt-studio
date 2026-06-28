from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from server.db.Session import Base


class PromptHistory(Base):
    __tablename__ = "Prompt_history"
    id = Column(Integer, primary_key=True, index= True)
    user_id = Column(Integer, ForeignKey("users.id"))
    original_prompt = Column(String)
    enchanced_prompt = Column(String)
    score = Column(Float)
    token_count = Column(Integer)