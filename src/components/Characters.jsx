import { useState } from "react";
import useSWR from "swr";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  width: 100%;
  align-items: center;
`;
const Character = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 6px;
  outline: none;
  border: none;
`;

const Button = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 6px;
  background-color: #6c6ce3;
  margin-inline: 10px;
  outline: none;
  border: none;
  color: white;
  font-weight: bold;
`;

const Container = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-items: center;
  justify-content: center;
  margin-top: 32px;
  padding-bottom: 32px;
`;

const Characters = () => {
  const [pageIndex, setPageIndex] = useState(1);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `https://rickandmortyapi.com/api/character/?page=${pageIndex}`,
    fetcher
  );

  if (error) return <div>Failed to fetch characters.</div>;
  if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <Container>
        {data.results.map((character) => (
          <Character key={character.id}>
            <img width={100} height={100} src={character.image} />
            <div>{character.name}</div>
          </Character>
        ))}
      <ButtonWrapper>
        <Button onClick={() => setPageIndex(pageIndex - 1)}>Previous</Button>
        <Button onClick={() => setPageIndex(pageIndex + 1)}>Next</Button>
      </ButtonWrapper>
      </Container>
    </>
  );
};

export default Characters;
