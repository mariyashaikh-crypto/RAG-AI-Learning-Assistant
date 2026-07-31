# RAG Based AI Assistant - Project Workflow

## Step 1: Collect Learning Resources

* Gather AI and Data Science educational videos from reliable sources.
* Ensure the content covers topics such as Machine Learning, Deep Learning, LLMs, RAG, Prompt Engineering, Vector Databases, NLP, AI Agents, etc.

---

## Step 2: Convert Videos to Audio

* Extract the audio from each video.
* Save the audio files in `.mp3` or `.wav` format for transcription.

---

## Step 3: Transcribe Audio

* Use OpenAI Whisper to convert the audio into text.
* Generate accurate transcripts for every video.

---

## Step 4: Chunk the Transcript

* Split each transcript into smaller meaningful chunks.
* Store metadata such as:

  * Chunk Number
  * Title
  * Start Time
  * End Time
  * Text

---

## Step 5: Store Chunks as JSON

* Save the processed chunks into separate JSON files.
* Place all JSON files inside the **jsons/** folder.

---

## Step 6: Generate Embeddings

* Run **read_chunks.py**.
* Each text chunk is converted into a vector embedding using the **BGE-M3** embedding model through Ollama.
* All embeddings, along with their corresponding chunk information, are stored in **embeddings.joblib**.

---

## Step 7: Accept User Query

* Run **process_incoming.py**.
* The assistant prompts the user to enter a question.

---

## Step 8: Generate Query Embedding

* Convert the user's question into an embedding using the same embedding model (BGE-M3).

---

## Step 9: Perform Semantic Search

* Compare the query embedding with all stored embeddings using **Cosine Similarity**.
* Retrieve the most relevant text chunks related to the user's question.

---

## Step 10: Build the Prompt

* Combine the retrieved chunks into a structured prompt.
* Add clear instructions for the language model to answer naturally and accurately.

---

## Step 11: Generate the Final Response

* Send the prompt to the selected Large Language Model (LLM).
* The LLM generates a coherent, context-aware response based on the retrieved information.

---

## Step 12: Display the Answer

* Present the generated response to the user in natural language.
* The assistant answers the question without exposing internal data such as chunk IDs, timestamps, or document names.

---

# Workflow Summary

```
Videos
   ↓
Extract Audio
   ↓
Transcribe using Whisper
   ↓
Chunk the Transcript
   ↓
Store as JSON Files
   ↓
Generate Embeddings (BGE-M3 + Ollama)
   ↓
Store in embeddings.joblib
   ↓
User Question
   ↓
Generate Query Embedding
   ↓
Cosine Similarity Search
   ↓
Retrieve Relevant Chunks
   ↓
Create Prompt
   ↓
LLM Generates Answer
   ↓
Display Final Response
```
