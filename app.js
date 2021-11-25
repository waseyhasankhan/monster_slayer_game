function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      myHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
    };
  },
  computed: {
    monsterLife() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    myLife() {
      if (this.myHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.myHealth + "%" };
    },
    specialAttackFunctionality() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    myHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // a draw
        this.winner = "draw";
      } else if (value <= 0) {
        //player lost
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.myHealth <= 0) {
        // a draw
        this.winner = "draw";
      } else if (value <= 0) {
        // player won
        this.winner = "waset";
      }
    },
  },
  methods: {
    startNewGame() {
      (this.myHealth = 100),
        (this.monsterHealth = 100),
        (this.currentRound = 0),
        (this.winner = null);
    },
    surrender() {
      this.winner = "monster";
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackUser();
    },
    attackUser() {
      const attackValue = getRandomValue(8, 15);
      this.myHealth -= attackValue;
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.attackUser();
    },
    healMe() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if (this.myHealth + healValue > 100) {
        this.myHealth = 100;
        // alert(` Damn you monster! I boosted my power! `);
      } else {
        this.myHealth = this.myHealth + healValue;
      }
      // this.attackUser();
      // this.specialAttackFunctionality();
    },
  },
});

app.mount("#game");
