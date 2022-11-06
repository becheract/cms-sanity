import Head from "next/head";
import Container from "../components/container";
import Portfolio from "../components/portfolio";
import Intro from "../components/intro";

import { useState, useEffect } from "react";
import {
  portfolioQuery,
  skillsQuery,
  experienceQuery,
  projectCategoryQuery,
} from "../lib/queries";
import { previewClient } from "../lib/sanity.server";
import SkillSection from "../components/skillSection";
import Experience from "../components/Experience";
import Button from "../components/button";

import GitHub from "../assets/git.png";
import Linkedin from "../assets/linkedin.png";
import Stack from "../assets/stack.png";
import Twitter from "../assets/twitter.png";

export default function Index({ projects, skills, experience, category }) {
  const [filter, setFilter] = useState("All");

  const [allProjects, setAllProjects] = useState(projects);
  const [socialLinks, setSocialLinks] = useState([
    GitHub,
    Linkedin,
    Stack,
    Twitter,
  ]);

  useEffect(() => {
    console.log(category);
  });
  return (
    <>
      <Head>
        <title>Bechera's Portfolio</title>
      </Head>

      <Container>
        <div className="">
          <h1 className="font-bold sm:text-phHeading md:text-tbHeading xl:text-deHeading">
            Hi 👋🏽 , Welcome To My Garden
          </h1>
          <h3 className="font-bold text-xl">
            Full-stack web developer based in Canada.
          </h3>
          <div className="flex flex-row gap-x-10">
            {socialLinks.map((images, index) => {
              return <img src={images.src} className="w-12" key={index} />;
            })}
          </div>
        </div>
      </Container>

      <Container>
        <div className="flex justify-start">
          <Intro text={"Portfolio"} />
        </div>
        <div className="flex justify-start flex-row flex-wrap">
          <div className="flex flex-row gap-x-10">
            <button
              className="font-bold text-xl"
              onClick={() => setFilter("All")}
            >
              All
            </button>
            {category.map((category, index) => {
              return (
                <>
                  <button
                    className="font-bold text-xl"
                    onClick={() => setFilter(category.name)}
                  >
                    {category.name}
                  </button>
                </>
              );
            })}
          </div>
        </div>

        {filter === "All"
          ? allProjects.map((project, index) => {
              return (
                <Portfolio
                  key={index}
                  title={project.title}
                  content={project.content}
                  project_image={project.project_image}
                  skills={project.skills}
                />
              );
            })
          : allProjects.map((project, index) => {
              return filter === project.category[0].name ? (
                <Portfolio
                  key={index}
                  title={project.title}
                  content={project.content}
                  project_image={project.project_image}
                  skills={project.skills}
                />
              ) : null;
            })}
      </Container>

      <Container>
        <Intro text={"Skills & Experience"} />
        <div className="flex flex-wrap w-full h-40 gap-1 flex-row  border-solid border-2 p-3 border-sky-500 justify-start ">
          {skills.length > 0 &&
            skills.map((skill, index) => {
              return <SkillSection key={index} skill={skill} />;
            })}
        </div>

        <div className="flex flex-row w-full flex-wrap  border-solid border-2 p-3 border-red-500 my-20">
          {experience.length > 0 &&
            experience.map((exp, index) => {
              return <Experience exp={exp} index={index} />;
            })}
        </div>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const projects = await previewClient.fetch(portfolioQuery);
  const skills = await previewClient.fetch(skillsQuery);
  const experience = await previewClient.fetch(experienceQuery);
  const category = await previewClient.fetch(projectCategoryQuery);
  return {
    props: {
      projects,
      skills,
      experience,
      category,
    },
  };
}
