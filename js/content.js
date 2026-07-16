/* ============================================================
   FAMILY CONTENT FILE
   This is the only file you need to touch to grow the archive.
   Edit carefully, save, and refresh the page.
   ============================================================ */

window.SITE_CONTENT = {

  /* ----------------------------------------------------------
     WHERE STORIES GET SENT
     Put an email address between the quotes to turn on the
     "Share a story" button, e.g. "stories@example.com".
     Leave it empty ("") to show a gentle "coming soon" note.
     ---------------------------------------------------------- */
  storyEmail: "",

  /* ----------------------------------------------------------
     STORIES
     Add one block per story, comma-separated. Example:

     {
       text: "Patrick sat with my father for three hours after his shift ended. He never once looked at his watch.",
       by: "A patient's daughter, Dover"
     },

     Keep them short — a few sentences reads best.
     ---------------------------------------------------------- */
  stories: [
    // Add stories here.
  ],

  /* How many dashed "held open" slots to show while stories arrive. */
  emptyStorySlots: 3,

  /* ----------------------------------------------------------
     GALLERY
     Drop photo files into the images/ folder, then add a block
     per photo. Example:

     {
       src: "images/patrick-walking.jpg",
       caption: "Walking the shore road, autumn."
     },

     Frames without photos show as quiet placeholders.
     ---------------------------------------------------------- */
  gallery: [
    { src: "", caption: "Patrick, listening — photograph to come." },
    { src: "", caption: "The New Hampshire woods." },
    { src: "", caption: "At a bedside." },
    { src: "", caption: "Teaching." },
    { src: "", caption: "Death Valley, 2003." },
    { src: "", caption: "With family." }
  ]

};
