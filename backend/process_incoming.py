import pandas as pd 
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np 
import joblib 
import requests


def create_embedding(text_list):
    # https://github.com/ollama/ollama/blob/main/docs/api.md#generate-embeddings
    r = requests.post("http://localhost:11434/api/embed", json={
        "model": "bge-m3",
        "input": text_list
    })

    embedding = r.json()["embeddings"] 
    return embedding

def inference(prompt):
    r = requests.post("http://localhost:11434/api/generate", json={
                # "model": "deepseek-r1",
                "model": "llama3.2",
                "prompt": prompt,
                "stream": False
            })

    response = r.json()
    print(response)
    return response

df = joblib.load('embeddings.joblib')


incoming_query = input("Ask a Question: ")
question_embedding = create_embedding([incoming_query])[0] 

# Find similarities of question_embedding with other embeddings
# print(np.vstack(df['embedding'].values))
# print(np.vstack(df['embedding']).shape)
similarities = cosine_similarity(np.vstack(df['embedding']), [question_embedding]).flatten()
# print(similarities)
top_results = 8
max_indx = similarities.argsort()[::-1][0:top_results]
# print(max_indx)
new_df = df.loc[max_indx] 
# print(new_df[["title", "number", "text"]])

context = new_df[["text"]].to_json(
    orient="records",
    indent=2,
    force_ascii=False
)

prompt = f"""
You are a helpful AI assistant specialized in Artificial Intelligence, Machine Learning, Deep Learning, RAG, LLMs, NLP, Vector Databases, Prompt Engineering, AI Agents, and related topics.

Use the information below to answer the user's question.

Rules:
- Answer naturally as if you already know the information.
- Never mention the knowledge, context, transcripts, videos, JSON files, or retrieved passages.
- Never mention timestamps, titles, chunk IDs, or document names.
- Combine information from multiple passages into one complete answer.
- Explain concepts in your own words instead of copying the text exactly.
- If the answer cannot be found in the provided information, reply exactly:
"I don't have enough information in my knowledge base to answer that."
- Do not invent facts.

Knowledge:
{context}

Question:
{incoming_query}

Answer:
"""

with open("prompt.txt", "w") as f:
    f.write(prompt)

response = inference(prompt)["response"]
print(response)


with open("response.txt", "w") as f:
    f.write(response)

# for index, item in new_df.iterrows():

# print(index, item['title'], item['number'], item['text'], item["start"],item["end"])