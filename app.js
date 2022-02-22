let LocalCmp = {
    template: `<div>Mon composant : {{variable}}</div>`,
    data: function () {
        return {
            mavariable: this.variable
        }

    },
    props: ['variable'],
};

let RandomNumber = {
    template: `<div>
    <p>Nombre aléatoire entre {{min}} et {{max}} : {{myNumber}}</p>
    <p><button v-on:click='random()'>Générer un nouveau nombre</button></p>
    </div>`,
    data: function () {
        return {
            myNumber: 0
        }
    },
    created: function () {
        this.random();

    },
    props: ['min', 'max'],
    methods: {
        random: function () {
            let calculmax = this.max - this.min + 1;
            this.myNumber = parseInt(Math.floor(Math.random() * calculmax + this.min));
        }
    }
}

let vm = new Vue({
    el: '#app',
    data: {
        nom: 'Prud\'homme',
        prenom: 'Cédric',
        creationDate: '',
        birthday: '1987-02-17',
        story: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit vel recusandae, ullam delectus voluptatem natus nihil! Odit quod earum praesentium obcaecati nesciunt accusamus neque, reiciendis officia. Quam, hic! Saepe, eligendi.',
        showStory: false,
        voyage: ['France', 'Italie', 'Espagne', 'Belgique', 'Suisse'],
        time: '',
        prix: 0,
        quantite: 0,
        tauxTva: [0, 5, 10, 15, 20],
        tauxSelection: 0,
        montantHT: parseFloat(0).toFixed(2),
        montantTTC: parseFloat(0).toFixed(2)
    },
    created: function () {
        let aujourdhui = new Date();
        this.creationDate = aujourdhui.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) + ' à ' + aujourdhui.toLocaleTimeString('fr-FR');
        let interval = setInterval(() => {
            let maintenant = new Date();
            this.time = maintenant.toLocaleTimeString('fr-FR');
        }, 1000);

    },
    computed: {
        nomComplet: function () {
            return `${this.prenom.charAt(0).toUpperCase()}${this.prenom.substring(1)} ${this.nom.toUpperCase()}`;

        },
        age: function () {
            let aujourdhui = new Date();
            let anniversaire = new Date(this.birthday);
            return Math.floor((aujourdhui.getTime() - anniversaire.getTime()) / 31557600000);

        },
        // montantHT: function () {
        //     return (parseFloat(this.prix) * parseInt(this.quantite)).toFixed(2)

        // },
        // montantTTC: function () {
        //     return (this.montantHT * (1 + this.tauxSelection / 100)).toFixed(2)

        // }


    },
    filters: {
        excerpt: function (value) {
            return value.substring(0, 30);

        }
    },
    components: {
        'local-cmp': LocalCmp,
        'random-number': RandomNumber
    },
    methods: {
        changeStory: function () {
            this.showStory = !this.showStory;
        },
        addCountry: function (value) {
            if (this.voyage.value != 0) {
                this.voyage.push(value.target.value);
                value.target[0].selected = true;
            }


        },
        calculHT: function () {
            this.montantHT = (parseFloat(this.prix) * parseFloat(this.quantite)).toFixed(2);

        },
        calculTTC: function () {
            this.calculHT();
            this.montantTTC = (this.montantHT * (1 + this.tauxSelection / 100)).toFixed(2);
        },
        verifChamp: function (valeur, champ) {
            if (!parseFloat(valeur.target.value)) valeur.target.value = 0;
            else {
                if (champ == 0) this.prix = valeur.target.value
                else this.quantite = valeur.target.value
            }

        }


    }


})