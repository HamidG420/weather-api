interface DegreeProps {
  temp: number;
}

const Degree = ({ temp }: DegreeProps): JSX.Element => {
  return (
    <span>
      {temp}
      <sup>o</sup>
    </span>
  );
};
export default Degree;
