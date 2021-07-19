# Pokemon Safari

## Used tools

React, Redux, Typescript
Api called from https://pokeapi.co/

## Description

Project created to train Redux implementation and Typescript syntax. It is a mini game where you meet pokemon, and try to catch it by throwing balls, baits and rocks (just like in original pokemon game series). Redux contains 3 states: data, seen, caught. Data contains array of objects with data for every pokemon met till now for caching purpose to not call api if same pokemon appears. Seen and caught are states containing arrays with number being id of pokemon already seen or caught.
