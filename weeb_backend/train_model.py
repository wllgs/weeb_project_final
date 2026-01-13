import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, accuracy_score, confusion_matrix
import pickle
import sys

# Charger le dataset
df = pd.read_csv("YoutubeCommentsDataset.csv")

# Enlever les cellules avec des valeurs manquantes
df = df.dropna()

# Encoder la colonne de satisfaction (Sentiment)
df["Sentiment"] = LabelEncoder().fit_transform(df["Sentiment"]) 

# Séparer les commentaires et la satisfaction
X = df["Comment"]
y = df["Sentiment"] 

# Vectoriser les commentaires en utilisant TF-IDF
pipe = Pipeline([
    ("tfidf", TfidfVectorizer(
        lowercase=True,
        strip_accents="unicode",
        ngram_range=(1, 2),   # unigrams + bigrams
        min_df=2,
        max_df=0.95
    )),
    ("clf", LogisticRegression(
        max_iter=1000,
        solver="lbfgs",       # OK pour le multiclasse
        multi_class="auto",
        class_weight=None     # mets "balanced" si tes classes sont très déséquilibrées
    ))
])

# Entrainer le modèle de régression logistique
pipe.fit(X, y)

# Sauvegarder le modèle entraîné
with open("allocine_model.pkl", "wb") as f:
    pickle.dump(pipe, f)

print("Modèle entraîné et sauvegardé sous 'allocine_model.pkl'")
