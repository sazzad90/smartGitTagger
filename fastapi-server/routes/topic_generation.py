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
import json
from typing import List
# Initialize FastAPI router
router = APIRouter()

class ResponseModel(BaseModel):
    generated_topics: List[str]
# Define request model
class TopicGenerationRequest(BaseModel):
    test_readme: str

# Load spaCy's English model
nlp = spacy.load("en_core_web_sm")

# Dataset and embeddings paths
DATASET_PATH = "./final_dataset.csv"
EMBEDDINGS_PATH = "./embeddings_with_KNN/train_embeddings.npy"

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
    test_readme = parse_and_filter_markdown(request.test_readme)
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
    knn = NearestNeighbors(n_neighbors=4, metric='cosine')
    knn.fit(train_embeddings_normalized)
    distances, indices = knn.kneighbors(test_embeddings_normalized)

    # Extract unique topics
    top_matched_topics = df.iloc[indices[0]]['topics']

    print('distances: ', distances[0])

    unique_topics = set()
    for idx, distance in enumerate(distances[0]):
        print('distance: ', distance)
        if distance < 0.09:  
            topics = df.iloc[indices[0][idx]]['topics']  # Get the corresponding topic
            quoted_words = re.findall(r"'(.*?)'", topics)
            unique_topics.update(quoted_words)
    unique_topics_list = list(unique_topics)
    print("Unique Topics:", unique_topics_list)

    return {"generated_topics": unique_topics_list}

