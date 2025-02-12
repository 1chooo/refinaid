import Link from "next/link";
import { PeopleIcon } from "@primer/octicons-react";
import { RiArrowRightLine } from "react-icons/ri";
import HomeTeamPerson from "@/components/home-animations/home-team-person";
import HomeTeamTitle from "@/components/home-animations/home-team-title";

const people = [
  {
    name: "ChunHo (Hugo) Lin",
    role: "Founder & CTO",
    imageUrl: "https://avatars.githubusercontent.com/u/94162591?v=4",
    github: "https://github.com/1chooo",
  },
  {
    name: "Reeve Wu",
    role: "ML Engineer",
    imageUrl: "https://avatars.githubusercontent.com/u/110542858?v=4",
    github: "https://github.com/ReeveWu",
  },
  {
    name: "Vincent Li",
    role: "ML Engineer",
    imageUrl: "https://avatars.githubusercontent.com/u/98581766?v=4",
    github: "https://github.com/VincentLi1216",
  },
  {
    name: "Hsieh Robin",
    role: "Frontend Engineer",
    imageUrl: "https://avatars.githubusercontent.com/u/30611888?v=4",
    github: "https://github.com/RobinHsieh",
  },
  {
    name: "Alan Li",
    role: "Site Reliable Engineer",
    imageUrl: "https://avatars.githubusercontent.com/u/61896187?v=4",
    github: "https://github.com/lebr0nli",
  },
  {
    name: "Wang",
    role: "Prompt Engineer",
    imageUrl: "https://avatars.githubusercontent.com/u/109240416?v=4",
    github: "https://github.com/wangtyphoon",
  },
  {
    name: "Lin",
    role: "Prompt Engineer",
    imageUrl: "https://avatars.githubusercontent.com/u/133863585?v=4",
    github: "https://github.com/cylin-jimmy0708",
  },
];

export default function Leaders() {
  return (
    <div className="mb-10 bg-white mx-auto grid grid-cols-12 p-8 sm:p-16 relative">
      <div className="col-span-1 hidden lg:block">
        <div className="w-12 h-12 flex items-center justify-center -left-2 top-2 transform translate-x-px relative border-2 rounded-full bg-white z-20">
          <PeopleIcon className={"text-gh-gray-4 w-5 h-5"} />
        </div>
      </div>
      <div className="mt-1 col-span-12 lg:col-span-10 lg:col-start-2 mb-8">
        <HomeTeamTitle
          delay={0}
          className={"flex flex-row items-center cursor-pointer group"}
        >
          <Link href={"/team"}>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Team
            </h2>
          </Link>

          <RiArrowRightLine
            strokeWidth={2}
            className={
              "ml-1.5 w-8 h-8 group-hover:translate-x-1.5 transition-transform duration-200"
            }
          />
        </HomeTeamTitle>

        <HomeTeamTitle
          delay={0.1}
          className={"mt-2 text-gh-text-secondary text-lg"}
        >
          Meet the team behind Refinaid.
        </HomeTeamTitle>
      </div>
      <div className="col-span-1 col-start-1 hidden lg:block">
        <div className="border-l-2 border-gh-gray-2/60 h-[91.5%] absolute top-20 left-20 translate-x-[1px] z-10"></div>
      </div>
      <div className="col-span-12 lg:col-span-10 lg:col-start-2 mt-4">
        <ul
          role="list"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-12"
        >
          {people.map((person, index) => (
            <li key={person.name}>
              <HomeTeamPerson delay={index * 0.08 + 0.2} person={person} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
