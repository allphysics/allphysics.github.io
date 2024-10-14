window.addEventListener('load', function () {
    const articlesContainer = document.querySelector('#all-articles');

    if (!articlesContainer) {
        console.error('El contenedor #all-articles no se encontró');
        return;
    }

    const articles = [
        'articulo_1.md',
        'articulo_2.md',
        'articulo_3.md',
        'articulo_4.md'
    ];

    // Recorremos cada artículo y hacemos una solicitud fetch a cada archivo .md
    articles.forEach(article => {
        fetch(`/articles/${article}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`No se pudo cargar el archivo: ${article}`);
                }
                return response.text();
            })
            .then(content => {
                // Crear un nuevo div para cada artículo
                const articleElement = document.createElement('div');
                articleElement.classList.add('bg-gray-800', 'p-20', 'rounded-lg', 'shadow-md');

                // Asignamos el contenido del archivo Markdown al div
                articleElement.innerHTML = `
                    <h3 class="text-xl font-bold">${article.replace('.md', '').replace('_', ' ')}</h3>
                    <p class="mt-2">${content.slice(0, 200)}...</p>
                    <a href="#" class="button mt-2">Leer más</a>
                `;

                // Agregamos el artículo al contenedor de artículos
                articlesContainer.appendChild(articleElement);
            })
            .catch(error => {
                console.error('Error al cargar el artículo:', error);
            });
    });
});





window.addEventListener('load', function () {
    const articlesContainer = document.querySelector('#recent-articles');

    if (!articlesContainer) {
        console.error('El contenedor #all-articles no se encontró');
        return;
    }

    const articles = [
        'articulo_1.md',
        'articulo_2.md',
        'articulo_3.md'
    ];
    // Recorremos cada artículo y hacemos una solicitud fetch a cada archivo .md
    articles.forEach(article => {
        fetch(`/recent-articles/${article}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`No se pudo cargar el archivo: ${article}`);
                }
                return response.text();
            })
            .then(content => {
                // Crear un nuevo div para cada artículo
                const articleElement = document.createElement('div');
                articleElement.classList.add('bg-gray-800', 'p-20', 'rounded-lg', 'shadow-md');

                // Asignamos el contenido del archivo Markdown al div
                articleElement.innerHTML = `
                    <h3 class="text-xl font-bold">${article.replace('.md', '').replace('_', ' ')}</h3>
                    <p class="mt-2">${content.slice(0, 200)}...</p>
                    <a href="#" class="button mt-2">Leer más</a>
                `;

                // Agregamos el artículo al contenedor de artículos
                articlesContainer.appendChild(articleElement);
            })
            .catch(error => {
                console.error('Error al cargar el artículo:', error);
            });
    });
});