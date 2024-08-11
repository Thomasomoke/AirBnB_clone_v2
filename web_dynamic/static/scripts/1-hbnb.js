$(function(){
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
    
})