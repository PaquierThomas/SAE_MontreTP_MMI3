import sqlite3

# Connexion à la base de données
conn = sqlite3.connect('DB_MontreSAE.db')
cursor = conn.cursor()

# Ajout de la colonne 'cart_name' à la table 'Paniers' (si elle n'existe pas déjà)
cursor.execute('PRAGMA foreign_keys = ON;')
cursor.execute('ALTER TABLE Paniers ADD COLUMN cart_name TEXT;')

# Exemple de données pour les paniers et les montres dans le panier avec leur nom de panier
paniers = [
    ('Panier de Thomas', 1),  # Panier pour Thomas
    ('Panier d\'Emma', 2),   # Panier pour Emma
    ('Panier de William', 3),  # Panier pour William
    # Ajoutez d'autres paniers ici...
]

montres_dans_le_panier = [
    (1, 1),  # Montre dans le panier de Thomas
    (2, 2),  # Montre dans le panier d'Emma
    (3, 3),  # Montre dans le panier de William
    # Ajoutez d'autres montres dans le panier ici...
]

# Ajout des données pour les paniers dans la table 'Paniers' avec la colonne 'cart_name'
cursor.executemany('INSERT INTO Paniers (cart_name, user_id) VALUES (?, ?)', paniers)

# Ajout des données pour les montres dans le panier dans la table 'MontresDansLePanier'
cursor.executemany('INSERT INTO MontresDansLePanier (cart_id, config_id) VALUES (?, ?)', montres_dans_le_panier)

# Validation de la transaction et sauvegarde des modifications
conn.commit()

# Fermeture de la connexion à la base de données
conn.close()
