import React from "react";

const InfoView = () => {
  return (
    <div className="container text-start infoView">
      <div className="card p-3 bg-light text-center my-5">
        <p>
          <b>Serendipity [ˌsɛ.rɛn.ˈdɪp.ə.ti]</b>, the faculty or phenomenon of
          finding valuable or agreeable things not sought for. (Merriam-Webster
          dictionary)
        </p>
      </div>
      <h2>What is Serendipity? </h2>
      <p>
        Serendipity is an immersive application to playfully arrange,
        (re)combine, and sort image content from the Archive of Digital Art. Its
        intention is to provide an archival experience based on exploration and
        active engagement to support the discovery of new connections and
        meaningful questions in the field of media art. To achieve these goals,
        we put our focus on making the potential of the ADA thesaurus with its
        600+ terms accessible to users. As artists upload their works themselves
        on ADA the thesaurus serves as a keyword system for semantic tagging of
        the content. Serendipity allows the users to filter and display all
        documented artworks by freely selecting and chaining any of the terms
        available. They also have the possibility to create many different
        filter chains for diverse thematical interests. Filtered content is then
        visually presented in an immersive environment with additional
        information when hovering over the images. Users can move artworks in a
        “favorites” section to create their individual collections, which can
        then be exported to the IIIF viewer Mnemosyne for further analysis and
        research.
      </p>
      <h2>What is the concept behind? </h2>
      <p>
        {" "}
        With the current digital possibilities, we felt like there are primarily
        two modes of how online archives are approached: Either in a very
        specific sense, e.g., if people know exactly what they are looking for,
        or in a very “broad” sense, e.g., when using the amount of available
        data for meta-analyses. Hence, we were particularly interested in the
        space in-between the “narrow” view and the bird's-eye perspective, where
        we imagine the people to discover interesting oddities, strangely
        fascinating connections, and fresh ideas. This thought process led us to
        one of the main questions we asked ourselves at the beginning of the
        project: How could a “stroll” through a digital archive look like?
        Taking inspiration from Walter Benjamin's flâneur, we further arrived at
        the idea of “playfulness”, which to us is a particular strength of the
        digital realm, where content can be quickly shared, combined,
        recombined, contextualized, and recontextualized. In our mind, strolling
        through an online archive allows for different modes of engagement with
        its content and smooth transitions between them. In this sense,
        Serendipity should encourage a mode of effortless observation and
        playful combination of content to foster lateral thinking of users in
        artistic and scientific contexts. The tool Mnemosyne is somewhat a
        counterpart to Serendipity that represents a mode of focused, analytic,
        and participatory examination, where looser observations made in
        Serendipity can be deepened and refined. Thus, the proper integration
        and connection of these tools were especially important to us, which
        illustrates an important aspect to us: “Strolling” through an online
        archive is less a matter of stand-alone tools, but the synergy of
        various tools that are well embedded in the bigger structure of the
        online archive environment.{" "}
      </p>
      <h2>What are the next steps for Serendipity?</h2>
      <p>
        Since Serendipity was developed within a project with limited timespan,
        we decided to make the code and documentation freely available as a
        repository on Github. Our hopes are that other institutions and
        initiatives with large image collections use the tool for their needs
        and continue to develop the application further. There are various ideas
        on our side, which we will integrate in the documentation on Github as
        well.
      </p>
    </div>
  );
};

export default InfoView;
