import re
from typing import Any, Dict, List, Optional, Text
from rasa.nlu.tokenizers.tokenizer import Token, Tokenizer
from rasa.shared.nlu.training_data.message import Message
from rasa.shared.nlu.training_data.training_data import TrainingData

class CustomTokenizer(Tokenizer):

    def __init__(self, component_config: Optional[Dict[Text, Any]] = None) -> None:
        super().__init__(component_config)

    def tokenize(self, message: Message, attribute: Text) -> List[Token]:
        text = message.get(attribute)
        words = re.findall(r'\b\w+\b', text.lower())
        tokens = []
        start = 0
        for word in words:
            token = Token(word, start)
            tokens.append(token)
            start += len(word) + 1
        return tokens
