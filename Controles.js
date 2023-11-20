class Controles extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {

    const container = document.createElement('div');
    container.className = 'inpu-group-text text-center mb-0 buttons-container';
    container.append(this.#novo(), this.#gravar(), this.#desativar());

    this.append(this.#style(), container);

  }

  #style() {
    const style = document.createElement('style');
    style.textContent = `
      .buttons-container{
        display: flex;
        padding: 13px;
      }
    `;

    return style;
  }

  #observeHide() {
    const observer = new MutationObserver((mutationList, observer) => {

      for (const mutation of mutationList) {

        if (mutation.type === "attributes") {

          const target = mutation.target;

          if (target.style.visibility === 'hidden' && target.style.display !== 'none') {

            target.style.display = 'none';

            const clone = target.cloneNode(true);
            clone.id = `${target.id}_clone`;
            clone.className = 'btn btn-secondary';
            clone.style.textDecoration = 'line-through';
            clone.style.visibility = 'visible';
            clone.style.display = 'block';

            target.parentElement.append(clone);

          }

          if (target.style.visibility === 'visible' && target.style.display === 'none') {

            target.style.display = 'block';
            const clone = document.querySelector(`#${target.id}_clone`);
            clone.remove()

          }


        }
      }
    });

    return observer;

  }

  #btnContainer() {
    const div = document.createElement('div');
    div.className = 'me-2';
    return div;
  }

  #novo() {

    const btn = document.createElement('button');
    btn.id = 'novo';
    btn.className = 'btn btn-outline-primary';
    btn.textContent = 'Novo'

    const div = this.#btnContainer();
    div.append(btn);

    return div;

  }

  #gravar() {

    const btn = document.createElement('button');
    btn.id = 'gravar';
    btn.className = 'btn btn-outline-success';
    btn.textContent = 'Gravar'

    const observer = this.#observeHide();
    observer.observe(btn, { attributes: true, childList: true, subtree: true });

    btn.addEventListener('click', (e) => {
      alert(e.target.id);
    });

    const div = this.#btnContainer();
    div.append(btn);

    return div;
  }

  #desativar() {

    const btn = document.createElement('button');
    btn.id = 'desativar';
    btn.className = 'btn btn-outline-danger';
    btn.textContent = 'Desativar'

    const div = this.#btnContainer();
    div.append(btn);

    return div;

  }

}

customElements.define('controles-teste', Controles);