import { TweenLite, Power3 } from "gsap";

export default {
  data() {
    return {
      canvas: null,
      context: null,

      position: {
        y1: window.innerHeight / 2 + 60,
        y2: window.innerHeight / 2 - 60
      }
    };
  },
  beforeMount() {
    // loading assets
    let image = new Image();
    this.images.push(image);
    image.src = require("@/assets/image.jpg");
    image.addEventListener("load", () => this.loaded++);
  },
  mounted() {
    // loading canvas
    this.canvas = this.$refs.landingTop;
    this.context = this.canvas.getContext("2d");

    // fixing canvas size
    this.fixSize();
  },
  methods: {
    loop() {
      if (this.position.y1 <= 0 && this.position.y2 <= 0) {
        window.cancelAnimationFrame(this.requestId);
        this.requestId = undefined;
        console.log("end request");
      } else {
        this.drawTopLayer();
        this.requestId = window.requestAnimationFrame(this.loop);
        // console.log("start request");
      }
    },

    onClick() {
      console.log("on click");
      if (this.loaded) {
        console.log("start request");
        this.loop();

        // animate value
        TweenLite.to(this.position, 1.2, {
          y1: 0,
          y2: 0,
          ease: Power3.easeInOut
        });
      }
    },

    drawTopLayer() {
      console.log(this.position.y1, this.position.y2);

      this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.context.save();

      // draw container
      this.context.beginPath();
      this.context.moveTo(0, 0);
      this.context.lineTo(window.innerWidth, 0);
      this.context.lineTo(window.innerWidth, this.position.y1);
      this.context.lineTo(0, this.position.y2);

      this.context.clip();

      // draw image
      this.drawImage(this.images[0]);

      // draw text
      this.context.font = `bold ${0.1 * window.innerWidth}px Arial`;
      this.context.fillStyle = "red";
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.fillText(
        "EXPLORE",
        window.innerWidth / 2,
        window.innerHeight / 2
      );

      this.context.restore();
    },

    drawImage(image) {
      console.log("draw image");

      // scale to fill
      let scale = Math.max(
        window.innerWidth / this.images[0].width,
        window.innerHeight / this.images[0].height
      );
      let x = window.innerWidth / 2 - (this.images[0].width / 2) * scale;
      let y = window.innerHeight / 2 - (this.images[0].height / 2) * scale;

      this.context.drawImage(
        image,
        x,
        y,
        this.images[0].width * scale,
        this.images[0].height * scale
      );
    },

    fixSize() {
      let dpi = window.devicePixelRatio;

      let style_height = +getComputedStyle(this.canvas)
        .getPropertyValue("height")
        .slice(0, -2);
      console.log(style_height, dpi);

      let style_width = +getComputedStyle(this.canvas)
        .getPropertyValue("width")
        .slice(0, -2);

      this.canvas.setAttribute("height", style_height);
      this.canvas.setAttribute("width", style_width);
      // this.canvas.setAttribute("height", style_height * dpi);
      // this.canvas.setAttribute("width", style_width * dpi);
    }
  }
};