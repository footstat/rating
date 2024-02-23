const selectAnnees = document.getElementById('annees');
const table = document.querySelector('.table');

selectAnnees.addEventListener('change', function() {
    const annee = selectAnnees.value;

    fetch('joueur.json')
        .then(response => response.json())
        .then(data => {
            // Supprimer le contenu actuel de la table
            table.innerHTML = '';

            // Créer une ligne d'en-tête pour le tableau
            const headerRow = document.createElement('tr');
            const thJoueur = document.createElement('th');
            const thNote = document.createElement('th');
            thJoueur.textContent = 'Joueur';
            thNote.textContent = 'Note';
            headerRow.appendChild(thJoueur);
            headerRow.appendChild(thNote);
            table.appendChild(headerRow);

            if (annee === 'peak') {
                // Créer un tableau pour stocker les joueurs et leur meilleure note
                const joueursEtPeakNotes = [];
            
                // Parcourir chaque joueur dans les données pour trouver leur meilleure note (peak)
                Object.keys(data).forEach(joueur => {
                    const notes = data[joueur];
                    let peakNote = -Infinity; // Initialiser la meilleure note à -Infinity
            
                    // Rechercher la note maximale du joueur parmi toutes les années
                    Object.values(notes).forEach(note => {
                        if (!isNaN(note) && note > peakNote) {
                            peakNote = note;
                        }
                    });
            
                    // Ajouter le joueur et sa meilleure note à l'array
                    joueursEtPeakNotes.push({ joueur: joueur, peakNote: peakNote });
                });
            
                // Trier les joueurs par leur meilleure note décroissante
                joueursEtPeakNotes.sort((a, b) => b.peakNote - a.peakNote);
            
                // Ajouter chaque joueur trié à la table
                joueursEtPeakNotes.forEach(joueur => {
                    const tr = document.createElement('tr');
                    const tdJoueur = document.createElement('td');
                    const tdNote = document.createElement('td');
                    tdJoueur.textContent = joueur.joueur;
                    tdNote.textContent = joueur.peakNote.toFixed(2); // Affichage de la meilleure note avec deux décimales
                    tr.appendChild(tdJoueur);
                    tr.appendChild(tdNote);
                    table.appendChild(tr);
                });
                        
            }  else if (annee === '1019') {
                // Créer un tableau pour stocker les joueurs et leurs moyennes de notes sur la plage d'années 2010 à 2019
                const joueursEtMoyennes1019 = [];
            
                // Parcourir chaque joueur dans les données pour calculer la moyenne de leurs notes sur la plage d'années 2010 à 2019
                Object.keys(data).forEach(joueur => {
                    const notes = data[joueur];
                    let totalNotes = 0;
                    let nombreAnnees = 0;
            
                    // Calculer la somme des notes pour chaque joueur sur la plage d'années 2010 à 2019
                    for (let i = 2010; i <= 2019; i++) {
                        const note = notes[i];
                        if (!isNaN(note)) {
                            totalNotes += note;
                            nombreAnnees++;
                        }
                    }
            
                    // Calculer la moyenne des notes pour chaque joueur sur la plage d'années 2010 à 2019
                    const moyenne1019 = totalNotes / nombreAnnees;
            
                    // Ajouter le joueur et sa moyenne de notes sur la plage d'années 2010 à 2019 à l'array
                    joueursEtMoyennes1019.push({ joueur: joueur, moyenne1019: moyenne1019 });
                });
            
                // Trier les joueurs par leur moyenne de notes sur la plage d'années 2010 à 2019 décroissante
                joueursEtMoyennes1019.sort((a, b) => b.moyenne1019 - a.moyenne1019);
            
                // Ajouter chaque joueur trié à la table
                joueursEtMoyennes1019.forEach(joueur => {
                    const tr = document.createElement('tr');
                    const tdJoueur = document.createElement('td');
                    const tdNote = document.createElement('td');
                    tdJoueur.textContent = joueur.joueur;
                    tdNote.textContent = joueur.moyenne1019.toFixed(2); // Affichage de la moyenne avec deux décimales
                    tr.appendChild(tdJoueur);
                    tr.appendChild(tdNote);
                    table.appendChild(tr);
                });
            }
            
            
            else if (annee === 'all') {
                // Créer un tableau pour stocker les joueurs et leurs moyennes de notes
                const joueursEtMoyennes = [];
            
                // Parcourir chaque joueur dans les données pour calculer la moyenne de leurs notes
                Object.keys(data).forEach(joueur => {
                    const notes = data[joueur];
                    let totalNotes = 0;
                    let nombreAnnees = 0;
            
                    // Calculer la somme des notes pour chaque joueur
                    Object.values(notes).forEach(note => {
                        if (!isNaN(note)) {
                            totalNotes += note;
                            nombreAnnees++;
                        }
                    });
            
                    // Calculer la moyenne des notes pour chaque joueur
                    const moyenne = totalNotes / nombreAnnees;
            
                    // Ajouter le joueur et sa moyenne de notes à l'array
                    joueursEtMoyennes.push({ joueur: joueur, moyenne: moyenne });
                });
            
                // Trier les joueurs par leur moyenne de notes décroissante
                joueursEtMoyennes.sort((a, b) => b.moyenne - a.moyenne);
            
                // Ajouter chaque joueur trié à la table
                joueursEtMoyennes.forEach(joueur => {
                    const tr = document.createElement('tr');
                    const tdJoueur = document.createElement('td');
                    const tdNote = document.createElement('td');
                    tdJoueur.textContent = joueur.joueur;
                    tdNote.textContent = joueur.moyenne.toFixed(2); // Affichage de la moyenne avec deux décimales
                    tr.appendChild(tdJoueur);
                    tr.appendChild(tdNote);
                    table.appendChild(tr);
                });
            }
            
            else {
                // Créer un tableau pour stocker les joueurs et leurs notes pour l'année sélectionnée
                const joueursEtNotes = [];
            
                // Parcourir chaque joueur dans les données pour obtenir la note de l'année sélectionnée
                Object.keys(data).forEach(joueur => {
                    const notes = data[joueur];
                    const noteAnnee = notes[annee];
                    
                    // Si la note pour l'année sélectionnée existe, ajouter le joueur et sa note à l'array
                    if (!isNaN(noteAnnee)) {
                        joueursEtNotes.push({ joueur: joueur, note: noteAnnee });
                    }
                });
            
                // Trier les joueurs par leur note décroissante
                joueursEtNotes.sort((a, b) => b.note - a.note);
            
                // Ajouter chaque joueur trié à la table
                joueursEtNotes.forEach(joueur => {
                    const tr = document.createElement('tr');
                    const tdJoueur = document.createElement('td');
                    const tdNote = document.createElement('td');
                    tdJoueur.textContent = joueur.joueur;
                    tdNote.textContent = joueur.note.toFixed(2); // Affichage de la note avec deux décimales
                    tr.appendChild(tdJoueur);
                    tr.appendChild(tdNote);
                    table.appendChild(tr);
                });
            }
            
            
            
        })
        .catch(error => console.error('Une erreur s\'est produite :', error));
});
