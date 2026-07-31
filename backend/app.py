from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import requests
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)

# Load embeddings once when the server starts
df = joblib.load("embeddings.joblib")


def create_embedding(text_list):
    r = requests.post(
        "http://localhost:11434/api/embed",
        json={
            "model": "bge-m3",
            "input": text_list
        }
    )
    return r.json()["embeddings"]


def inference(prompt):
    r = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3.2",
            "prompt": prompt,
            "stream": False
        }
    )
    return r.json()["response"]


@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()

    incoming_query = data.get("query", "")

    if not incoming_query:
        return jsonify({"error": "Query is required"}), 400

    question_embedding = create_embedding([incoming_query])[0]

    similarities = cosine_similarity(
        np.vstack(df["embedding"]),
        [question_embedding]
    ).flatten()

    top_results = 8
    max_indx = similarities.argsort()[::-1][:top_results]

    new_df = df.loc[max_indx]

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

    answer = inference(prompt)

    return jsonify({
        "answer": answer
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)