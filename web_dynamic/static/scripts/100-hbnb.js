$(function(){
    function fetchPlaces() {
        $.ajax({
            URL: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ 
                amenities: selectedAmenities, 
                states: selectedStates, 
                cities: selectedCities 
            }),
            success: function(data) {
                if (data.status === 'OK') {
                    $('#api_status').addClass('available');
                    $('.places').empty();
                    data.places.forEach(place => {
                        const article = `
                            <article>
                                <div class="title_box">
                                    <h2>${place.name}</h2>
                                    <div class="price_by_night">$${place.price_by_night}</div>
                                </div>
                                <div class="information">
                                    <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                                    <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                                    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                                </div>
                                <div class="description">
                                    ${place.description | safe}
                                </div>
                            </article>
                        `;
                        $('.places').append(article);
                    });
                } else {
                    $('#api_status').removeClass('available');
                }
            },
        });
    }

    let selectedAmenities = [];
    let selectedStates = [];
    let selectedCities = [];

    $('input[type="checkbox"]').change(function() {
        const id = $(this).data('id');
        const name = $(this).data('name');

        if ($(this).is(':checked')) {
            if ($(this).closest('ul').parent().hasClass('locations')) {
                selectedStates.push(id);
            } else {
                selectedCities.push(id);
            }
        } else {
            if ($(this).closest('ul').parent().hasClass('locations')) {
                selectedStates = selectedStates.filter(stateId => stateId !== id);
            } else {
                selectedCities = selectedCities.filter(cityId => cityId !== id);
            }
        }

        const checkedStates = selectedStates.length > 0 ? selectedStates.join(', ') : 'No States selected';
        const checkedCities = selectedCities.length > 0 ? selectedCities.join(', ') : 'No Cities selected';
        $('.locations h4').text(checkedStates + (selectedCities.length > 0 ? ', ' + checkedCities : ''));
    });

    $('button[type="button"]').click(function() {
        fetchPlaces();
    });
})