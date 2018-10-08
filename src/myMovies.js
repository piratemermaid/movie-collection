export function fillMyMovies() {
  const collection = [];
  const wishlist = [
    {
      added: "10/08/18",
      tags: ["comedy", "#deep"],
      title: "The Truman Show",
      watched: true,
      year: "?",
      releaseDate: "released"
    },
    {
      added: "10/01/18",
      tags: ["romantic", "comedy"],
      title: "Crazy Rich Asians",
      watched: false,
      year: "2018",
      releaseDate: "?"
    },
    {
      added: "10/07/18",
      tags: ["disney", "animated", "superhero"],
      title: "Incredibles 2",
      watched: true,
      year: "2018",
      releaseDate: "October 23"
    },
    {
      added: "10/01/18",
      tags: ["comedy", "history"],
      title: "KKKlansman",
      watched: false,
      year: "2018",
      releaseDate: "?"
    },
    {
      added: "10/01/18",
      tags: ["disney", "musical", "nostalgia"],
      title: "Mary Poppins Returns",
      watched: false,
      year: "2018",
      releaseDate: "theaters soon?"
    },
    {
      added: "10/01/18",
      tags: ["disney", "animated"],
      title: "Wreck-It Ralph 2",
      watched: false,
      year: "2018",
      releaseDate: "theaters soon?"
    },
    {
      added: "10/01/18",
      tags: ["nerdy", "magic"],
      title: "Fantastic Beasts: The Crimes of Grindelwald",
      watched: false,
      year: "2018",
      releaseDate: "theaters in Nov"
    }
  ];

  return { collection, wishlist };
}

// {
//     added: "",
//     tags: [],
//     title: "",
//     watched: false,
//     year: "",
//   }

// {
//     added: "",
//     tags: [],
//     title: "",
//     watched: false,
//     year: "",
//     releaseDate: ""
//   }
