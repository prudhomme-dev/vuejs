let Information = {
    template: `<section>
    <h2>{{nom|capitale}} {{prenom | capitaleprem}}</h2>
    <p v-if="age">Age : {{age}}</p>
    <p v-if="adresse">Adresse : {{adresse}}</p>
    <p v-if="!voiture" style="color:red;">Voiture : Non</p>
    <p v-else style="color:green;">Voiture : Oui</p>
    </section>`,
    filters: {
        capitale: function (value) {
            return value.toUpperCase()
        },
        capitaleprem: function (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    },
    computed: {
        age: function () {
            let aujourdhui = new Date();
            let anniversaire = new Date(this.datenaissance);
            return Math.floor((aujourdhui.getTime() - anniversaire.getTime()) / 31557600000);

        }
    },
    props: ['nom', 'prenom', 'datenaissance', 'adresse', 'voiture']
}

let ExperiencePro = {
    template: `<section v-if="experiencepro.length > 0">
    <h2>Expériences Professionnelles</h2>
    <ul>
        <li v-for="ex of experiencepro">{{ex.experience}} - du {{ex.dateDebut}} au {{ex.dateFin}}</li>

    </ul>
    </section>`,
    props: ['experiencepro']
}


let Formation = {
    template: `<section v-if="formations.length > 0">
    <h2>Formation</h2>
    <ul>
        <li v-for="fm of formations">{{fm.nomFormation}} - du {{fm.dateDebut}} au {{fm.dateFin}}</li>

    </ul>
    </section>`,
    props: ['formations']
}

let Competences = {
    template: `<section v-if="competences.length > 0">
    <h2>Compétences</h2>
    <ul>
        <li v-for="cp of competences">{{cp}}</li>

    </ul>
    </section>`,
    props: ['competences']
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
        competence: []
    },
    created: function () {
        let data = JSON.parse(localStorage.getItem('cv'))
        this.nom = data.nom
        this.prenom = data.prenom
        this.dateDeNaissance = data.dateDeNaissance
        this.adresse = data.adresse
        this.voiture = data.voiture
        this.experiencePro = data.experiencePro
        this.formation = data.formation
        this.competence = data.competence

    },
    components: {
        'informations': Information,
        'experiencepro': ExperiencePro,
        'formation': Formation,
        'competence': Competences
    },
    methods: {
        saveStorage: function (key, data) {
            data = app._data
            let jsonTask = JSON.stringify(data)
            localStorage.setItem(key, jsonTask)
        },
        delStorage: function (key) {
            localStorage.removeItem(key);

        },
        ajouterExpPro: function () {
            let exp = document.querySelector('#experience').value;
            let dateDeb = document.querySelector('#expDateDebut').value
            let dateF = document.querySelector('#expDateFin').value
            if (exp && dateDeb && dateF && dateF > dateDeb) {


                this.experiencePro.push({
                    experience: exp,
                    dateDebut: dateDeb,
                    dateFin: dateF
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
        }
    }
})