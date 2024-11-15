document.addEventListener('DOMContentLoaded', function() {
    fetch('/productos')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('productList');
            data.forEach(producto => {
                const li = document.createElement('li');
                li.textContent = `${producto.nombre} - $${producto.precio}`;
                productList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching productos:', error));
});
