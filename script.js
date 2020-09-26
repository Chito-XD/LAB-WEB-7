$(document).ready(function() {

    const temas_array = ['dogs', 'cats', 'rubik', 'beach', 'rocket', 'gol', 'mexico', 'surf', 'hacker', 'cellphone'];

    const createButton = value => {
        $('#animal-buttons').append(`
            <button type="button" class="gif-animal-button">
                ${value}
            </button>
        `);
    };

    temas_array.forEach(topic => {
        createButton(topic);
    });

    
    $('#add-animal').on('click', function(e){
        e.preventDefault();
        const animal_input = $('#animal-input').val();
        createButton(animal_input);
    });


    $('#animal-buttons').on('click', '.gif-animal-button', function(){
        const value_button = $(this).text().replace(/\s/g, '');
        $('.gif-animal-button').removeClass('active');
        $(this).addClass('active');
        getImages(value_button);
    });

    $('#animals').on('click', '.animal-item-img', function(){
        const isMoving = $(this).attr('data-isMoving');

        const src_value = isMoving === 'true' ? 'data-still' : 'data-animated';
        const new_status = isMoving === 'true' ? 'false' : 'true';

        $(this).attr('src', $(this).attr(src_value));
        $(this).attr('data-isMoving', new_status);
    });

    const getImages = topic => {
        $.ajax({
            url: `https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=7ZfN4iwStcIxgQKOrQCx0Y1VLXr9LWgc&limit=10`,
            success: function(respuesta) {
                const gif_info = respuesta.data.map(gif => {
                    const { rating, images } = gif;
                    return {
                        topic,
                        rating,
                        gif_animated: images.fixed_height.url,
                        gif_still: images.fixed_height_still.url
                    }
                });
                displayImages(gif_info);
            },
            error: function() {
                alert(`Ha habido un problema al obtener los gif's`);
            }
        });
    };


    const displayImages = gif_array_info => {
        $('#animals').empty();

        gif_array_info.forEach(img => {
            $('#animals').append(`
                <div class="animal-item"> 
                    <p>Rating: ${img.rating} </p>
                    <img src=${img.gif_still} 
                        data-animated=${img.gif_animated}
                        data-still=${img.gif_still}
                        data-isMoving="false"
                        class="animal-item-img"
                        alt=${img.topic} >
                </div>
            `)
        });
    };


});
