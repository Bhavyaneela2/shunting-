import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import StratifiedShuffleSplit
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import LabelEncoder
from collections import Counter
import itertools

# 1️⃣ Updated Dataset (More Sequences for Balance)
data = {
    "sequence": [
        "ATCGTACGTA", "CGTACGTAGC", "TTAGCGTACG", "ATCGTACGTT",
        "CGTACGTAGT", "TTAGCGTACC", "ATCGTACGGA", "CGTACGTAGG",
        "GATCGTACGA", "TTCGGTACGT", "AACGTACGTT", "TTAGCGTACC",
        "CGTACGATGC", "TGCATCGTAG", "CGTAGTACGC", "AGTCGATGCA"
    ],
    "label": [
        "GeneA", "GeneB", "GeneA", "GeneB", "GeneA", "GeneB", "GeneA", "GeneB",
        "GeneA", "GeneB", "GeneA", "GeneB", "GeneA", "GeneB", "GeneA", "GeneB"
    ]
}

df = pd.DataFrame(data)

# 2️⃣ Convert DNA Sequences into k-mer Features
def get_kmers(sequence, k=3):
    return ["".join(sequence[i:i+k]) for i in range(len(sequence) - k + 1)]

def extract_features(sequences, k=3):
    kmer_list = list(itertools.product("ACGT", repeat=k))
    kmer_features = ["".join(kmer) for kmer in kmer_list]
    
    feature_matrix = []
    for seq in sequences:
        kmers = get_kmers(seq, k)
        kmer_counts = Counter(kmers)
        feature_matrix.append([kmer_counts[k] if k in kmer_counts else 0 for k in kmer_features])
    
    return np.array(feature_matrix)

# Extract k-mer features
X = extract_features(df["sequence"], k=3)

# 3️⃣ Encode Labels
le = LabelEncoder()
y = le.fit_transform(df["label"])

# 4️⃣ Ensure Balanced Train-Test Split
sss = StratifiedShuffleSplit(n_splits=1, test_size=0.2, random_state=42)
for train_index, test_index in sss.split(X, y):
    X_train, X_test = X[train_index], X[test_index]
    y_train, y_test = y[train_index], y[test_index]

# 5️⃣ Check Class Distribution
print("Training Class Distribution:\n", pd.Series(y_train).value_counts())
print("Test Class Distribution:\n", pd.Series(y_test).value_counts())

# 6️⃣ Train the Model (Increased Estimators)
clf = RandomForestClassifier(n_estimators=200, random_state=42)
clf.fit(X_train, y_train)

# 7️⃣ Make Predictions
y_pred = clf.predict(X_test)

# 8️⃣ Evaluate the Model (Handle Zero Division)
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2f}")
print("Classification Report:\n", classification_report(y_test, y_pred, target_names=le.classes_, zero_division=1))

# 9️⃣ Test with a New Sequence
new_seq = ["ATCGTACGTT"]  # Example input
new_features = extract_features(new_seq, k=3)
prediction = clf.predict(new_features)
predicted_label = le.inverse_transform(prediction)[0]

print(f"Predicted Class for '{new_seq[0]}': {predicted_label}")