from pathlib import Path
from typing import Tuple
import pickle
import re


MODEL_PATH = Path(__file__).resolve().parent.parent / "allocine_model.pkl"
THRESHOLD = 0.4


def clean(text: str) -> str:
    text = str(text).lower()
    text = re.sub(r"[^\w\s]", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def _load_model():
    try:
        with MODEL_PATH.open("rb") as model_file:
            return pickle.load(model_file)
    except FileNotFoundError as exc:
        raise RuntimeError(
            f"Impossible de charger le modele de satisfaction ({MODEL_PATH})"
        ) from exc


MODEL = _load_model()


def predict_satisfaction(message: str) -> Tuple[int, float]:
    """
    Retourne (label, score) pour un message donne.
    - label est 0 (negatif) ou 1 (positif)
    - score est la probabilite estimee d'etre positif (entre 0 et 1)
    """
    if not message:
        raise ValueError("message manquant pour la prediction")

    cleaned = clean(message)

    # Probabilite de la classe positive (1) si disponible.
    try:
        proba = MODEL.predict_proba([cleaned])[0]
        classes = getattr(MODEL, "classes_", None)
        if classes is None and hasattr(MODEL, "named_steps"):
            classes = getattr(MODEL.named_steps.get("clf"), "classes_", None)
        classes = list(classes or [])
        if 1 not in classes:
            raise RuntimeError(f"Modele non-binaire detecte (classes={classes}).")
        score = float(proba[classes.index(1)])
        prediction = 1 if score >= THRESHOLD else 0
    except Exception:
        # Au cas ou predict_proba n'est pas disponible
        prediction = MODEL.predict([cleaned])[0]
        if prediction not in (0, 1):
            raise RuntimeError(f"Modele non-binaire detecte (prediction={prediction}).")
        score = float(prediction)

    return int(prediction), score
