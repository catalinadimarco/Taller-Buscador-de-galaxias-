document.getElementById('btnBuscar').addEventListener('click', () => {
    const query = document.getElementById('inputBuscar').value.trim();
    const url = `https://images-api.nasa.gov/search?q=${query}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            const dataResult = data.collection.items;
            console.log(dataResult);
            showData(dataResult);
        })
        .catch(error => {
            console.error('Error', error);
        });

    function showData(dataResult) {
        const resultsDiv = document.getElementById('contenedor');
        resultsDiv.innerHTML = ''; // Limpiar resultados anteriores

        if (dataResult.length === 0) {
            resultsDiv.innerHTML = '<p>No se encontraron resultados.</p>';
            return;
        }

        dataResult.forEach(elemento => {
            const imgSrc = elemento.links[0]?.href; // Usar encadenamiento opcional para evitar errores
            const title = elemento.data[0]?.title || 'Sin título'; // Valor por defecto si no hay título
            const description = elemento.data[0]?.description || 'Sin descripción'; // Valor por defecto si no hay descripción
            const date = elemento.data[0]?.date_created || 'Sin fecha'; // Valor por defecto si no hay fecha

            const resultItem = `
                <div>
                    <h3>${title}</h3>
                    <img src="${imgSrc}" alt="${title}">
                    <p>${description}</p>
                    <p><strong>Fecha:</strong> ${date}</p>
                </div>
            `;
            resultsDiv.innerHTML += resultItem; // Agregar el resultado al contenedor
        });
    }
});
