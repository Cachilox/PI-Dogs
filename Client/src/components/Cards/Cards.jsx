import Card from "../Card/Card";

const Cards = ({ dogs }) => {
  return (
    <div className="Cards-container">
      {dogs.map((dog) => {
        const { id, name, image, temperament, weightMin, weightMax } = dog;
        return (
          <Card
            key={id}
            id={id}
            name={name}
            image={image}
            temperament={temperament}
            weightMin={weightMin}
            weightMax={weightMax}
          />
        );
      })}
    </div>
  );
};

export default Cards;
