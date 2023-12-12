import React from "react";

export const Help = () => {
  return (
    <div className="container text-start infoView">
      <h2>A Quick Guide To Serendipity</h2>
      <p>
        Serendipity is a tool to sort, combine and recombine image content from
        the Archive of Digital Art (ADA). Users can filter the content in the
        database based on the Thesaurus keywords, which are used for semantic
        tagging of the artworks. They can also form collections and export them
        to the image viewer Mnemosyne for closer analysis.
      </p>
      <h3>Main Menu</h3>
      <p>
        The main screen depicts the main menu and the artworks, which are chosen
        based on your filter selections. The default mode without filters shows
        all the artworks in the database. On the left side of the main screen
        the chosen keywords and filter chains are indicated.
      </p>
      <p>
        If you hover over any of the images in the main screen you will get
        additional information on the artworks with the artist name, year of
        creation, artwork name, description, further images, and the keywords
        the respective artist chose for this artwork.
      </p>
      <ul>
        <li>
          Show on ADA takes you to the entry of the artwork on ADA with the full
        </li>
        <li>description and other additional information.</li>
        <li>Add to favourites - transfers the artwork to your collections.</li>
      </ul>
      <h3>Filter Section</h3>
      <p>
        Here you can select Thesaurus keywords to filter the artworks and create
        various filter chains.
      </p>
    </div>
  );
};
