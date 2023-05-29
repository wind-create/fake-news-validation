from typing import Any, Dict, List, Optional, Text

import numpy as np
from rasa.nlu.tokenizers.tokenizer import Token
from rasa.nlu.featurizers.sparse_featurizer.count_vectors_featurizer import CountVectorsFeaturizer
from rasa.shared.nlu.training_data.message import Message
from rasa.shared.nlu.training_data.training_data import TrainingData
from transformers import AutoTokenizer, AutoModel

class CustomCountVectorsFeaturizer(CountVectorsFeaturizer):

    def __init__(self, component_config: Optional[Dict[Text, Any]] = None) -> None:
        super().__init__(component_config)
        self.tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
        self.model = AutoModel.from_pretrained("bert-base-uncased")

    def _get_sentence_vector(self, text: Text) -> np.ndarray:
        inputs = self.tokenizer(text, return_tensors='pt', padding=True, truncation=True)
        outputs = self.model(**inputs)
        last_hidden_states = outputs.last_hidden_state
        sentence_vector = np.mean(last_hidden_states.detach().numpy(), axis=1)
        return sentence_vector

    def _tokens_to_features(self, tokens: List[Token], attribute: Text) -> Dict[Text, Any]:
        text = ' '.join([t.text for t in tokens])
        sentence_vector = self._get_sentence_vector(text)
        features = {}
        for i, feature_name in enumerate(self.config[attribute]):
            feature_value = sentence_vector[0, i]
            features[feature_name] = feature_value
        return features
