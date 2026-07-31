import os
import json
import time
import requests
import pandas as pd
import joblib


def create_embedding(text_list):
    MAX_RETRIES = 5

    for attempt in range(MAX_RETRIES):
        try:
            r = requests.post(
                "http://localhost:11434/api/embed",
                json={
                    "model": "bge-m3",
                    "input": text_list
                },
                timeout=600
            )

            if r.status_code == 200:
                return r.json()["embeddings"]

            print(f"\nAttempt {attempt + 1}")
            print("Status Code:", r.status_code)
            print("Response:", r.text)

            # If Ollama temporarily loses the tokenizer/model, retry
            if "tokenize" in r.text:
                print("Retrying after tokenizer error...")
                time.sleep(5)

        except Exception as e:
            print(f"Retry {attempt + 1}: {e}")
            time.sleep(5)

    raise Exception("Failed to create embeddings after multiple retries.")


# -----------------------------
# Read all JSON files
# -----------------------------
jsons = sorted(os.listdir("jsons"))

my_dicts = []
chunk_id = 0

for json_file in jsons:

    with open(os.path.join("jsons", json_file), "r", encoding="utf-8") as f:
        content = json.load(f)

    print(f"\nCreating Embeddings for {json_file}")

    texts = [chunk["text"] for chunk in content["chunks"]]

    embeddings = []

    # Process in batches
    BATCH_SIZE = 20

    for i in range(0, len(texts), BATCH_SIZE):
        batch = texts[i:i + BATCH_SIZE]
        batch_embeddings = create_embedding(batch)
        embeddings.extend(batch_embeddings)

    print(f"Chunks: {len(content['chunks'])}")
    print(f"Embeddings: {len(embeddings)}")

    if len(embeddings) != len(content["chunks"]):
        raise Exception(
            f"Mismatch in {json_file}: "
            f"{len(content['chunks'])} chunks but "
            f"{len(embeddings)} embeddings."
        )

    for i, chunk in enumerate(content["chunks"]):

        my_dicts.append({
            "chunk_id": chunk_id,
            "number": chunk.get("number"),
            "title": chunk.get("title"),
            "start": chunk.get("start"),
            "end": chunk.get("end"),
            "text": chunk.get("text"),
            "embedding": embeddings[i]
        })

        chunk_id += 1


# -----------------------------
# Create DataFrame
# -----------------------------
df = pd.DataFrame(my_dicts)

print("\n===================================")
print("Embedding Generation Completed!")
print("===================================")
print("Total Chunks:", len(df))
print(df.head())

# -----------------------------
# Save DataFrame
# -----------------------------
joblib.dump(df, "embeddings.joblib")

print("\nSaved embeddings.joblib successfully!")