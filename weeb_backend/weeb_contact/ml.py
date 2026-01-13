from pathlib import Path
from typing import Tuple
import pickle


MODEL_PATH = Path(__file__).resolve().parent.parent / "allocine_model.pkl"


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

    prediction = MODEL.predict([message])[0]

    # Probabilite de la classe positive (1) si disponible.
    try:
        proba = MODEL.predict_proba([message])[0]
        classes = list(MODEL.classes_)
        if 1 in classes:
            score = float(proba[classes.index(1)])
        elif 0 in classes and len(classes) > 1:
            score = 1.0 - float(proba[classes.index(0)])
        else:
            score = float(prediction)
    except Exception:
        # Au cas ou predict_proba n'est pas disponible
        score = float(prediction)

    return int(prediction), score
