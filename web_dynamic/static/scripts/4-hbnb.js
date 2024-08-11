$(function(){
    function fetchPlaces() {
        $.ajax({
            URL: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: selectedAmenities }), // Send selected amenities
            success: function(data) {
                if (data.status === 'OK') {
                    $('#api_status').addClass('available');
                    $('.places').empty(); // Clear previous places
                    // Loop through the result and create article tags
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
                        $('.places').append(article); // Append the article to the places section
                    });
                } else {
                    $('#api_status').removeClass('available');
                }
            },
        });
    }

    let selectedAmenities = [];

    // Listen for changes on each checkbox input
    $('input[type="checkbox"]').change(function() {
        const amenityId = $(this).data('id'); // Get the Amenity ID

        if ($(this).is(':checked')) {
            // If checked, add the Amenity ID to the array
            selectedAmenities.push(amenityId);
        } else {
            // If unchecked, remove the Amenity ID from the array
            selectedAmenities = selectedAmenities.filter(id => id !== amenityId);
        }

        // Update the h4 tag with the list of checked Amenities
        $('.amenities h4').text(selectedAmenities.length > 0 ? selectedAmenities.join(', ') : 'No Amenities selected');
    });

    // Button click event to fetch places based on selected amenities
    $('button[type="button"]').click(function() {
        fetchPlaces(); // Call the function to fetch places
    });
})