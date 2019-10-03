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
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
        [1, "", ""],
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