window.addEventListener('DOMContentLoaded', () => {
  let lang = 'en';

  const translations = {
    en: {
      title: "Drink Selection",
      cart: "Cart"
    },
    sk: {
      title: "Výber nápoja",
      cart: "Košík"
    }
  };

  const drinks = [
    {
      id: 'drink1',
      name: { sk: 'Pilsner', en: 'Pilsner' },
      imageUrl: 'https://via.placeholder.com/100x150?text=Pilsner',
      alcoholic: true,
      availableVolumes: [300, 500],
      stock: 50000,
      gpio: { relayPin: 17, flowSensorPin: 27 }
    },
    {
      id: 'drink2',
      name: { sk: 'Kofola', en: 'Kofola' },
      imageUrl: 'https://via.placeholder.com/100x150?text=Kofola',
      alcoholic: false,
      availableVolumes: [300, 500],
      stock: 30000,
      gpio: { relayPin: 22, flowSensorPin: 23 }
    }
  ];

  const cart = [];

  function renderDrinks() {
    const grid = document.getElementById('drink-grid');
    grid.innerHTML = '';
    drinks.forEach(drink => {
      const item = document.createElement('div');
      item.className = 'drink';
      item.innerHTML = `
        <img src="${drink.imageUrl}" />
        <h3>${drink.name[lang]}</h3>
        ${drink.availableVolumes.map(v =>
        `<button onclick="addToCart('${drink.id}', ${v})">${v} ml</button>`).join('')}
      `;
      grid.appendChild(item);
    });
  }

  window.addToCart = (id, volume) => {
    const index = cart.findIndex(i => i.id === id && i.volume === volume);
    if (index >= 0) cart[index].quantity += 1;
    else cart.push({ id, volume, quantity: 1 });
    renderCart();
  };

  function renderCart() {
    const container = document.getElementById('cart');
    container.innerHTML = `<h2>${translations[lang].cart}</h2>`;

    const itemsDiv = document.createElement('div');

    cart.forEach((item, idx) => {
      const drink = drinks.find(d => d.id === item.id);
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
      <span>${drink.name[lang]} ${item.volume}ml</span>
      <div class="cart-buttons">
        <button onclick="updateCart(${idx}, -1)">−</button>
        <span>${item.quantity}</span>
        <button onclick="updateCart(${idx}, 1)">+</button>
      </div>
    `;
      itemsDiv.appendChild(div);
    });

    container.appendChild(itemsDiv);

    if (cart.length > 0) {
      const btn = document.createElement('button');
      btn.id = 'confirm-btn';
      btn.innerText = lang === 'sk' ? 'Potvrdiť objednávku' : 'Confirm Order';
      btn.onclick = () => alert("Potvrdenie zatiaľ nie je implementované.");
      container.appendChild(btn);
    }
  }

  window.updateCart = (index, delta) => {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    renderCart();
  };

  window.setLang = (lng) => {
    lang = lng;
    document.getElementById('title').textContent = translations[lang].title;
    renderDrinks();
    renderCart();
  };

  setLang(lang);
});
