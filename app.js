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
                // Buscar la primera línea que comience con "#", que representa el título en Markdown
                const lines = content.split('\n'); // Dividimos el contenido por líneas
                const titleLine = lines.find(line => line.startsWith('#')); // Encontramos la línea del título
                const title = titleLine ? titleLine.replace(/^#\s*/, '') : article.replace('.md', '').replace('_', ' '); // Quitamos el símbolo "#"

                // Unimos las líneas a partir de la segunda para eliminar la línea del título del contenido
                const contentWithoutTitle = lines.slice(1).join('\n');

                // Crear un nuevo div para cada artículo
                const articleElement = document.createElement('div');
                articleElement.classList.add('bg-gray-800', 'p-20', 'rounded-lg', 'shadow-md', 'mb-8');

                // Asignamos el contenido del archivo Markdown al div
                articleElement.innerHTML = `
                    <h3 class="text-xl font-bold">${title}</h3>
                    <p class="mt-2">${contentWithoutTitle.slice(0, 200)}</p>
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
        console.error('El contenedor #recent-articles no se encontró');
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
                // Buscar la primera línea que comience con "#", que representa el título en Markdown
                const lines = content.split('\n'); // Dividimos el contenido por líneas
                const titleLine = lines.find(line => line.startsWith('#')); // Encontramos la línea del título
                const title = titleLine ? titleLine.replace(/^#\s*/, '') : article.replace('.md', '').replace('_', ' '); // Quitamos el símbolo "#"

                // Unimos las líneas a partir de la segunda para eliminar la línea del título del contenido
                const contentWithoutTitle = lines.slice(1).join('\n');

                // Crear un nuevo div para cada artículo
                const articleElement = document.createElement('div');
                articleElement.classList.add('bg-gray-800', 'p-20', 'rounded-lg', 'shadow-md', 'mb-8', 'mr-8');

                // Asignamos el contenido del archivo Markdown al div
                articleElement.innerHTML = `
                    <h3 class="text-xl font-bold" style="text-align:center">${title}</h3>
                    <p class="mt-2" style="text-align:center">${contentWithoutTitle.slice(0, 200)}</p>
                    <a href="#" class="button mt-2" >Leer más</a>
                `;

                // Agregamos el artículo al contenedor de artículos
                articlesContainer.appendChild(articleElement);
            })
            .catch(error => {
                console.error('Error al cargar el artículo:', error);
            });
    });
});