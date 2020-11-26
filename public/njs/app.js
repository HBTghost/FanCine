// -- Modal for sign up --
const modalBtn = document.getElementById('signIn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-Modal');

// Get the button that opens the modal

// Get the <span> element that closes the modal
function popdownModal() {
  modal.style.display = 'none';
}
// When the user clicks the button, open the modal
modalBtn.onclick = function signInClick() {
  modal.style.display = 'block';
};
// When the user clicks on <span> (x), close the modal
closeModal.onclick = function closeModalClick() {
  popdownModal();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function windowClickOff(event) {
  if (event.target === modal) {
    popdownModal();
  }
};
// -- End modal --

console.log(0 ?? 'babel compile fail');
console.log(null ?? 'babel compile successfully');
