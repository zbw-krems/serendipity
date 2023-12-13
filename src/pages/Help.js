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
      <p>
        You can find the Tutorial with pictures{" "}
        <a
          href="https://github.com/zbw-krems/serendipity?tab=readme-ov-file#how-to-serendipity"
          target="_blank"
        >
          here.
        </a>
      </p>
      <h3 data-heading="Main Screen">Main Screen</h3>
      <p>
        The main screen depicts the main menu and the artworks, which are chosen
        based on your filter selections. The default mode without filters shows
        all the artworks in the database. On the left side of the main screen
        the chosen keywords and filter chains are indicated.
      </p>
      <h3 data-heading="Main Menu">Main Menu</h3>
      <ul>
        <li>
          <strong>Filters</strong> - opens up the filter section
        </li>
        <li>
          <strong>Collections</strong> - opens up your collections
        </li>
        <li>
          <strong>Info</strong> - opens up the info section with “About”, “Quick
          guide”, and “Impressum”
        </li>
      </ul>
      <p>
        If you hover over any of the images in the main screen you will get
        additional information on the artworks with the artist name, year of
        creation, artwork name, description, further images, and the keywords
        the respective artist chose for this artwork.
      </p>
      <p>
        <strong>Show on ADA</strong> - takes you to the entry of the artwork on
        ADA with the full description and other additional information.
      </p>
      <p>
        <strong>Add to favourites</strong> - transfers the artwork to your
        collections.
      </p>
      <h3 data-heading="Filter Chains">Filter Chains</h3>
      <p>
        Here you can select Thesaurus keywords to filter the artworks and create
        various filter chains.
      </p>
      <p>
        <strong>x</strong> - close filter menu
      </p>
      <p>
        <strong>List view | Sunburst</strong> - here you can choose between a
        list view of the Thesaurus keywords or a graphic represention as a
        sunburst diagram.
      </p>
      <p>
        Switch the list between an alphabetic and hierarchical view of the
        Thesaurus.
        <br />
        Add keywords to the respective filter chain(s). It is also possible to
        create a new filter chain here.
      </p>
      <p>
        In the sunburst diagram you can left click to enter the different
        categories. With right click you can add a keyword to the respective
        filter chain(s) and create new filter chains.
      </p>
      <ul>
        <li>Allows you to add a new filter chain</li>
        <li>Delete the whole filter chain</li>
        <li>Name your filter chain individually</li>
        <li>
          Mute this filter chain in the main screen. The filter chain
          &nbsp;&nbsp;&nbsp;will not be displayed. Allows you to quickly switch
          and compare filter chains.
        </li>
        <li>
          Remove keywords in the filter chain or move it to another filter
          chain. Here you can also add all the terms of the Thesaurus that are
          associatively connected to a certain keyword. It is a quick way to
          find connections and thematically close artworks.
        </li>
      </ul>
      <p>
        <strong>Note:</strong> If you add more than one keyword in one
        filterchain it basically functions as an “and” condition. Artworks must
        have all the keywords that are selected in one filterchain. If you want
        the condition to be “or” then you have to create separate filter chains.{" "}
      </p>
      .
      <div class="card text-start mb-4">
        <div class="card-body">
          <h4 class="card-title">Example</h4>
          <p class="card-text">
            If you create a filter chain with the terms “media” and “access” you
            will get artworks that are tagged with both keywords. If you create
            two filter chains, one with “media” and one with “access”, then you
            get in one chain all the artworks tagged with “media” and in the
            other all artworks tagged with “access”. In the latter case the
            artworks with both terms are of course a subset of the larger set.
          </p>
        </div>
      </div>
      <h4 data-heading="Filter Display Algorithms">
        Filter Display Algorithms
      </h4>
      <p>
        You have the option to choose between algorithms for visualizing the
        filterchains. By default the keyword-to-artwork chaining alogrithm is
        enabled.
      </p>
      <h3 data-heading="Collections">Collections</h3>
      <p>
        In this menu you can form an manage your collections. Once you added a
        desired artwork to your favourites you can start forming your
        collections.
      </p>
      <p>
        The favourite section is default and acts as a pool for your chosen
        artworks. From this pool you can form your collections.
      </p>
      <p>
        Add a collection
        <br />
        Name the collection
        <br />
        Delete Collection
      </p>
      <p>
        Add artworks to collections, move to another collection, delete from
        collection/favourites
      </p>
      <p>Export collection to the Mnemosyne viewer for further analysis</p>
    </div>
  );
};
