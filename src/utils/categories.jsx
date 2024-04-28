import { MdOutlineFoodBank, MdOutlineTravelExplore,Md6FtApart,MdLocalMovies} from "react-icons/md";
import { FaStarOfLife,FaMusic,FaBusinessTime,FaDeviantart } from "react-icons/fa";
import { HiPhotograph } from "react-icons/hi";
import { CgStyle } from "react-icons/cg";

import { FcSportsMode,FcNews } from "react-icons/fc";

export const categories = [
    {
      value: "Fashion",
      label: "Fashion",
      logo:<CgStyle/>,
      children: [
        { value: "Clothing", label: "Clothing" },
        { value: "Shoes", label: "Shoes" },
        { value: "Accessories", label: "Accessories" },
        { value: "Jewelry", label: "Jewelry" },
        { value: "Bags", label: "Bags" },
        { value: "Watches", label: "Watches" }
      ]
    },
    {
      value: "Food",
      label: "Food",
      logo:<MdOutlineFoodBank></MdOutlineFoodBank>,
      children: [
        { value: "Recipes", label: "Recipes" },
        { value: "Cooking Tips", label: "Cooking Tips" },
        { value: "Restaurant Reviews", label: "Restaurant Reviews" },
        { value: "Healthy Eating", label: "Healthy Eating" },
        { value: "International Cuisine", label: "International Cuisine" },
        { value: "Baking", label: "Baking" }
      ] 
    },
    {
      value: "Travel",
      label: "Travel",
      logo:<MdOutlineTravelExplore/>,
      children: [
        { value: "Destination Guides", label: "Destination Guides" },
        { value: "Travel Tips", label: "Travel Tips" },
        { value: "Travel Stories", label: "Travel Stories" },
        { value: "Adventure Travel", label: "Adventure Travel" },
        { value: "Solo Travel", label: "Solo Travel" },
        { value: "Family Travel", label: "Family Travel" }
      ]
    },
    {
      value: "Lifestyle",
      label: "Lifestyle",
      logo:<FaStarOfLife/>,
      children: [
        { value: "Self-Improvement", label: "Self-Improvement" },
        { value: "Productivity Tips", label: "Productivity Tips" },
        { value: "Personal Development", label: "Personal Development" },
        { value: "Mindfulness", label: "Mindfulness" },
        { value: "Home Decor", label: "Home Decor" },
        { value: "Organization Tips", label: "Organization Tips" }
      ]
    },
    {
      value: "Photography",
      label: "Photography",
      logo:<HiPhotograph/>,
      children: [
        { value: "Photography Techniques", label: "Photography Techniques" },
        { value: "Photo Editing Tutorials", label: "Photo Editing Tutorials" },
        { value: "Photographer Spotlights", label: "Photographer Spotlights" },
        { value: "Equipment Reviews", label: "Equipment Reviews" },
        { value: "Inspiration", label: "Inspiration" },
        { value: "Photography News", label: "Photography News" }
      ]
    },
    {
      value: "Music",
      label: "Music",
      logo:<FaMusic/>,
      children: [
        { value: "Music Reviews", label: "Music Reviews" },
        { value: "Artist Interviews", label: "Artist Interviews" },
        { value: "Music History", label: "Music History" },
        { value: "Concert Reviews", label: "Concert Reviews" },
        { value: "Musician Spotlights", label: "Musician Spotlights" },
        { value: "Music Industry News", label: "Music Industry News" }
      ]
    },
    {
      value: "Business",
      label: "Business",
      logo:<FaBusinessTime/>,
      children: [
        { value: "Entrepreneurship", label: "Entrepreneurship" },
        { value: "Startups", label: "Startups" },
        { value: "Small Business Tips", label: "Small Business Tips" },
        { value: "Marketing Strategies", label: "Marketing Strategies" },
        { value: "Leadership", label: "Leadership" },
        { value: "Business News", label: "Business News" }
      ]
    },
    {
      value: "Art & Design",
      label: "Art & Design",
      logo:<FaDeviantart/>,
      children: [
        { value: "Artwork Showcases", label: "Artwork Showcases" },
        { value: "Design Tips", label: "Design Tips" },
        { value: "Creative Projects", label: "Creative Projects" },
        { value: "Artist Profiles", label: "Artist Profiles" },
        { value: "Art Events", label: "Art Events" },
        { value: "Design Trends", label: "Design Trends" }
      ]
    },
    {
      value: "Interior Design",
      label: "Interior Design",
      logo:<Md6FtApart/>,
      children: [
        { value: "Home Decor Ideas", label: "Home Decor Ideas" },
        { value: "Design Trends", label: "Design Trends" },
        { value: "Room Makeovers", label: "Room Makeovers" },
        { value: "Furniture Reviews", label: "Furniture Reviews" },
        { value: "Organization Tips", label: "Organization Tips" },
        { value: "DIY Projects", label: "DIY Projects" }
      ]
    },
    {
      value: "Sports",
      label: "Sports",
      logo:<FcSportsMode/>,
      children: [
        { value: "Sports News", label: "Sports News" },
        { value: "Game Analysis", label: "Game Analysis" },
        { value: "Player Profiles", label: "Player Profiles" },
        { value: "Events Coverage", label: "Events Coverage" },
        { value: "Fitness Tips", label: "Fitness Tips" },
        { value: "Equipment Reviews", label: "Equipment Reviews" }
      ]
    },
    {
      value: "News",
      label: "News",
      logo:<FcNews/>,
      children: [
        { value: "Current Events", label: "Current Events" },
        { value: "World News", label: "World News" },
        { value: "Politics", label: "Politics" },
        { value: "Breaking News", label: "Breaking News" },
        { value: "Investigative Journalism", label: "Investigative Journalism" },
        { value: "Opinion Pieces", label: "Opinion Pieces" }
      ]
    },
    {
      value: "Movie",
      label: "Movie",
      logo:<MdLocalMovies/>,
      children: [
        { value: "Movie Reviews", label: "Movie Reviews" },
        { value: "Film Analysis", label: "Film Analysis" },
        { value: "Director Spotlights", label: "Director Spotlights" },
        { value: "Film Festivals", label: "Film Festivals" },
        { value: "Behind-the-Scenes", label: "Behind-the-Scenes" },
        { value: "Film Industry News", label: "Film Industry News" }
      ]
    }
  ];
  