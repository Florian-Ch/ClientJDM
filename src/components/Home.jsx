import React, { Component } from 'react'
import SearchBar from './SearchBar'
import Relation from './Relation'

export default class Home extends Component {
  constructor(props){
    super(props)

    this.switch_sort = React.createRef()
    this.switch = this.switch.bind(this)

    this.state = {
      toggle : false,
      relations :[
        [0, "r_associated", "Il est demandé d'énumérer les termes les plus étroitement associés au mot cible... Ce mot vous fait penser à quoi ?"],
        [1, "r_raff_sem", "Raffinement sémantique vers un usage particulier du terme source"],
        [2, "r_raff_morpho", "Raffinement morphologique vers un usage particulier du terme source"],
        [3, "r_domain", "Il est demandé de fournir des domaines relatifs au mot cible. Par exemple, pour 'corner', on pourra donner les domaines 'football' ou 'sport'."],
        [4, "r_pos", "Partie du discours (Nom, Verbe, Adjectif, Adverbe, etc.)"],
        [5, "r_syn", "Il est demandé d'énumérer les synonymes ou quasi-synonymes de ce terme."],
        [6, "r_isa", "Il est demandé d'énumérer les GENERIQUES/hyperonymes du terme. Par exemple, 'animal' et 'mammifère' sont des génériques de 'chat'."],
        [7, "r_anto", "Il est demandé d'énumérer des contraires du terme. Par exemple, 'chaud' est le contraire de 'froid'."],
        [8, "r_hypo", "Il est demandé d'énumérer des SPECIFIQUES/hyponymes du terme. Par exemple, 'mouche', 'abeille', 'guêpe' pour 'insecte'."],
        [9, "r_has_part", "Il faut donner des PARTIES/constituants/éléments (a pour méronymes) du mot cible. Par exemple, 'voiture' a comme parties : 'porte', 'roue', 'moteur', ..."],
        [10, "r_holo", "Il est démandé d'énumérer des 'TOUT' (a pour holonymes) de l'objet en question. Pour 'main', on aura 'bras', 'corps', 'personne', etc... Le tout est aussi l'ensemble comme 'classe' pour 'élève'."],
        [11, "r_locution", "A partir d'un terme, il est demandé d'énumérer les locutions, expression ou mots composés en rapport avec ce terme. Par exemple, pour 'moulin', ou pourra avoir 'moulin à vent', 'moulin à eau', 'moulin à café'. Pour 'vendre', on pourra avoir 'vendre la peau de l'ours avant de l'avoir tué', 'vendre à perte', etc.."],
        [13, "r_agent", "L'agent (qu'on appelle aussi le sujet) est l'entité qui effectue l'action, OU la subit pour des formes passives ou des verbes d'état. Par exemple, dans - Le chat mange la souris -, l'agent est le chat. Des agents typiques de 'courir' peuvent être 'sportif', 'enfant',... (manger r_agent chat)"],
        [14, "r_patient", "Le patient (qu'on appelle aussi l'objet) est l'entité qui subit l'action. Par exemple dans - Le chat mange la souris -, le patient est la souris. Des patients typiques de manger peuvent être 'viande', 'légume', 'pain', ... (manger r_patient pain)"],
        [15, "r_lieu", "Il est demandé d'énumérer les LIEUX typiques où peut se trouver le terme/objet en question. (carotte r_lieu potager)"],
        [16, "r_instr", "L'instrument est l'objet avec lequel on fait l'action. Dans - Il mange sa salade avec une fourchette -, fourchette est l'instrument. Des instruments typiques de 'tuer' peuvent être 'arme', 'pistolet', 'poison', ... (couper r_instr couteau)"],
        [17, "r_carac", "Pour un terme donné, souvent un objet, il est demandé d'en énumérer les CARACtéristiques (adjectifs) possibles/typiques. Par exemple, 'liquide', 'froide', 'chaude', pour 'eau'."],
        [18, "r_data", "Informations diverses (plutôt d'ordre lexicales)"],
        [19, "r_lemma", "Le lemme (par exemple 'mangent a pour lemme 'manger' ; 'avions' a pour lemme 'avion' ou 'avoir')."],
        [20, "r_has_magn", "La magnification ou amplification, par exemple - forte fièvre - ou - fièvre de cheval - pour fièvre. Ou encore - amour fou - pour amour, - peur bleue - pour peur."],
        [21, "r_has_antimagn", "L'inverse de la magnification, par exemple - bruine - pour pluie."],
        [22, "r_family", "Des mots de la même famille lexicale sont demandés (dérivation morphologique, par exemple). Par exemple, pour 'lait' on pourrait mettre 'laitier', 'laitage', 'laiterie', etc."],
        [23, "r_carac-1", "Quels sont les objets (des noms) possédant typiquement/possiblement la caractérisque suivante ? Par exemple, 'soleil', 'feu', pour 'chaud'."],
        [24, "r_agent-1", "Que peut faire ce SUJET ? (par exemple chat => miauler, griffer, etc.) (chat r_agent-1 manger)"],
        [25, "r_instr-1", "L'instrument est l'objet avec lequel on fait l'action. Dans - Il mange sa salade avec une fourchette -, fourchette est l'instrument. On demande ici, ce qu'on peut faire avec un instrument donné... (scie r_instr-1 scier)"],
        [26, "r_patient-1", "(inverse de r_patient) Que peut-on faire à cet OBJET. Pour 'pomme', on pourrait avoir 'manger', 'croquer', couper', 'éplucher', etc. (pomme r_patient-1 manger)"],
        [27, "r_domain-1", "inverse de r_domain : à un domaine, on associe des termes"],
        [28, "r_lieu-1", "A partir d'un lieu, il est demandé d'énumérer ce qui peut typiquement s'y trouver. Par exemple : Paris r_lieu-1 tour Eiffel"],
        [30, "r_lieu_action", "A partir d'un lieu, énumérer les actions typiques possibles dans ce lieu."],
        [31, "r_action_lieu", "A partir d'une action (un verbe), énumérer les lieux typiques possibles où peut être réalisée cette action."],
        [32, "r_sentiment", "Pour un terme donné, évoquer des mots liés à des SENTIMENTS ou des EMOTIONS que vous pourriez associer à ce terme. Par exemple, la joie, le plaisir, le dégoût, la peur, la haine, l'amour, l'indifférence, l'envie, avoir peur, horrible, etc."],
        [34, "r_manner", "De quelles MANIERES peut être effectuée l'action (le verbe) proposée. Il s'agira d'un adverbe ou d'un équivalent comme une locution adverbiale, par exemple : 'rapidement', 'sur le pouce', 'goulûment', 'salement' ... pour 'manger'."],
        [35, "r_meaning/glose", "Quels SENS/SIGNIFICATIONS pouvez vous donner au terme proposé. Il s'agira de termes (des gloses) évoquant chacun des sens possibles, par exemple : 'forces de l'ordre', 'contrat d'assurance', 'police typographique', ... pour 'police'."],
        [36, "r_infopot", "Information sémantique potentielle"],
        [37, "r_telic_role", "Le rôle télique indique la fonction du nom ou du verbe. Par exemple, couper pour couteau, scier pour scie, etc. C'est le rôle qu'on lui destine communément pour un artéfact, ou bien un rôle qu'on peut attribuer à un objet naturel (réchauffer, éclairer pour soleil)."],
        [38, "r_agentif_role", "De quelle(s) manière(s) peut être CRÉE/CONSTRUIT le terme suivant. On demande des verbes transitifs (le terme en est un complément d'objet) qui DONNENT NAISSANCE à l'entité désignée par le terme, par exemple, 'construire' pour 'maison', 'rédiger'/'imprimer' pour 'livre' ou 'lettre'."],
        [39, "r_verbe-action", "du verbe vers l'action. Par exemple, construire -> construction , jardiner -> jardinage . C'est un terme directement dérivé (ayant la même racine). Applicable que pour un verbe et inverse de la relation 40 (action vers verbe)."],
        [40, "r_action-verbe", "de l'action vers le verbe. Par exemple, construction -> construire, jardinage -> jardiner. C'est un terme directement dérivé (ayant la même racine). Applicable que pour un nom et inverse de la relation 39 (verbe vers action)."],
        [41, "r_conseq", "B (que vous devez donner) est une CONSEQUENCE possible de A. A et B sont des verbes ou des noms. Exemples : tomber -> se blesser ; faim -> voler ; allumer -> incendie ; négligence --> accident ; etc."],
        [42, "r_causatif", "B (que vous devez donner) est une CAUSE possible de A. A et B sont des verbes ou des noms. Exemples : se blesser -> tomber ; vol -> pauvreté ; incendie -> négligence ; mort --> maladie ; etc."],
        [43, "r_adj-verbe", "Pour un adjectif de potentialité/possibilité, son verbe correspondant. Par exemple pour 'lavable' -> 'laver'"],
        [44, "r_verbe-adj", "Pour un verbe, son adjectif de potentialité/possibilité correspondant. Par exemple pour 'laver' -> 'lavable'"],
        [49, "r_time", "Donner une valeur temporelle -quel moment- peut-on associer au terme indiqué (par exemple 'dormir' -> nuit, 'bronzer' -> été, 'fatigue' -> 'soir')"],
        [50, "r_object>mater", "Quel est la ou les MATIERE/SUBSTANCE pouvant composer l'objet qui suit. Par exemple, 'bois' pour 'poutre'."],
        [51, "r_mater>object", "Quel est la ou les CHOSES qui sont composés de la MATIERE/SUBSTANCE qui suit (exemple 'bois' -> poutre, table, ...)."],
        [52, "r_successeur-time", "Qu'est ce qui peut SUIVRE temporellement (par exemple Noêl -> jour de l'an, guerre -> paix, jour -> nuit, pluie -> beau temps, repas -> sieste, etc) le terme suivant :"],
        [53, "r_make", "Que peut PRODUIRE le terme ? (par exemple abeille -> miel, usine -> voiture, agriculteur -> blé, moteur -> gaz carbonique ...)"],
        [54, "r_product_of", "Le terme est le RESULTAT/PRODUIT de qui/quoi ?"],
        [55, "r_against", "A quoi le terme suivant S'OPPOSE/COMBAT/EMPECHE ? Par exemple, un médicament s'oppose à la maladie."],
        [56, "r_against-1", "Inverse de r_against (s'oppose à) - a comme opposition active (S'OPPOSE/COMBAT/EMPECHE). Par exemple, une bactérie à comme opposition antibiotique."],
        [57, "r_implication", "Qu'est-ce que le terme implique logiquement ? Par exemple : ronfler implique dormir, courir implique se déplacer, câlin implique contact physique. (attention ce n'est pas la cause ni le but...)"],
        [58, "r_quantificateur", "Quantificateur(s) typique(s) pour le terme, indiquant une quantité. Par exemples, sucre -> grain, morceau - sel -> grain, pincée - herbe -> brin, touffe - ..."],
        [59, "r_masc", "L'équivalent masculin du terme : lionne --> lion."],
        [60, "r_fem", "L'équivalent féminin du terme : lion --> lionne."],
        [61, "r_equiv", "Termes strictement équivalent/identique : acronymes et sigles (PS -> parti socialiste), apocopes (ciné -> cinéma), entités nommées (Louis XIV -> Le roi soleil), etc. (attention il ne s'agit pas de synonyme)"],
        [62, "r_manner-1", "Quelles ACTIONS (verbes) peut-on effectuer de cette manière ? Par exemple, rapidement -> courir, manger, ..."],
        [63, "r_agentive_implication", "Les verbes ou actions qui sont impliqués dans la création de l'objet. Par exemple pour 'construire' un livre, il faut, imprimer, relier, brocher, etc. Il s'agit des étapes nécessaires à la réalisation du rôle agentif."],
        [64, "r_has_instance", "Une instance d'un 'type' est un individu particulier de ce type. Il s'agit d'une entité nommée (personne, lieu, organisation, etc) - par exemple, 'cheval' a pour instance possible 'Jolly Jumper', ou encore 'transatlantique' a pour instance possible 'Titanic'."],
        [65, "r_verb_real", "Pour un verbe, celui qui réalise l'action (par dérivation morphologique). Par exemple, chasser -> chasseur, naviguer -> navigateur."],
        [67, "r_similar", "Similaire/ressemble à ; par exemple le congre est similaire à une anguille, ..."],
        [68, "r_set>item", "Quel est l'ELEMENT qui compose l'ENSEMBLE qui suit (par exemple, un essaim est composé d'abeilles)"],
        [69, "r_item>set", "Quel est l'ENSEMBLE qui est composé de l'ELEMENT qui suit (par exemple, un essaim est composé d'abeilles)"],
        [70, "r_processus>agent", "Quel est l'acteur de ce processus/événement ? Par exemple, 'nettoyage' peut avoir comme acteur 'technicien de surface'."],
        [71, "r_variante", "Variantes du termes cible. Par exemple, yaourt, yahourt, ou encore évènement, événement."],
        [72, "r_syn_strict", "Termes strictement substituables, pour des termes hors du domaine général, et pour la plupart des noms (exemple : endométriose intra-utérine --> adénomyose)"],
        [73, "r_is_smaller_than", "Qu'est-ce qui est physiquement plus gros que... (la comparaison doit être pertinente)"],
        [74, "r_is_bigger_than", "Qu'est-ce qui est physiquement moins gros que... (la comparaison doit être pertinente)"],
        [75, "r_accomp", "Est souvent accompagné de, se trouve avec... Par exemple : Astérix et Obelix, le pain et le fromage, les fraises et la chantilly."],
        [76, "r_processus>patient", "Quel est le patient de ce processus/événement ? Par exemple, 'découpe' peut avoir comme patient 'viande'."],
        [77, "r_verb_ppas", "Le participe passé (au masculin singulier) du verbe infinitif. Par exemple, pour manger => mangé"],
        [78, "r_cohypo", "Il est demandé d'énumérer les CO-HYPONYMES du terme. Par exemple, 'chat' et 'tigre' sont des co-hyponymes (de 'félin')."],
        [79, "r_verb_ppre", "Le participe présent(au masculin singulier) du verbe infinitif. Par exemple, pour manger => mangeant"],
        [80, "r_processus>instr", "Quel est l'instrument/moyen de ce processus/événement ? Par exemple, 'découpe' peut avoir comme instrument 'couteau'."],
        [99, "r_der_morpho", "Des termes dériviés morphologiquement sont demandés). Par exemple, pour 'lait' on pourrait mettre 'laitier', 'laitage', 'laiterie', etc. (mais pas 'lactose'). Pour 'jardin', on mettra 'jardinier', 'jardinage', 'jardiner', etc."],
        [100, "r_has_auteur", "Quel est l'auteur de l'oeuvre suivante ?"],
        [101, "r_has_personnage", "Quels sont les personnages présents dans l'oeuvre qui suit ?"],
        [102, "r_can_eat", "De quoi peut se nourir l'animal suivant ?"],
        [103, "r_has_actors", "A comme acteurs (pour un film ou similaire)."],
        [104, "r_deplac_mode", "Mode de déplacement. chat r_deplac_node marche"],
        [105, "r_has_interpret", "Interprète de personnages (cinéma ou théâtre)"],
        [106, "r_color", "A comme couleur(s)... chat r_color noir"],
        [107, "r_cible", "Cible de la maladie : myxomatose => lapin, rougeole => enfant, ..."],
        [108, "r_symptomes", "Symptomes de la maladie : myxomatose => yeux rouges, rougeole => boutons, ..."],
        [109, "r_predecesseur-time", "Qu'est ce qui peut PRECEDER temporellement (par exemple - inverse de successeur) le terme suivant :"],
        [110, "r_diagnostique", "Diagnostique pour la maladie : diabète => prise de sang, rougeole => examen clinique, ..."],
        [111, "r_predecesseur-space", "Qu'est ce qui peut PRECEDER spatialement (par exemple - inverse de successeur spatial) le terme suivant :"],
        [112, "r_successeur-space", "Qu'est ce qui peut SUIVRE spatialement (par exemple Locomotive à vapeur -> tender, wagon etc.) le terme suivant :"],
        [113, "r_social_tie", "Relation sociale/familliale entre les individus... (annotation pour la nature exacte : frère, mari, etc.)"],
        [114, "r_tributary", "Tributaire de (physique ou spatial)."],
        [115, "r_sentiment-1", "Pour un SENTIMENT ou EMOTION donné, il est demandé d’énumérer les termes que vous pourriez associer. Par exemple, pour 'joie', on aurait 'cadeau', 'naissance', 'bonne nouvelle', etc."],
        [116, "r_linked-with", "A quoi est-ce relié (un wagon est relié à un autre wagon ou à une locomotive) ?"],
        [117, "r_foncteur", "La fonction de ce terme par rapport à d'autres. Pour les prépositions notamment, 'chez' => relation r_location. (demande un type de relation comme valeur)"],
        [119, "r_but", "But de l'action (nom ou verbe)"],
        [120, "r_but-1", "Quel sont les actions ou verbes qui ont le terme cible comme but ?"],
        [121, "r_own", "Que POSSEDE le terme suivant ? (un soldat possède un fusil, une cavalière des bottes, ... soldat r_own fusil, ...)"],
        [122, "r_own-1", "Par qui ou quoi EST POSSEDE le terme suivant ? (par exemple, fusil r_own-1 soldat)"],
        [123, "r_verb_aux", "Auxiliaire utilisé pour ce verbe"],
        [124, "r_predecesseur-logic", "Qu'est ce qui peut PRECEDER logiquement (par exemple : A précède B - inverse de successeur logique) le terme suivant :"],
        [125, "r_successeur-logic", "Qu'est ce qui peut SUIVRE logiquement (par exemple A -> B, C etc.) le terme suivant :"],
        [126, "r_isa-incompatible", "Relation d'incompatibilité pour les génériques. Si A r_isa-incompatible B alors X ne peut pas être à la fois A et B ou alors X est polysémique. Par exemple, poisson r_isa-incompatible oiseau. Colin est à la fois un oiseau et un poisson, donc colin est polysémique."],
        [127, "r_incompatible", "Relation d'incompatibilité, ne doivent pas être présents ensemble. Par exemple, alcool r_incompatible antibiotique."],
        [128, "r_node2relnode", "Relation entre un noeud (quelconque) et un noeud de relation (type = 10) - permet de rendre le graphe connexe même avec les annotations de relations"],
        [129, "r_require", "Il est demandé d'énumérer les termes nécessaires au mot mot cible... Par exemple, 'se reposer' => 'calme', ou 'pain' => 'farine'."],
        [130, "r_is_instance_of", "Une instance est un individu particulier. Il s'agit d'une entité nommée (personne, lieu, organisation, etc) - par exemple, 'Jolly Jumper' est une instance de 'cheval', 'Titanic' en est une de 'transatlantique'."],
        [131, "r_is_concerned_by", "A peut être concerné par B. Par exemple, une personne a un rendez-vous a une maladie, une idée, une opinion, etc..."],
        [132, "r_symptomes-1", "Inverse de symptômes de la maladie : myxomatose => yeux rouges, rougeole => boutons, ..."],
        [133, "r_units", "A comme unités pour une propriété, ou une mesure. Par exemple vitesse a pour unités m/s ou km/h, etc."],
        [134, "r_promote", "Qu'est-ce que le terme suivant FAVORISE ? Par exemple, un catalyseur favorise une réaction chimique."],
        [135, "r_circumstances", "Les circonstances possibles pour un événements, ou un objet"],
        [149, "r_compl_agent", "Le complément d'agent est celui qui effectue l'action dans les formes passives. Par exemple, pour 'être mangé', la souris est l'agent et le chat le complément d'agent."],
        [150, "r_beneficiaire", "Le bénéficiaire est l'entité qui tire bénéfice/préjudice de l'action (un complément d'objet indirect introduit par 'à', 'pour', ...). Par exemple dans - La sorcière donne une pomme à Blanche Neige -, la bénéficiaire est Blanche Neige ... enfin, bref, vous avez compris l'idée."],
        [151, "r_descend_de", "Descend de (évolution)..."],
        [152, "r_domain_subst", "Quels sont le ou les domaines de substitution pour ce terme quand il est utilisé comme domaine (par exemple, 'muscle' => 'anatomie du système musculaire')"],
        [153, "r_prop", "Pour le terme donné, il faut indiquer les noms de propriétés pertinents (par exemple pour 'voiture', le 'prix', la 'puissance', la 'longueur', le 'poids', etc. On ne met que des noms et pas des adjectifs)."],
        [154, "r_activ_voice", "Pour un verbe à la voix passive, sa voix active. Par exemple, pour 'être mangé' on aura 'manger'."],
        [155, "r_make_use_of", "Peut utiliser un objet ou produit (par exemple électricité pour frigo)."],
        [156, "r_is_used_by", "Est utilisé par (par exemple essence pour voiture)."],
        [157, "r_adj-nomprop", "Pour un adjectif, donner le nom de propriété correspondant. Par exemple, pour 'friable' -> 'friabilité'"],
        [158, "r_nomprop-adj", "Pour un nom de propriété, donner l'adjectif correspondant. Par exemple, pour 'friabilité' -> 'friable'"],
        [159, "r_adj-adv", "Pour un adjectif, donner l'adverbe correspondant. Par exemple, pour 'rapide' -> 'rapidement'"],
        [160, "r_adv-adj", "Pour un adverbe, donner l'adjectif correspondant. Par exemple, pour 'rapidement' -> 'rapide'"],
        [161, "r_homophone", "Il est demandé d'énumérer les homophones ou quasi-homophones de ce terme."],
        [162, "r_potential_confusion", "Confusion potentielle avec un autre terme (par exemple, acre et âcre, détonner et détoner)."],
        [163, "r_concerning", "Qui concerne quelque chose ou quelqu'un. Par exemple: maladie r_concerning personne, ou disparition r_concerning emploi. (inverse de r_is_concerned_by)"],
        [164, "r_adj>nom", "Le nom associé à l'adjectif. Par exemple, 'urinaire' -> 'urine'"],
        [165, "r_nom>adj", "L'adjectif associé au nom. Par exemple, 'urine' -> 'urinaire'"],
        [166, "r_opinion_of", "L'opinion de tel groupe ou telle personne. Utilisé comme relation d'annotation."],
        [200, "r_context", "Relation de contexte entre un terme et un noeud contexte."],
        [333, "r_translation", "Traduction vers une autre langue."],
        [444, "r_link", "Lien vers une ressource externe (WordNet, RadLex, UMLS, Wikipedia, etc...)"],
        [555, "r_cooccurrence", "co-occurences (non utilisée)"],
        [666, "r_aki", "(TOTAKI) equivalent pour TOTAKI de l'association libre"],
        [777, "r_wiki", "Associations issues de wikipedia..."],
        [997, "r_annotation_exception", "Relation pour indiquer qu'il s'agit d'une exception par rapport à la cible. L'autruche ne vole pas, et c'est une exception par rapport à l'oiseau prototypique."],
        [998, "r_annotation", "Relation pour annoter (de façon générale) des relations"],
        [999, "r_inhib", "relation d'inhibition, le terme inhibe les termes suivants... ce terme a tendance à exclure le terme associé."],
        [2000, "r_raff_sem-1", "Inverse de r_raff_sem (automatique)"]
      ]
    }
  }

  switch(){
    if(!this.state.toggle)
      this.switch_sort.current.textContent = "Tri alphabétique"
    else
      this.switch_sort.current.textContent = "Tri par poids"
    this.setState({toggle : !this.state.toggle})
  }

  render() {
    return (
      <div className="container">
        <div className="row"> {/* ligne de titre */}
          <h1>Client Jeux de mots</h1>
        </div>

        <div className="row"> {/* ligne des options */}
          <div className="col">
            <div className="input-group mb-3" style={{flexWrap: "nowrap"}}>
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">Nombre d'entrées à afficher</span>
              </div>
              <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" style={{width:"50px", flex:0}}/>
            </div>
          </div>
          <div className="col">
            <div className="btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-secondary active" onClick={this.switch} ref={this.switch_sort}>
                <input type="checkbox"/> Tri par poids
              </label>
            </div>
          </div>
        </div>

        <div className="row"> {/* ligne de barre de recherche */}
          <SearchBar/>
        </div>

        <div className="row"> {/* ligne de résultats */}
          <div className="col" style={{maxWidth:"fit-content", minWidth:"fit-content"}}>
            <div className="row">
              Relations à afficher
            </div>
            {
              this.state.relations.map( (r,i) => <Relation key={i} name = {r[1]} title = {r[2]}/> )
            }
          </div>
          <div className="col">
            Résultats
          </div>
        </div>
      </div>
    )
  }
}