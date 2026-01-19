import re
import pickle
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import LinearSVC
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, accuracy_score, confusion_matrix, f1_score


def clean(text: str) -> str:
    text = str(text).lower()
    text = re.sub(r"[^\w\s]", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def load_data(use_allocine: bool = True, path: str = "YoutubeCommentsDataset.csv") -> pd.DataFrame:
    """
    - use_allocine=True : charge le dataset HuggingFace tblard/allocine (colonnes: review, label)
    - use_allocine=False : charge le CSV local (colonnes: Comment, Sentiment)
    """
    if use_allocine:
        try:
            from datasets import load_dataset
        except ImportError as exc:
            raise ImportError("Le paquet 'datasets' est requis pour charger tblard/allocine. `pip install datasets`") from exc

        # Charge le dataset HuggingFace tblard/allocine
        ds = load_dataset("tblard/allocine")
        df = pd.DataFrame(ds["train"])

        # Sous-échantillonnage pour équilibrer les classes et tester plus rapidement
        neg = df[df["label"] == 0].sample(n=5000, random_state=42)
        pos = df[df["label"] == 1].sample(n=5000, random_state=42)
        df = pd.concat([neg, pos]).sample(frac=1, random_state=42)
        # df = pd.concat([pd.DataFrame(ds["train"]), pd.DataFrame(ds["test"])], ignore_index=True)
        df = df.rename(columns={"review": "Comment", "label": "Sentiment"})
        # labels déjà 0/1
    else:
        df = pd.read_csv(path).dropna()
        df = df[df["Sentiment"].str.lower().isin(["negative", "positive"])]
        df["Sentiment"] = df["Sentiment"].str.lower().map({"negative": 0, "positive": 1})

    df["Sentiment"] = pd.to_numeric(df["Sentiment"], errors="coerce")
    df = df[df["Sentiment"].isin([0, 1])]
    df = df.dropna(subset=["Comment", "Sentiment"])
    df["Comment_clean"] = df["Comment"].apply(clean)
    print("Repartition initiale :", df["Sentiment"].value_counts().to_dict())
    return df


def build_pipeline() -> Pipeline:
    """
    Choisir le modèle à tester via MODEL_TYPE :
    - "logreg" : Régression logistique + seuil ajustable si predict_proba dispo
    - "dt"     : DecisionTreeClassifier
    - "rf"     : RandomForestClassifier
    - "linsvc" : LinearSVC (pas de predict_proba)
    """
    MODEL_TYPE = "logreg"  # change ici pour tester "dt", "rf" ou "linsvc"

    if MODEL_TYPE == "logreg":
        clf = LogisticRegression(
            max_iter=2000,
            solver="lbfgs",
            class_weight="balanced",
            C=1.0,  # régularisation plus forte pour limiter l'overfit
        )
    elif MODEL_TYPE == "dt":
        clf = DecisionTreeClassifier(
            class_weight="balanced",
            max_depth=None,
            min_samples_leaf=1,
            min_samples_split=4,
            random_state=42,
        )
    elif MODEL_TYPE == "rf":
        clf = RandomForestClassifier(
            n_estimators=200,
            max_depth=None,
            min_samples_leaf=1,
            min_samples_split=4,
            class_weight="balanced",
            n_jobs=-1,
            random_state=42,
        )
    elif MODEL_TYPE == "linsvc":
        clf = LinearSVC(
            class_weight="balanced",
        )
    else:
        raise ValueError(f"MODEL_TYPE inconnu: {MODEL_TYPE}")

    vectorizer = TfidfVectorizer(
        analyzer="char",
        lowercase=True,
        strip_accents="unicode",
        ngram_range=(3, 5),
        min_df=5,
        max_df=0.90,
        max_features=20000,
    )

    return Pipeline([("tfidf", vectorizer), ("clf", clf)])


def main():
    # Passe use_allocine=True pour utiliser le dataset HuggingFace tblard/allocine
    df = load_data(use_allocine=True, path="YoutubeCommentsDataset.csv")

    print(df.head())
    print(df.shape)
    print(df.info())
    print(df.describe())
    print(df['Sentiment'].value_counts())
    print(df.isnull().sum())

    X = df["Comment_clean"]
    y = df["Sentiment"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    pipe = build_pipeline()
    pipe.fit(X_train, y_train)

    clf = pipe.named_steps["clf"]
    if hasattr(clf, "predict_proba"):
        proba = pipe.predict_proba(X_test)[:, 1]
        THRESHOLD = 0.4  # ajuste ce seuil pour jouer sur le rappel/précision
        y_pred = (proba >= THRESHOLD).astype(int)
        print(f"Threshold: {THRESHOLD}")
    else:
        y_pred = pipe.predict(X_test)
        print("Seuil non applicable (pas de predict_proba).")

    print("Accuracy:", accuracy_score(y_test, y_pred))
    print("Classification Report:\n", classification_report(y_test, y_pred))
    print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred, labels=[0, 1]))
    
    # Suivi rapide du gap train/test pour surveiller l'overfit
    train_pred = pipe.predict(X_train)
    print(
        "train acc/f1:",
        accuracy_score(y_train, train_pred),
        f1_score(y_train, train_pred, average="macro"),
    )
    print(
        "test  acc/f1:",
        accuracy_score(y_test, y_pred),
        f1_score(y_test, y_pred, average="macro"),
    )

    # Sauvegarde du modèle entraîné
    with open("allocine_model.pkl", "wb") as f:
        pickle.dump(pipe, f)
    print("Modèle entraîné et sauvegardé sous 'allocine_model.pkl'")


if __name__ == "__main__":
    main()



