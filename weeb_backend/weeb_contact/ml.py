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
            f"Impossible de charger le modèle de satisfaction ({MODEL_PATH})"
        ) from exc


MODEL = _load_model()


def predict_satisfaction(message: str) -> Tuple[int, float]:
    """
    Retourne (label, score) pour un message donné.
    - label est 0 (négatif), 1 (neutre) ou 2 (positif)
    - score est la moyenne pondérée des probabilités (entre 0 et 2)
    """
    if not message:
        raise ValueError("message manquant pour la prédiction")

    prediction = MODEL.predict([message])[0]

    # Calcul d'un score moyen en utilisant les probabilités retournées par le modèle
    try:
        proba = MODEL.predict_proba([message])[0]
        classes = MODEL.classes_
        score = sum(int(cls) * float(p) for cls, p in zip(classes, proba))
    except Exception:
        # Au cas où predict_proba n'est pas disponible
        score = float(prediction)

    return int(prediction), score
