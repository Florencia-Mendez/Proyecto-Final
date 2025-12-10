fetch("https://randomuser.me/api/?gender=male")
  .then(res => res.json())
  .then(data => {
    const imagen = data.results[0].picture.large
    document.querySelector('#persona').innerHTML =
      `<img src="${imagen}" alt="persona">`
  })

fetch("https://randomuser.me/api/?genderfemale")
  .then(res => res.json())
  .then(data => {
    const imagen = data.results[0].picture.large
    document.querySelector('#persona-2').innerHTML =
      `<img src="${imagen}" alt="persona">`
  })

  fetch("https://randomuser.me/api/?gender=male")
  .then(res => res.json())
  .then(data => {
    const imagen = data.results[0].picture.large
    document.querySelector('#persona-3').innerHTML =
      `<img src="${imagen}" alt="persona">`
  })


document.querySelectorAll('.compra').forEach(boton => {
  boton.addEventListener('click', () => {
    const nombre = boton.dataset.nombre;
    const precio = boton.dataset.precio;
    const img = boton.dataset.img;

    let carritoArray = JSON.parse(localStorage.getItem('carrito')) || [];

    carritoArray.push({ nombre, precio, img });

    localStorage.setItem('carrito', JSON.stringify(carritoArray));

    alert(`${nombre} agregado al carrito`);
  });
});

const carritoLista = document.getElementById('carrito');
const totalSpan = document.getElementById('total');
const vaciarBtn = document.getElementById('vaciar');

function actualizarCarrito() {
  let carritoArray = JSON.parse(localStorage.getItem('carrito')) || [];
  carritoLista.innerHTML = '';
  let total = 0;

  carritoArray.forEach((producto, index) => {
    const li = document.createElement('li');
    li.classList.add('producto-carrito');
    li.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}" width="50">
      ${producto.nombre} - $${producto.precio}
      <button class="eliminar">Eliminar</button>
    `;

    li.querySelector('.eliminar').addEventListener('click', () => {
      carritoArray.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(carritoArray));
      actualizarCarrito();
    });

    carritoLista.appendChild(li);
    total += parseFloat(producto.precio);
  });

  totalSpan.textContent = total.toFixed(2);
}

vaciarBtn.addEventListener('click', () => {
  localStorage.removeItem('carrito');
  actualizarCarrito();
});

actualizarCarrito();

