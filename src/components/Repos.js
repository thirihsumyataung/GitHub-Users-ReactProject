import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  console.log(repos);
  
  
  let languages = repos.reduce((total, item) => {
    const { language } = item;  // to know only language 
    console.log(language);
    if (!language) return total; 
    //console.log(item);
    if (!total[language]) // if the property does not exist 
    {
      total[language] = {label: language, value: 1}; 
      //total[language] = 1; // it will create another one 
    }
    else {
      //total[language] = total[language] + 1; 
      total[language] = {...total[language], value:total[language].value+1}; 
    }
    //total[language] = 30; 
    return total; 
  }, {}); // call back function and the object I am returning 
  // the exact iteration 
  
  languages = Object.values(languages).sort((a,b) => {
    return b.value - a.value;
    
  }).slice(0, 5); // It will return as array 
  console.log(languages);

  // Then the programming langauge will pass to chartData 
  const chartData = [
  {
    label: "HTML",
    value: "13"
  },
  {
    label: "CSS",
    value: "160"
  },
  {
    label: "JavaScript",
    value: "80"
  },
 
];
  return <section className="section">
    <Wrapper className="section-center">
      
      {/* <ExampleChart data={chartData} />; */}
      <Pie3D data={languages}/> 
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
