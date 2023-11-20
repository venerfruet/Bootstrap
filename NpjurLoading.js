class NpjurLoading extends HTMLElement {

  #zoom;

  constructor() {

    super();

    this.#zoom = 1;

  }

  connectedCallback() {

    if (this.hasAttribute('tamanho')) {
      const valor = Number.parseFloat(this.getAttribute('tamanho'));

      if (!isNaN(valor))
        this.#zoom = valor
    }

    const container = document.createElement('div');
    container.className = 'npjur-loader';
    container.style = `transform: scale(${this.#zoom});`;

    const loader = document.createElement('div');
    loader.className = 'loader';

    const one = document.createElement('div');
    one.className = 'inner one';
    const two = document.createElement('div');
    two.className = 'inner two';
    const three = document.createElement('div');
    three.className = 'inner three';
    const four = document.createElement('div');
    four.className = 'inner four';

    const textContainer = document.createElement('div');
    textContainer.className = 'text animate-charcter';

    const textContainer1 = document.createElement('div');
    const text1 = document.createElement('span');
    text1.className = 'text1';
    text1.innerText = 'NP';
    const text2 = document.createElement('span');
    text2.className = 'text2';
    text2.innerText = 'JUR';
    textContainer1.append(text1, text2);

    /*
    const textContainer2 = document.createElement('div');
    const text3 = document.createElement('span');
    text3.className = 'text3';
    text3.innerText = 'aguarde...';
    textContainer2.append(text3);
    */

    loader.append(one, two, three, four);
    textContainer.append(textContainer1);

    container.append(loader, textContainer);
    this.append(this.#style(), container);

  }

  static get observedAttributes() {
    return ['visible'];
  }

  attributeChangedCallback(name, oldValue, newValue) {

    if (name === 'visible') {
      if (newValue === 'true') {
        this.classList.remove('hide');
      } else {
        this.classList.add('hide');
      }
    }

  }

  #style() {

    const style = document.createElement('style');
    style.textContent = `
      npjur-loading{
        position: absolute;
        top: 0;
        left: 0;
        display: flex ;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        z-index: 10000;
        user-select: none;
        background-color: black;
      }

      .npjur-loader {
        display: flex;
        align-items: center;
      }
      
      .hide{
        display: none;
      }

      .npjur-loader .text {
        display: flex;
        align-items: baseline;
        font-family: "Times New Roman";
      }
      
      .npjur-loader .text1 {
        font-size: 2em;
      }
      
      .npjur-loader .text2 {
        font-size: 1em;
        margin-left: -3px;
      }

      .npjur-loader .text3 {
        font-size: 1em;
      }

      .npjur-loader .animate-charcter {
        background-image: linear-gradient(-225deg,
            #cfedf9 0%,
            #a9dce9 29%,
            #80a7d2 67%,
            #3d6fad 100%);
        background-size: auto auto;
        background-clip: border-box;
        background-size: 200% auto;
        color: #fff;
        background-clip: text;
        text-fill-color: transparent;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: textclip 3s linear infinite;
        display: inline-block;
      }
      
      @keyframes textclip {
        to {
          background-position: -200% center;
        }
      }
      
      .npjur-loader .loader {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        perspective: 800px;
      }
      
      .npjur-loader .inner {
        position: absolute;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      
      .npjur-loader .inner.one {
        left: 0%;
        top: 0%;
        animation: rotate-one 1s linear infinite;
        border-bottom: 3px solid #3d6fad;
      }
      
      .npjur-loader .inner.two {
        right: 0%;
        top: 0%;
        animation: rotate-two 1s linear infinite;
        border-right: 3px solid #80a7d2;
      }
      
      .npjur-loader .inner.three {
        right: 0%;
        bottom: 0%;
        animation: rotate-three 1s linear infinite;
        border-top: 3px solid #a9dce9;
      }
      
      .npjur-loader .inner.four {
        right: 0%;
        bottom: 0%;
        animation: rotate-four 1s linear infinite;
        border-top: 3px solid #cfedf9;
      }
      
      @keyframes rotate-one {
        0% {
          transform: rotateX(317deg) rotateY(-45deg) rotateZ(0deg);
        }
      
        100% {
          transform: rotateX(317deg) rotateY(-45deg) rotateZ(360deg);
        }
      }
      
      @keyframes rotate-two {
        0% {
          transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
        }
      
        100% {
          transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
        }
      }
      
      @keyframes rotate-three {
        0% {
          transform: rotateX(70deg) rotateY(55deg) rotateZ(0deg);
        }
      
        100% {
          transform: rotateX(70deg) rotateY(55deg) rotateZ(360deg);
        }
      }
      
      @keyframes rotate-four {
        0% {
          transform: rotateX(220deg) rotateY(55deg) rotateZ(0deg);
        }
      
        100% {
          transform: rotateX(220deg) rotateY(55deg) rotateZ(360deg);
        }
      
      }
    `;

    return style;

  }

}

customElements.define('npjur-loading', NpjurLoading);
