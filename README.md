# ID.4 — Suivi LLD (iPhone 15) — version 17

Application web mobile autonome pour suivre le forfait kilométrique et les dépenses d'une Volkswagen ID.4 en LLD, avec une estimation mixte et des graphes tactiles.

## Fichiers
- `index.html` : application
- `manifest.webmanifest` : paramètres d'installation
- `apple-touch-icon.png` : icône iOS
- `icon-512.png` : icône PWA
- `sw.js` : cache hors ligne après première visite

## Publier avec GitHub Pages
1. Crée un dépôt GitHub (par exemple `id4-suivi-lld`).
2. Ajoute tous les fichiers de ce dossier à la racine du dépôt.
3. Ouvre **Settings → Pages**.
4. Dans **Build and deployment**, sélectionne **Deploy from a branch**, branche `main`, dossier `/(root)`, puis **Save**.
5. Attends la publication et ouvre l'URL `https://TON-PSEUDO.github.io/id4-suivi-lld/`.
6. Sur l'iPhone 15, ouvre cette URL dans Safari → bouton Partager → **Sur l'écran d'accueil** → active **Ouvrir comme app web** si proposé → **Ajouter**.

## Contrat préconfiguré
- Début : 1 juin 2026
- Fin : 1 juin 2029
- Forfait : 45 000 km
- Loyer : 486,61 €/mois, 36 mensualités calculées

## Calcul kilométrique et graphes
- Renseigne le kilométrage compteur à la livraison dans l’onglet **Compteur** pour calculer les kilomètres réellement parcourus pendant le contrat. Par défaut, il vaut 0 km.
- La projection utilise la moyenne globale et le rythme récent (fenêtre mesurée comprise entre 30 et 120 jours) avec une pondération de 60 % / 40 % lorsque les deux mesures existent. Une fourchette est affichée en supplément.
- Sur l’accueil, touche ou maintiens **Projection fin de contrat** pour voir les dates, les valeurs et les formules utilisées.
- Dans **Graphes**, les points et barres peuvent être touchés pour afficher les valeurs. La courbe orange indique la trajectoire théorique vers 45 000 km au 1er juin 2029.

## Données et confidentialité
Les relevés et dépenses sont enregistrés dans `localStorage` du navigateur sur l'appareil. Ils ne sont pas transmis à GitHub ni synchronisés entre appareils. Utilise régulièrement **Historique → Exporter** pour créer une sauvegarde JSON. Si tu effaces les données du navigateur, elles peuvent être perdues.

GitHub Pages sert généralement les sites publiés via `github.io` en HTTPS. Un dépôt public rend le code source visible : ne mets aucune donnée personnelle réelle dans les fichiers du dépôt. Les relevés saisis dans l'application restent côté navigateur.

## Mise à jour locale
- Ajout d’un onglet **Charge** avec calcul de batterie (77 kWh), énergie, durée, heure de fin, prix, courbe tactile et calcul de durée entre deux heures.
- Thème du calculateur harmonisé avec le thème bleu nuit/cyan de l’application.
- La navigation inférieure comprend six boutons sur une seule ligne.
- Le statut kilométrique affiche la marge ou le dépassement par rapport à la trajectoire théorique à la date du dernier relevé.
- La projection mixte utilise une tendance globale et une régression linéaire des relevés récents (fenêtre de 120 jours, au moins 30 jours d’écart); pondération 60/40 et fourchette d’incertitude indicative.
- Pour tester : ouvrir `index.html` localement. Les fonctions PWA/service worker ne s’activent pas en `file://`; aucun déploiement n’est effectué.


## Version 3 — interface compacte iPhone
- Accueil simplifié : retrait des dernières opérations ; aide sur le coût global accessible au toucher.
- Compteur simplifié : retrait des repères et de l'historique dans cet onglet ; aides détaillées accessibles par l'icône « i ».
- Dépenses compactes pour afficher le formulaire et le résumé sans défilement sur un iPhone 15 en mode application.
- Onglet Charge : palette claire à contraste renforcé, courbe sur toute la largeur, interface compactée sur les fenêtres basses.
- Onglet Graphes : diagrammes bord à bord, empilés verticalement ; le doigt déplace la lecture de valeurs sur les courbes.
- Cache du service worker passé en v5 pour déclencher la mise à jour des fichiers mis en cache.


## Version 6 — relevés datés dans le futur
- Le graphe « Kilomètres parcourus et cible » affiche maintenant tous les relevés saisis à partir du début du contrat, y compris les dates futures comme celles de 2029.
- L’axe horizontal est prolongé si un relevé est daté après le 1er juin 2029 ; la trajectoire théorique reste définie jusqu’au terme du contrat, à 45 000 km.
- La projection à ce jour sur l’accueil continue d’utiliser seulement les relevés datés au plus tard aujourd’hui.
- Cache du service worker renouvelé afin de favoriser la prise en compte de la mise à jour.


## Version 15 — Navigation tactile

- Balayage horizontal sur les pages : droite vers gauche pour passer à l’onglet suivant ; gauche vers droite pour revenir à l’onglet précédent.
- Les champs, boutons, liens, fenêtres modales et graphiques conservent leurs interactions habituelles.
