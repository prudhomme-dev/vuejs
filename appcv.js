let information = {
    template: `<section class="information">
    <h2 class="poste">{{intitule|capitale}}</h2>
    <h2>{{nom|capitale}} {{prenom | capitaleprem}}</h2>
    <div class="flex">
    <img v-if="urlphoto" :src="urlphoto" :alt="nom">
    <div class="info">
    <p v-if="age">Age : {{age}} ({{datenaissance|dateFr}})</p>
    <p v-if="adresse">Adresse : {{adresse}}</p>
    <p v-if="!voiture" class="voitureNo">Voiture : Non</p>
    <p v-else class="voitureYes">Voiture : Oui</p></div>
    </div>
    </section>`,
    filters: {
        capitale: function (value) {
            return value.toUpperCase()
        },
        capitaleprem: function (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        },
        dateFr: function (value) {
            dateAChanger = new Date(value);
            return dateAChanger.toLocaleDateString("fr-FR");
        }
    },
    computed: {
        age: function () {
            let aujourdhui = new Date();
            let anniversaire = new Date(this.datenaissance);
            return Math.floor((aujourdhui.getTime() - anniversaire.getTime()) / 31557600000);

        }
    },
    props: ['nom', 'prenom', 'datenaissance', 'adresse', 'voiture', 'intitule', 'urlphoto']
}

let ExperiencePro = {
    template: `<section v-if="experiencepro.length > 0" class="experiencePro">
    <h2>Expériences Professionnelles</h2>
    <ul>
        <li v-for="ex of experiencepro">{{ex.experience}} - du {{ex.dateDebut|dateFr}} au {{ex.dateFin|dateFr}} - {{ex.intPoste}}</li>

    </ul>
    </section>`,
    props: ['experiencepro'],
    filters: {
        dateFr: function (value) {
            dateAChanger = new Date(value);
            return dateAChanger.toLocaleDateString("fr-FR");
        }
    }
}


let Formation = {
    template: `<section v-if="formations.length > 0" class="formation">
    <h2>Formation</h2>
    <ul>
        <li v-for="fm of formations">{{fm.nomFormation}} - du {{fm.dateDebut|dateFr}} au {{fm.dateFin|dateFr}}</li>

    </ul>
    </section>`,
    props: ['formations'],
    filters: {
        dateFr: function (value) {
            dateAChanger = new Date(value);
            return dateAChanger.toLocaleDateString("fr-FR");
        }
    }
}

let Competences = {
    template: `<section v-if="competences.length > 0" class="competence">
    <h2>Compétences</h2>
    <ul>
        <li v-for="cp of competences">{{cp | capitaleprem}}</li>

    </ul>
    </section>`,
    filters: {
        capitaleprem: function (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    },
    props: ['competences']
}

let listecompetences = {
    template: `
    <section v-if="competences.length > 0" class="competence">
    <p> Supprimer une compétence : 
    <select id="listeCompetences">
    <option v-for="competence of competences" :value="competence">{{competence}}</option>
    </select>
    <button v-on:click="competenceSupprimer()">Supprimer</button>
    </p>
    </section>
    `,
    props: ['competences'],
    methods: {
        competenceSupprimer: function () {
            if (confirm("Voulez-vous supprimer la compétence " + document.querySelector("#listeCompetences").value + " ?")) {
                this.competences.splice(document.querySelector("#listeCompetences").selectedIndex, 1)
            }
        }
    }
}

let listeformations = {
    template: `
    <section v-if="formations.length > 0" class="formation">
    <p> Supprimer une formation : 
    <select id="listeFormations">
    <option v-for="formation of formations" :value="formation.nomFormation">{{formation.nomFormation}}</option>
    </select>
    <button v-on:click="formationSupprimer()">Supprimer</button>
    </p>
    </section>
    `,
    props: ['formations'],
    methods: {
        formationSupprimer: function () {
            if (confirm("Voulez-vous supprimer la formation " + document.querySelector("#listeFormations").value + " ?")) {
                this.formations.splice(document.querySelector("#listeFormations").selectedIndex, 1)
            }
        }
    }
}

let listeexppro = {
    template: `
    <section v-if="experiences.length > 0" class="formation">
    <p> Supprimer une expérience pro : 
    <select id="listeExperiences">
    <option v-for="experience of experiences" :value="experience.experience">{{experience.experience}}</option>
    </select>
    <button v-on:click="experienceSupprimer()">Supprimer</button>
    </p>
    </section>
    `,
    props: ['experiences'],
    methods: {
        experienceSupprimer: function () {
            if (confirm("Voulez-vous supprimer l'expérience professionnelle : " + document.querySelector("#listeExperiences").value + " ?")) {
                this.experiences.splice(document.querySelector("#listeExperiences").selectedIndex, 1)
            }
        }
    }
}


let app = new Vue({
    el: "main",
    data: {
        nom: '',
        prenom: '',
        dateDeNaissance: '',
        adresse: '',
        voiture: false,
        experiencePro: [],
        formation: [],
        competence: [],
        intitulePoste: '',
        urlPhoto: 'https://dummyimage.com/120x120/000000/ffffff.png',
        theme: 'standard',
        underline: true
    },
    created: function () {
        let data = JSON.parse(localStorage.getItem('cv'));
        for (datakey in data) {
            this.$data[datakey] = data[datakey];
        }
        let main = document.querySelector("main");
        main.setAttribute('data-theme', this.theme);
    },

    mounted: function () {
        this.changeUnderline()
    },
    components: {
        information,
        'experiencepro': ExperiencePro,
        'formation': Formation,
        'competence': Competences,
        listecompetences,
        listeformations,
        listeexppro
    },
    methods: {
        saveStorage: function (key, data) {
            data = app.$data;
            let jsonTask = JSON.stringify(data);
            localStorage.setItem(key, jsonTask);
            alert("CV Sauvegardé");
        },
        delStorage: function (key) {
            if (confirm("Voulez-vous supprimer toutes les données ?")) {
                localStorage.removeItem(key);
                location.reload()
            }

        },
        ajouterExpPro: function () {
            let exp = document.querySelector('#experience').value;
            let dateDeb = document.querySelector('#expDateDebut').value
            let dateF = document.querySelector('#expDateFin').value
            let intPoste = document.querySelector('#expIntitulePoste').value
            if (exp && dateDeb && dateF && dateF > dateDeb && intPoste) {


                this.experiencePro.push({
                    experience: exp,
                    dateDebut: dateDeb,
                    dateFin: dateF,
                    intPoste: intPoste
                })
                document.querySelector('#experience').value = ''
                document.querySelector('#expDateDebut').value = ''
                document.querySelector('#expDateFin').value = ''
            }


        },
        ajouterFormation: function () {
            let form = document.querySelector('#formation').value;
            let dateDeb = document.querySelector('#formDateDebut').value
            let dateF = document.querySelector('#formDateFin').value
            if (form && dateDeb && dateF && dateF > dateDeb) {

                this.formation.push({
                    nomFormation: form,
                    dateDebut: dateDeb,
                    dateFin: dateF
                })
                document.querySelector('#formation').value = ''
                document.querySelector('#formDateDebut').value = ''
                document.querySelector('#formDateFin').value = ''
            }


        },
        ajouterCompetence: function () {
            let comp = document.querySelector('#competence').value;
            if (comp) {
                this.competence.push(comp)
                document.querySelector('#competence').value = ''
            }
        },
        printCV: function () {
            window.print()
        },
        changeTheme: function (e) {
            let main = document.querySelector("main")
            main.setAttribute('data-theme', e.target.value)
        },
        changeUnderline: function () {
            let sections = document.querySelectorAll("#rendu h2")
            sections.forEach(x => {
                if (!this.underline) x.classList.add("noUnderline")
                else x.classList.remove("noUnderline")

            });



        }
    }
})