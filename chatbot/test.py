from rasa.nlu.featurizers.sparse_featurizer.count_vectors_featurizer import CountVectorsFeaturizer
from rasa.nlu.training_data import Message

featurizer = CountVectorsFeaturizer()

# Create a message object containing the input sentence
message = Message("The quick brown fox jumps over the lazy dog.")

# Tokenize the input sentence using the default tokenizer
message.set("tokens", [{"start": 0, "end": 3, "value": "The"},
                       {"start": 4, "end": 9, "value": "quick"},
                       {"start": 10, "end": 15, "value": "brown"},
                       {"start": 16, "end": 19, "value": "fox"},
                       {"start": 20, "end": 26, "value": "jumps"},
                       {"start": 27, "end": 31, "value": "over"},
                       {"start": 32, "end": 35, "value": "the"},
                       {"start": 36, "end": 40, "value": "lazy"},
                       {"start": 41, "end": 44, "value": "dog"},
                       {"start": 44, "end": 45, "value": "."}])

# Apply the CountVectorsFeaturizer to the message
featurizer.process(message)

# Print the resulting features
print(message.get("text_features"))
