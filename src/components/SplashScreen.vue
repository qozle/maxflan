<template>
  <div id="p5CanvasHolder"></div>
</template>

<script>
let vm;
let prod = "maxflanagan.info";
let dev = "localhost:8080";
export default {
  name: "SplashScreen",
  data() {
    return {
      p5: "",
    };
  },
  methods: {
    script: (p5) => {
      let center = {},
        font,
        nameLetterPoints = [],
        name = "MAX FLANAGAN",
        posX = 50,
        lettersFinished = 1,
        textAlpha = 0,
        dropAlpha = 0;

      p5.windowResized = () => {
        p5.resizeCanvas(window.innerWidth, window.innerHeight - 63);
        [center.x, center.y] = [canvas.width / 2, canvas.height / 2];
      };

      class Drop {
        constructor(posX, posY, width, height) {
          this.posX = posX || Math.floor(Math.random() * p5.width);
          this.posY = posY || Math.floor(Math.random() * 5);
          this.width = width || Math.floor(Math.random() * 4) + 1;
          this.height = height || Math.floor(Math.random() * 5) + 5;
          this.speed = Math.random() * 3;
          this.accel = Math.random() * 1 * 0.1;
          this.curve = Math.floor(Math.random() * 1) * 0.01;
        }
      }

      var dropList = [];

      p5.preload = () => {
        font = p5.loadFont(`http://${prod}/BRLNSB.TTF`);
      };

      p5.setup = () => {
        let canvas = p5.createCanvas(
          window.innerWidth,
          window.innerHeight - 63
        );
        canvas.parent("p5CanvasHolder");
        canvas.id("p5canvas");
        [center.x, center.y] = [canvas.width / 2, canvas.height / 2];
        // p5.frameRate(0);

        for (let letter of name) {
          nameLetterPoints.push(
            font.textToPoints(letter, posX, center.y, 90, { sampleFactor: 1 })
          );
          posX += 80;
        }

        for (var i = 0; i < 100; i++) {
          dropList.push(new Drop());
        }
      };

      p5.draw = () => {
        p5.background("black");
        p5.stroke("white");
        p5.fill("white");
        nameLetterPoints.forEach((letter, index) => {
          if (p5.frameCount < letter.length) {
            p5.blendMode(p5.ADD);
            if (
              p5.dist(
                letter[p5.frameCount - 1].x,
                letter[p5.frameCount - 1].y,
                letter[p5.frameCount].x,
                letter[p5.frameCount].y
              ) > 15
            ) {
              return;
            }
            p5.line(
              letter[p5.frameCount - 1].x,
              letter[p5.frameCount - 1].y,
              letter[p5.frameCount].x,
              letter[p5.frameCount].y
            );
            if (p5.frameCount == letter.length - 1) {
              lettersFinished++;
              if (![1, 6, 8, 9, 10].includes(index)) {
                p5.line(
                  letter[p5.frameCount].x,
                  letter[p5.frameCount].y,
                  letter[0].x,
                  letter[0].y
                );
              }
            }
          }
        });
        if (lettersFinished == nameLetterPoints.length) {
          p5.blendMode(p5.BLEND);
          p5.push();
          p5.fill(0, 0, 255, dropAlpha);
          p5.stroke(0, 0, 255, dropAlpha);
          if (dropAlpha < 150) {
            dropAlpha += 0.25;
          }
          dropList.forEach((drop) => {
            p5.ellipse(drop.posX, drop.posY, drop.width, drop.height);
            drop.posY += drop.speed;
            drop.speed += drop.accel;
            drop.accel += drop.curve;
            if (drop.posY > p5.height) {
              drop.posY = 0;
              drop.speed = Math.floor(Math.random() * 3);
              drop.accel = Math.random() * 1 * 0.01;
              drop.curve = Math.random() * 1 * 0.005;
              drop.posX = Math.floor(Math.random() * p5.width);
            }
          });
          p5.pop();
          p5.push();
          p5.fill(255, 255, 255, textAlpha);
          p5.textFont(font);
          p5.textSize(90);
          posX = 50;
          for (let letter of name) {
            p5.text(letter, posX, center.y);
            posX += 80;
          }
          // p5.text("MAX FLANAGAN", 50, center.y)
          if (textAlpha < 200) {
            textAlpha += 0.5;
          }
          p5.pop();
        }
      };
    },
  },
  mounted() {
    vm.p5 = new vm.$P5(vm.script);
  },
  beforeCreate() {
    vm = this;
  },
};
</script>

<style scope></style>
