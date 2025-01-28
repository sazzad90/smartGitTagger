# from fastapi import APIRouter
# from pydantic import BaseModel
# import pandas as pd
# import numpy as np
# import pickle
# import os
# router = APIRouter()
# class TopicGenerationRequest(BaseModel):
#     test_readme: str


# import pandas as pd
# import re
# from markdown_it import MarkdownIt
# from bs4 import BeautifulSoup
# import spacy

# # Load spaCy's English model
# nlp = spacy.load("en_core_web_sm")

# # preprocessing
# def parse_and_filter_markdown(md_content):
#     if pd.isnull(md_content):  # Handle NaN values
#         return ""

#     # Parse and clean markdown content
#     wrapped_text = f'"""{md_content}"""'
#     md = MarkdownIt()
#     parsed_text = md.render(wrapped_text)
#     clean_text = BeautifulSoup(parsed_text, "html.parser").get_text()

#     # Remove emojis, URLs, non-alphanumeric characters
#     clean_text = re.sub(r"[\U0001F600-\U0001F64F]+", "", clean_text)
#     clean_text = re.sub(r"https?://\S+|www\.\S+", "", clean_text)
#     clean_text = re.sub(r"[^\w\s]", " ", clean_text)
#     clean_text = re.sub(r"\s+", " ", clean_text).strip()

#     # Remove stopwords, numbers, and meaningless words
#     doc = nlp(clean_text)
#     filtered_words = [
#         token.text
#         for token in doc
#         if not token.is_stop
#         and not token.is_digit
#         and token.is_alpha
#         and len(token.text) > 2
#         and token.pos_ not in {"DET", "CONJ", "INTJ", "PART", "SYM", "X"}
#     ]

#     return " ".join(filtered_words)

# # tokenizer
# def tokenize(docs):
#     tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
#     docs = [str(text) for text in df['cleaned_readme'].tolist()]
#     print("Number of documents:", len(docs))
#     return tokenizer(
#         docs,
#         padding=True,
#         truncation=True,
#         max_length=128,
#         return_tensors='tf'
#     )
# # load dataset and embeddings
# dataset_path = "/path/to/your/data/dataset.csv"
# embeddings_path = "/path/to/your/data/embeddings.npy"

# df = pd.read_csv(dataset_path)
# if embeddings_path.endswith('.npy'):
#     loaded_train_embeddings = np.load(embeddings_path)

# @router.post("/topic-generation")
# def read_root(request: TopicGenerationRequest):
#         test_readme = parse_and_filter_markdown(request.test_readme)
#         test_encodings = tokenize(test_readme)

#         bert_model = TFAutoModel.from_pretrained('bert-base-uncased')
#         test_outputs = bert_model(
#             input_ids=test_encodings['input_ids'],
#             attention_mask=test_encodings['attention_mask']
#         )

#         test_embeddings = test_outputs.last_hidden_state[:, 0, :].numpy()

#         train_embeddings_normalized = normalize(loaded_train_embeddings, axis=1)
#         test_embeddings_normalized = normalize(test_embeddings, axis=1) 

#         # from sklearn.neighbors import NearestNeighbors
#         knn = NearestNeighbors(n_neighbors=5, metric='cosine')
#         knn.fit(train_embeddings_normalized)
#         distances, indices = knn.kneighbors(test_embeddings_normalized)
#         top_matched_topics = df.iloc[indices[0]]['topics']

#         unique_topics = list() ###### API OUTPUT
#         for topics in top_matched_topics:
#             quoted_words = re.findall(r"'(.*?)'", topics)
#             for topic in quoted_words:
#                 if(topic not in unique_topics):
#                     unique_topics.append(topic)
#         print(unique_topics)

#         return {"generated_topics": unique_topics}



from fastapi import APIRouter
from pydantic import BaseModel
import pandas as pd
import numpy as np
import re
from markdown_it import MarkdownIt
from bs4 import BeautifulSoup
import spacy
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import normalize
from transformers import AutoTokenizer, TFAutoModel

# Initialize FastAPI router
router = APIRouter()

# Define request model
class TopicGenerationRequest(BaseModel):
    test_readme: str

# Load spaCy's English model
nlp = spacy.load("en_core_web_sm")

# Dataset and embeddings paths
DATASET_PATH = "/path/to/your/data/dataset.csv"
EMBEDDINGS_PATH = "/path/to/your/data/embeddings.npy"

# Load dataset and embeddings
try:
    df = pd.read_csv(DATASET_PATH)
    if EMBEDDINGS_PATH.endswith('.npy'):
        loaded_train_embeddings = np.load(EMBEDDINGS_PATH)
except FileNotFoundError as e:
    raise Exception(f"File not found: {e}")

# Utility Functions
def parse_and_filter_markdown(md_content):
    """Parses and cleans markdown content."""
    if pd.isnull(md_content):
        return ""
    
    wrapped_text = f'"""{md_content}"""'
    md = MarkdownIt()
    parsed_text = md.render(wrapped_text)
    clean_text = BeautifulSoup(parsed_text, "html.parser").get_text()

    # Remove emojis, URLs, non-alphanumeric characters
    clean_text = re.sub(r"[\U0001F600-\U0001F64F]+", "", clean_text)
    clean_text = re.sub(r"https?://\S+|www\.\S+", "", clean_text)
    clean_text = re.sub(r"[^\w\s]", " ", clean_text)
    clean_text = re.sub(r"\s+", " ", clean_text).strip()

    # Remove stopwords, numbers, and meaningless words
    doc = nlp(clean_text)
    filtered_words = [
        token.text
        for token in doc
        if not token.is_stop
        and not token.is_digit
        and token.is_alpha
        and len(token.text) > 2
        and token.pos_ not in {"DET", "CONJ", "INTJ", "PART", "SYM", "X"}
    ]

    return " ".join(filtered_words)

def tokenize(text):
    """Tokenizes input text using BERT tokenizer."""
    tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
    return tokenizer(
        [text],  # Wrap in a list for a single input
        padding=True,
        truncation=True,
        max_length=128,
        return_tensors='tf'
    )

# API Endpoint
@router.post("/topic-generation")
def generate_topics(request: TopicGenerationRequest):
    """Generates topics based on a README file."""
    # Preprocess input README
    test_readme = parse_and_filter_markdown(request.test_readme)
    
    # Tokenize the input
    test_encodings = tokenize(test_readme)
    
    # Load BERT model
    bert_model = TFAutoModel.from_pretrained('bert-base-uncased')
    test_outputs = bert_model(
        input_ids=test_encodings['input_ids'],
        attention_mask=test_encodings['attention_mask']
    )

    # Extract embeddings
    test_embeddings = test_outputs.last_hidden_state[:, 0, :].numpy()
    train_embeddings_normalized = normalize(loaded_train_embeddings, axis=1)
    test_embeddings_normalized = normalize(test_embeddings, axis=1)

    # Find nearest neighbors
    knn = NearestNeighbors(n_neighbors=5, metric='cosine')
    knn.fit(train_embeddings_normalized)
    distances, indices = knn.kneighbors(test_embeddings_normalized)

    # Extract unique topics
    top_matched_topics = df.iloc[indices[0]]['topics']
    unique_topics = set()
    for topics in top_matched_topics:
        quoted_words = re.findall(r"'(.*?)'", topics)
        unique_topics.update(quoted_words)

    return {"generated_topics": list(unique_topics)}
