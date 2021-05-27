import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  console.log(repos);
  let languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;  // to know only language 
    console.log(language);
    if (!language) return total; 
    //console.log(item);
    if (!total[language]) // if the property does not exist 
    {
      total[language] = {label: language, value: 1, stars: stargazers_count}; 
      //total[language] = 1; // it will create another one 
    }
    else {
      //total[language] = total[language] + 1; 
      total[language] = {
        ...total[language], value: total[language].value + 1, stars: total[language].stars + stargazers_count
    };
    }
    //total[language] = 30; 
    return total; 
  }, {});
  //1. call back function and the object I am returning
  //2. the exact iteration 
  ///------------------------------------------------------
  const mostUsedlanguages = Object.values(languages).sort((a,b) => {
    return b.value - a.value;
  }).slice(0, 5); // It will return as array 
  // *** CHeck what is the propeterty responsible for our repo stars 
  // stargazers_count is for this case 
  const mostPopular = Object.values(languages).sort((a, b) => {
    return b.stars - a.stars; 
  }).map((item) => {
    return {...item, value:item.stars}
  });
  console.log(mostPopular);
  
  // Stars and Forks 
  let { stars, forks } = repos.reduce((total, item) => {
    const { stargazers_count, name, forks } = item;
    total.stars[stargazers_count] = { label: name, value: stargazers_count };
    total.forks[forks] = { label: name, value: forks }; 
    return total
  }, { stars: {}, forks: {} })
  
  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  console.log(stars, forks); 
  // Then the programming langauge will pass to chartData 
//   const chartData = [
//   {
//     label: "HTML",
//     value: "13"
//   },
//   {
//     label: "CSS",
//     value: "160"
//   },
//   {
//     label: "JavaScript",
//     value: "80"
//   },
// ];
  return <section className="section">
    <Wrapper className="section-center">
      {/* <ExampleChart data={chartData} />; */}
      <Pie3D data={mostUsedlanguages} />
       <Column3D data={stars}/> 
      <Doughnut2D data={mostPopular} />
      <Bar3D data={forks}/> 
    </Wrapper>
  </section>
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
