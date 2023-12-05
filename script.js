// This function wraps all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements in the html.
$(function () {

  var today = dayjs(); // initialize the date in a global variable for use in multiple functions
  var saveBtnEl = $('.saveBtn'); // carry the button elements in order to create event handler for each
  var containerEl = $('.container-lg'); // carry an element for the main content portion of the page

  // This little section grabs the container for page header, and then it renders the text for the day of the week, the month, and the number day of the month
  var currentDateEl = $("#currentDay");
  currentDateEl.text(today.format('dddd, MMMM D'));

  /* Event listener for the Save Button class. This will ensure the page doesn't reload and that
    the target parent (so the timeblock) is stored as a variable. This allows us to ensure we
    utilize the correct hour number (by using the timeblock ID) as well as the text area
    within the timeblock in order to store both in localstorage, and it will store separate
    variables for each timeblock. */
  
  saveBtnEl.on('click', saveHandler)

  function saveHandler(event) {
    event.preventDefault();
    var parentEl = $(this).parent();
    var parentID = parentEl.attr('id');
    localStorage.setItem(parentID,parentEl.children('textarea').val())
  }

  /** This for loop does two critical actions for each timeblock on the page. 
   * This loads in the text in the timeblock, according to what is in Local Storage, because we
   * utilize the ID name using a consistent pattern, we can construct that using the index of the
   * loop and create the strings that would match what we put into local storage above.
   * This then compares the current time to the timeblock corresponding to the index, then uses
   * that difference to present the conditional tree with how the timeblock element will be 
   * formatted, assinging a class relative to the time.
   */
  for (i = 9; i < 18; i++) {
    var hour = "hour-" + i;

    var plannerEntry = $(containerEl.children().eq(i-9).children().eq(1)[0]);
    plannerEntry.text(localStorage.getItem(hour));

    var difference = i - (Number(today.format("HH")));
    var blockEl = $(containerEl.children().eq(i-9));

    if (difference > 0) {
      blockEl.attr('class', 'row time-block future')
    } else if (difference === 0) {
      blockEl.attr('class', 'row time-block present')
    } else {
      blockEl.attr('class', 'row time-block past')
    }
  }
});
