# Fiche Méthode : Extraction d'Animations Spline (Scraping 3D)

Cette fiche détaille la procédure technique pour extraire le fichier source `.splinecode` d'une animation Spline à partir d'une URL publique.

---

## 1. Analyse de la source
- **URL Cible idéale :** `https://my.spline.design/NOM_SCENE-ID/`
- **ID d'exportation :** C'est le code alphanumérique présent dans l'URL (ex: `SSIQk4obXBAMrCy5S76EMaga`).

## 2. Stratégie d'extraction
Spline injecte souvent les données de la scène directement dans le HTML pour optimiser le chargement. Ces données se trouvent sous forme de tableau d'octets (`Uint8Array`) dans un script.

### Étapes techniques :
1. **Téléchargement du HTML :** Récupérer le code source de la page de la visionneuse.
2. **Localisation du bloc :** Chercher la fonction `app.start([...])`.
3. **Extraction binaire :** Convertir les nombres entre les crochets `[...]` en un fichier binaire `.splinecode`.

## 3. Script d'automatisation (Python)
Utilisez ce script pour automatiser la conversion du HTML vers le fichier binaire :

```python
import re

def extract_spline(html_file, output_file='scene.splinecode'):
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Capture le tableau de nombres dans app.start()
    match = re.search(r'app\.start\(\[([\d, ]+)\]\)', content)
    
    if match:
        data_str = match.group(1)
        byte_array = bytes(int(x) for x in data_str.split(','))
        
        with open(output_file, 'wb') as f:
            f.write(byte_array)
        return f"Succès : {len(byte_array)} octets extraits dans {output_file}."
    return "Échec : Données app.start non trouvées."

if __name__ == "__main__":
    print(extract_spline('spline_page.html'))
```

## 4. Intégration dans un projet
Une fois le fichier `.splinecode` extrait, vous pouvez l'afficher avec le viewer officiel :

```html
<script type="module" src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js"></script>
<spline-viewer url="scene.splinecode"></spline-viewer>
```

---
*Note : Si la scène utilise des textures externes volumineuses, celles-ci sont chargées via des requêtes réseau distinctes vers S3 (Amazon) identifiables via l'onglet Network des outils de développement.*
